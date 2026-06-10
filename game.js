// =============================================
// 🎮 게임 상태 관리
// =============================================

const GameState = {
  player: null,       // { id, name, faction, teamCode, teamName }
  team: null,         // 팀 데이터
  currentRoom: null,  // 현재 방 ID
  teamMembers: {},    // 팀원 목록
  inventory: [],      // 개인 인벤토리
  discoveredClues: [], // 발견한 단서
};

// =============================================
// 🔐 플레이어 초기화
// =============================================
function initPlayer(name, faction, teamCode, teamName) {
  const playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  GameState.player = { id: playerId, name, faction, teamCode, teamName };
  localStorage.setItem('mof_player', JSON.stringify(GameState.player));
  return GameState.player;
}

function loadPlayer() {
  const saved = localStorage.getItem('mof_player');
  if (saved) {
    GameState.player = JSON.parse(saved);
    return GameState.player;
  }
  return null;
}

// =============================================
// 🏠 방 관리
// =============================================
async function joinRoom(roomId) {
  const player = GameState.player;
  if (!player) return false;

  const roomRef = db.ref(`rooms/${roomId}`);
  const teamRef = db.ref(`teams/${player.teamCode}`);

  // 팀 전체가 이동해야 함 - 이동 요청 등록
  await teamRef.child('moveRequest').set({
    targetRoom: roomId,
    requestedBy: player.id,
    requestedAt: Date.now(),
    votes: { [player.id]: true }
  });

  return true;
}

async function confirmTeamMove(roomId) {
  const player = GameState.player;
  const teamRef = db.ref(`teams/${player.teamCode}`);

  // 팀 현재 방 업데이트
  await teamRef.child('currentRoom').set(roomId);

  // 플레이어 위치 업데이트
  await db.ref(`players/${player.id}`).update({
    currentRoom: roomId,
    lastSeen: Date.now()
  });

  GameState.currentRoom = roomId;
}

// =============================================
// 🔑 아이템/열쇠 발견
// =============================================
async function discoverItem(roomId, itemId) {
  const itemRef = db.ref(`discovered_items/${roomId}/${itemId}`);
  const snapshot = await itemRef.once('value');

  if (snapshot.exists()) {
    return { success: false, message: '이미 누군가 발견한 물건입니다.' };
  }

  // 전역에서 한 번만 발견 가능
  await itemRef.set({
    discoveredBy: GameState.player.id,
    discoveredByName: GameState.player.name,
    discoveredByFaction: GameState.player.faction,
    discoveredAt: Date.now()
  });

  // 플레이어 인벤토리에 추가
  const invRef = db.ref(`teams/${GameState.player.teamCode}/inventory/${itemId}`);
  await invRef.set({
    itemId,
    roomId,
    addedAt: Date.now()
  });

  return { success: true, message: '아이템을 발견했습니다!' };
}

// =============================================
// 📝 단서 기록
// =============================================
async function recordClue(clueText) {
  const clueRef = db.ref(`teams/${GameState.player.teamCode}/clues`).push();
  await clueRef.set({
    text: clueText,
    foundIn: GameState.currentRoom,
    foundBy: GameState.player.name,
    foundAt: Date.now()
  });
}

// =============================================
// 💬 채팅
// =============================================
async function sendChatMessage(message) {
  const chatRef = db.ref(`teams/${GameState.player.teamCode}/chat`).push();
  await chatRef.set({
    sender: GameState.player.name,
    faction: GameState.player.faction,
    message,
    timestamp: Date.now()
  });
}

function listenToChat(teamCode, callback) {
  const chatRef = db.ref(`teams/${teamCode}/chat`).limitToLast(50);
  chatRef.on('child_added', (snapshot) => {
    callback(snapshot.val());
  });
}

// =============================================
// 🗺️ 팀 상태 구독
// =============================================
function listenToTeam(teamCode, callback) {
  db.ref(`teams/${teamCode}`).on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

function listenToRoom(roomId, callback) {
  db.ref(`rooms_state/${roomId}`).on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

// 같은 방의 다른 진영 감지
function listenForEnemies(roomId, myFaction, callback) {
  db.ref(`room_presence/${roomId}`).on('value', (snapshot) => {
    const presence = snapshot.val() || {};
    const enemies = Object.values(presence).filter(p =>
      p.faction !== myFaction && p.active
    );
    if (enemies.length > 0) callback(enemies);
  });
}

// 방 입장/퇴장 등록
async function updateRoomPresence(roomId, active) {
  const presenceRef = db.ref(`room_presence/${roomId}/${GameState.player.teamCode}`);
  if (active) {
    await presenceRef.set({
      teamCode: GameState.player.teamCode,
      teamName: GameState.player.teamName,
      faction: GameState.player.faction,
      active: true,
      enteredAt: Date.now()
    });
  } else {
    await presenceRef.remove();
  }
}

// =============================================
// ⚔️ 전투 관련
// =============================================
const SPELLS = [
  { id: 'expelliarmus', name: 'Expelliarmus', emoji: '🪄', type: 'defense', power: 2, description: '무장 해제' },
  { id: 'stupefy', name: 'Stupefy', emoji: '⚡', type: 'attack', power: 3, description: '기절 주문' },
  { id: 'protego', name: 'Protego', emoji: '🛡️', type: 'shield', power: 2, description: '방어막' },
  { id: 'incendio', name: 'Incendio', emoji: '🔥', type: 'attack', power: 4, description: '화염 주문' },
  { id: 'accio', name: 'Accio', emoji: '✨', type: 'counter', power: 3, description: '소환 주문 (반격)' }
];

// 주문 상성: attack > defense > counter > attack / shield > attack
const SPELL_RESULTS = {
  attack: { attack: 'tie', defense: 'win', counter: 'lose', shield: 'lose' },
  defense: { attack: 'lose', defense: 'tie', counter: 'win', shield: 'tie' },
  counter: { attack: 'win', defense: 'lose', counter: 'tie', shield: 'lose' },
  shield: { attack: 'win', defense: 'tie', counter: 'win', shield: 'tie' }
};

async function initBattle(roomId, attackerTeam, defenderTeam) {
  const battleId = `battle_${roomId}_${Date.now()}`;
  await db.ref(`battles/${battleId}`).set({
    roomId,
    attackerTeam,
    defenderTeam,
    status: 'waiting', // waiting > proposing > fighting > ended
    round: 1,
    attackerHP: 100,
    defenderHP: 100,
    log: [],
    createdAt: Date.now()
  });
  return battleId;
}

async function submitSpell(battleId, teamCode, spellId) {
  await db.ref(`battles/${battleId}/spells/${teamCode}`).set({
    spellId,
    submittedAt: Date.now()
  });
}

function listenToBattle(battleId, callback) {
  db.ref(`battles/${battleId}`).on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

// 주사위 굴리기 (합의 퇴장 시)
async function rollDiceForExit(battleId, teamCode) {
  const roll = Math.floor(Math.random() * 6) + 1;
  await db.ref(`battles/${battleId}/dice/${teamCode}`).set({
    roll,
    rolledAt: Date.now()
  });
  return roll;
}
