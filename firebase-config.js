// ══════════════════════════════════════════════════════
//  🔥 FIREBASE 설정 — 본인의 설정으로 교체하세요
// ══════════════════════════════════════════════════════
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB5llCw-PLO-euQrLxu21IxlKQr4uWFXNo",
  authDomain: "ministry-of-magic-ebdab.firebaseapp.com",
  databaseURL: "https://ministry-of-magic-ebdab-default-rtdb.firebaseio.com",
  projectId: "ministry-of-magic-ebdab",
  storageBucket: "ministry-of-magic-ebdab.firebasestorage.app",
  messagingSenderId: "676854342391",
  appId: "1:676854342391:web:ef73dd683297579f1aa9f2"
};

// ══════════════════════════════════════════════════════
//  진영 & 주문 데이터
// ══════════════════════════════════════════════════════
export const FACTIONS = {
  order: { id:"order", name:"불사조 기사단", emoji:"🔥", color:"#c9922a" },
  death: { id:"death", name:"죽음을 먹는 자", emoji:"💀", color:"#a855f7" }
};

export const SPELLS = [
  { id:"expelliarmus", name:"Expelliarmus", type:"defense", power:2, emoji:"🛡️", desc:"무장 해제" },
  { id:"protego",      name:"Protego",      type:"shield",  power:3, emoji:"✨", desc:"보호막" },
  { id:"stupefy",      name:"Stupefy",      type:"attack",  power:4, emoji:"⚡", desc:"기절 주문" },
  { id:"crucio",       name:"Crucio",       type:"heavy",   power:6, emoji:"🔴", desc:"고문 주문" },
  { id:"avada",        name:"Avada K.",     type:"curse",   power:5, emoji:"💚", desc:"죽음의 저주" }
];

// 상성: win=내가 이김, lose=내가 짐, draw=무승부
export const MATCHUP = {
  attack:  {defense:"win",  shield:"lose", heavy:"win",  curse:"lose", attack:"draw"},
  defense: {attack:"lose",  shield:"win",  heavy:"lose", curse:"lose", defense:"draw"},
  shield:  {defense:"lose", attack:"win",  heavy:"win",  curse:"win",  shield:"draw"},
  heavy:   {attack:"lose",  defense:"win", shield:"lose",curse:"lose", heavy:"draw"},
  curse:   {attack:"win",   defense:"win", shield:"lose",heavy:"win",  curse:"draw"}
};

// ══════════════════════════════════════════════════════
//  방 데이터 (24개)
// ══════════════════════════════════════════════════════
export const ROOMS = [
  {
    id:"corridor_main", name:"중앙 복도", icon:"🏛️", isLobby:true,
    desc:"마법부 청사의 넓은 중앙 복도. 황금빛 분수대가 중앙에 서 있고 마법사들이 바삐 오간다.",
    connections:["atrium","courtroom","dept_mysteries","dept_law","dept_transport","dept_games"],
    items:[], clues:[]
  },
  {
    id:"atrium", name:"중앙 현관 (아트리움)", icon:"⛲",
    desc:"황금빛 분수대가 있는 마법부의 심장부. 벽면을 따라 마법 뉴스 속보가 흐른다.",
    connections:["corridor_main","fireplace_hub","minister_office"],
    items:[{id:"golden_key",name:"황금 열쇠",desc:"분수대 아래 숨겨진 열쇠. 장관실 금고를 열 수 있다.",isKey:true,unlocks:"minister_vault",icon:"🔑"}],
    clues:["분수대 물 속에서 희미한 빛이 난다.","누군가 최근 이 곳에서 마법을 썼다."]
  },
  {
    id:"minister_office", name:"장관실", icon:"🏢",
    desc:"마법부 장관의 집무실. 두꺼운 양탄자와 수백 년 된 마법 서적들이 가득하다.",
    connections:["atrium","minister_vault"],
    items:[{id:"dark_letter",name:"검은 봉인 편지",desc:"비밀 회의를 요청하는 편지. 발신인 불명.",isKey:false,icon:"📜"}],
    clues:["책상 위의 깃털 펜이 혼자 움직인다.","벽장 뒤에서 속삭임이 들린다."]
  },
  {
    id:"minister_vault", name:"장관실 금고", icon:"🔐",
    desc:"마법부 최고 기밀 문서가 보관된 금고실. 황금 열쇠로만 열 수 있다.",
    connections:["minister_office"], locked:true, requiredKey:"golden_key",
    items:[
      {id:"prophecy_record",name:"예언 기록서",desc:"볼드모트와 관련된 예언 원본 기록.",isKey:false,icon:"📖"},
      {id:"vault_key",name:"비밀 통로 열쇠",desc:"지하 비밀 통로로 이어지는 열쇠.",isKey:true,unlocks:"secret_passage",icon:"🔑"}
    ],
    clues:["어둠의 마법의 잔재가 느껴진다."]
  },
  {
    id:"courtroom", name:"위자드고트 법정", icon:"⚖️",
    desc:"마법사 재판이 열리는 원형 법정. 검은 의자들이 피의자 의자를 빽빽이 둘러싸고 있다.",
    connections:["corridor_main","evidence_room"],
    items:[{id:"court_seal",name:"법정 인장",desc:"위자드고트의 공식 인장. 증거 보관실 접근 가능.",isKey:true,unlocks:"evidence_room",icon:"🔑"}],
    clues:["최근 비공개 재판이 열렸다는 기록이 있다."]
  },
  {
    id:"evidence_room", name:"증거 보관실", icon:"📦",
    desc:"압수된 마법 물건들이 가득한 방. 일부는 아직도 살아있다.",
    connections:["courtroom"], locked:true, requiredKey:"court_seal",
    items:[
      {id:"dark_artifact",name:"어둠의 유물",desc:"죽음을 먹는 자들이 사용한 마법 물건.",isKey:false,icon:"💎"},
      {id:"locket",name:"슬리데린의 로켓",desc:"호크룩스로 의심되는 물건.",isKey:false,icon:"🔮"}
    ],
    clues:["어둠의 마법 탐지기가 계속 울린다.","증거 목록에 지워진 항목이 있다."]
  },
  {
    id:"dept_mysteries", name:"불가사의부 복도", icon:"🌀",
    desc:"마법부에서 가장 신비로운 부서. 항상 잠겨 있는 문들이 늘어서 있다.",
    connections:["corridor_main","hall_prophecy","brain_room","death_room","time_room","love_room"],
    items:[], clues:["문들이 자꾸 위치를 바꾼다."]
  },
  {
    id:"hall_prophecy", name:"예언의 방", icon:"🔮",
    desc:"수천 개의 예언 구슬이 선반에 가득 진열된 거대한 홀. 어디선가 속삭임이 들린다.",
    connections:["dept_mysteries"],
    items:[{id:"prophecy_orb",name:"예언 구슬 #97",desc:"특정 인물의 이름이 새겨진 예언 구슬.",isKey:true,unlocks:"mysteries_core",icon:"🔑"}],
    clues:["어떤 구슬들이 갑자기 빛나기 시작했다.","선반 끝에 누군가 다녀간 흔적이 있다."]
  },
  {
    id:"brain_room", name:"뇌의 방", icon:"🧠",
    desc:"수조 속에서 사고하는 뇌들이 떠다니는 기이한 방. 보기만 해도 머리가 어지럽다.",
    connections:["dept_mysteries"],
    items:[{id:"memory_vial",name:"기억 병",desc:"누군가의 잃어버린 기억이 담긴 유리병.",isKey:false,icon:"🧪"}],
    clues:["뇌들이 움직이며 특정 단어를 암시하는 것 같다."]
  },
  {
    id:"death_room", name:"베일의 방", icon:"🌑",
    desc:"돌로 된 아치에 너덜너덜한 베일이 걸려 있다. 저편에서 목소리가 들린다.",
    connections:["dept_mysteries"],
    items:[{id:"veil_fragment",name:"베일 조각",desc:"죽음과 삶의 경계에서 얻은 천 조각.",isKey:false,icon:"🌒"}],
    clues:["베일 너머에서 죽은 자의 목소리가 들린다.","바닥에 마법진 흔적이 있다."]
  },
  {
    id:"time_room", name:"시간의 방", icon:"⏳",
    desc:"모래시계와 타임터너들이 가득한 방. 시간이 여기서 느리게 흐른다.",
    connections:["dept_mysteries"],
    items:[{id:"timeturner",name:"타임터너",desc:"시간을 되돌릴 수 있는 희귀한 도구.",isKey:true,unlocks:"past_corridor",icon:"🔑"}],
    clues:["모래시계 하나가 거꾸로 흐르고 있다."]
  },
  {
    id:"love_room", name:"사랑의 방", icon:"❤️",
    desc:"항상 잠겨 있다는 이 방이 오늘따라 열려 있다. 따뜻하고 이상한 향기가 난다.",
    connections:["dept_mysteries"],
    items:[{id:"amortentia",name:"아모르텐시아",desc:"세상에서 가장 강력한 사랑의 마약.",isKey:false,icon:"🍾"}],
    clues:["이 방은 항상 잠겨 있어야 한다. 누가 열었을까?"]
  },
  {
    id:"mysteries_core", name:"불가사의부 핵심", icon:"💫",
    desc:"불가사의부의 가장 깊은 곳. 마법의 근원과 관련된 연구가 이루어진다.",
    connections:["dept_mysteries"], locked:true, requiredKey:"prophecy_orb",
    items:[
      {id:"ancient_spell",name:"고대 주문서",desc:"알려지지 않은 마법이 기록된 양피지.",isKey:false,icon:"📜"},
      {id:"core_crystal",name:"마법의 핵심 결정체",desc:"마법부 전체 방어막의 원천.",isKey:true,unlocks:"final_chamber",icon:"🔑"}
    ],
    clues:["이 방에 들어온 자는 극히 드물다.","최근 어둠의 흔적이 남겨졌다."]
  },
  {
    id:"dept_law", name:"마법법 집행부", icon:"🚔",
    desc:"오러들이 활동하는 부서. 수배 마법사들의 사진이 벽에 가득하다.",
    connections:["corridor_main","auror_office","holding_cells"],
    items:[], clues:[]
  },
  {
    id:"auror_office", name:"오러 사무실", icon:"🔍",
    desc:"어둠의 마법사를 추적하는 오러들의 작업실. 지도와 수사 보고서가 가득하다.",
    connections:["dept_law"],
    items:[
      {id:"auror_badge",name:"오러 배지",desc:"수감동 접근 권한이 있는 오러 배지.",isKey:true,unlocks:"holding_cells",icon:"🔑"},
      {id:"investigation_file",name:"수사 파일",desc:"현재 진행 중인 어둠의 마법사 수사 파일.",isKey:false,icon:"🗂️"}
    ],
    clues:["파일들이 최근 누군가에 의해 뒤진 것 같다.","기밀 파일 하나가 사라졌다."]
  },
  {
    id:"holding_cells", name:"임시 수감동", icon:"⛓️",
    desc:"체포된 마법사들을 임시로 수감하는 곳. 이 곳에서는 마법이 차단된다.",
    connections:["dept_law"], locked:true, requiredKey:"auror_badge",
    items:[{id:"prisoner_note",name:"죄수의 쪽지",desc:"수감된 자가 남긴 암호화된 메시지.",isKey:false,icon:"📝"}],
    clues:["수감동 한 칸이 탈출된 것 같다.","바닥에 마법진이 그려져 있다."]
  },
  {
    id:"dept_transport", name:"마법 운송부", icon:"🧹",
    desc:"빗자루, 플루 네트워크, 포트키를 관리하는 부서.",
    connections:["corridor_main","fireplace_hub","portkey_storage"],
    items:[], clues:[]
  },
  {
    id:"fireplace_hub", name:"플루 네트워크 허브", icon:"🔥",
    desc:"마법부의 플루 파우더 이동 허브. 수십 개의 벽난로가 줄지어 있다.",
    connections:["atrium","dept_transport"],
    items:[{id:"floo_bag",name:"플루 가루 주머니",desc:"특별히 조제된 플루 가루. 비밀 장소로 이동 가능.",isKey:true,unlocks:"secret_passage",icon:"🔑"}],
    clues:["어떤 벽난로에서 초록 불꽃이 꺼지지 않는다."]
  },
  {
    id:"portkey_storage", name:"포트키 보관실", icon:"🎯",
    desc:"등록된 포트키들이 보관된 방. 함부로 사용하면 안 된다.",
    connections:["dept_transport"],
    items:[{id:"illegal_portkey",name:"미등록 포트키",desc:"불법 포트키. 낡은 장화처럼 생겼다.",isKey:false,icon:"👢"}],
    clues:["등록되지 않은 포트키가 보관실에 있다."]
  },
  {
    id:"dept_games", name:"마법 게임 및 스포츠부", icon:"🏆",
    desc:"퀴디치와 각종 마법 스포츠를 관리하는 부서.",
    connections:["corridor_main","trophy_room"],
    items:[], clues:[]
  },
  {
    id:"trophy_room", name:"트로피 룸", icon:"🥇",
    desc:"마법 스포츠 역사의 트로피들이 전시된 방. 어딘가 낯선 냄새가 난다.",
    connections:["dept_games"],
    items:[{id:"quidditch_trophy",name:"퀴디치 월드컵 트로피",desc:"트로피 바닥에 무언가 적혀있다.",isKey:true,unlocks:"secret_passage",icon:"🔑"}],
    clues:["트로피 하나 뒤에 작은 문이 있다."]
  },
  {
    id:"secret_passage", name:"비밀 통로", icon:"🌒",
    desc:"마법부 내 비밀 지하 통로. 오직 특별한 방법으로만 접근 가능하다.",
    connections:["final_chamber","corridor_main"],
    locked:true, requiredKey:"any:vault_key,floo_bag,quidditch_trophy",
    items:[{id:"dark_mark_carving",name:"죽음의 표식 문양",desc:"벽에 새겨진 죽음의 표식. 최근에 그려진 것 같다.",isKey:false,icon:"💀"}],
    clues:["여기서 최근 마법 전투가 있었다.","두 개의 서로 다른 마법 흔적이 남아있다."]
  },
  {
    id:"past_corridor", name:"과거 복도 (타임터너)", icon:"🕰️",
    desc:"타임터너로만 접근 가능한 과거 마법부의 모습. 모든 것이 다르게 보인다.",
    connections:["dept_mysteries"], locked:true, requiredKey:"timeturner",
    items:[{id:"past_evidence",name:"과거의 증거",desc:"현재 사건과 연결되는 과거의 결정적 증거.",isKey:false,icon:"🗝️"}],
    clues:["여기서 본 것들이 현재와 연결된다."]
  },
  {
    id:"final_chamber", name:"최후의 방", icon:"⚡",
    desc:"마법부 지하 깊은 곳의 최후 방. 어둠과 빛의 기운이 충돌한다.",
    connections:["secret_passage","mysteries_core"], locked:true, requiredKey:"core_crystal",
    items:[{id:"final_secret",name:"최종 비밀",desc:"마법부의 모든 것을 뒤흔들 결정적 비밀.",isKey:false,icon:"🌟"}],
    clues:["여기서 모든 것이 결정된다."]
  }
];
