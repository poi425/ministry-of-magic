// =============================================
// 🔥 FIREBASE 설정 - 본인의 Firebase 프로젝트 정보로 교체하세요
// =============================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB5llCw-PLO-euQrLxu21IxlKQr4uWFXNo",
  authDomain: "ministry-of-magic-ebdab.firebaseapp.com",
  databaseURL: "https://ministry-of-magic-ebdab-default-rtdb.firebaseio.com",
  projectId: "ministry-of-magic-ebdab",
  storageBucket: "ministry-of-magic-ebdab.firebasestorage.app",
  messagingSenderId: "676854342391",
  appId: "1:676854342391:web:ef73dd683297579f1aa9f2"
};

// Firebase 초기화
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.database();

// =============================================
// 🗺️ 게임 맵 데이터 - 마법부 청사 20개 방
// =============================================
const ROOMS_DATA = {
  atrium: {
    id: "atrium",
    name: "아트리움",
    description: "마법부 청사의 웅장한 입구 홀. 금빛 분수가 중앙에 자리하고 있으며, 마법사들이 분주히 오가고 있다.",
    flavor: "천장에서 내려오는 마법의 빛이 대리석 바닥에 반사된다.",
    connections: ["auror_office", "department_mysteries", "level2_hall", "level3_hall"],
    items: [
      { id: "atrium_key", name: "황금 배지", description: "마법부 직원 배지. 특정 구역 접근이 가능하다.", type: "key", target: "minister_office" }
    ],
    clues: [
      "벽에 새겨진 문장: '마법은 강자의 것이 아니라 현명한 자의 것이다'",
      "분수 바닥에 동전들이 가득하다. 누군가 소원을 빌었을지도."
    ],
    scenario: "아트리움에 들어서자마자 마법부 직원들의 시선이 집중된다. 무언가 심상치 않은 분위기가 감돈다."
  },
  auror_office: {
    id: "auror_office",
    name: "오러 사무소",
    description: "어둠의 마법사를 추적하는 오러들의 집무실. 각종 마법 탐지 도구와 파일들이 가득하다.",
    flavor: "책상 위에 놓인 지도에 붉은 점들이 깜빡이고 있다.",
    connections: ["atrium", "interrogation_room", "evidence_room"],
    items: [
      { id: "auror_key", name: "오러 완장", description: "오러 전용 완장. 신문실 접근 권한을 준다.", type: "key", target: "interrogation_room" },
      { id: "spell_book", name: "마법 매뉴얼", description: "전투 주문이 기록된 낡은 책.", type: "item" }
    ],
    clues: [
      "최근 수배자 명단에 낯익은 이름이 보인다",
      "서랍 안에 숨겨진 쪽지: '밤 11시, 신비부'"
    ],
    scenario: "오러 사무소는 긴장감이 흐른다. 최근 어둠의 마법사 활동이 급증했다는 보고서가 눈에 띈다."
  },
  department_mysteries: {
    id: "department_mysteries",
    name: "신비부",
    description: "마법부에서 가장 비밀스러운 부서. 시간, 공간, 죽음에 관한 연구가 이루어진다.",
    flavor: "문을 여는 순간 이상한 속삭임이 들린다.",
    connections: ["atrium", "death_room", "time_room", "brain_room"],
    items: [
      { id: "prophecy_key", name: "예언구", description: "안개가 서린 유리구. 무언가가 속삭인다.", type: "key", target: "death_room" }
    ],
    clues: [
      "복도 끝에 '들어오지 마시오' 표지판이 있는 문",
      "바닥에 남겨진 발자국이 갑자기 사라진다"
    ],
    scenario: "신비부의 복도는 끝없이 이어지는 것처럼 느껴진다. 문들이 저절로 열리고 닫힌다."
  },
  interrogation_room: {
    id: "interrogation_room",
    name: "심문실",
    description: "어두컴컴한 방 한가운데 의자가 놓여있다. 의자에는 마법으로 제어되는 사슬이 달려있다.",
    flavor: "벽에는 오래된 핏자국이 지워지지 않고 남아있다.",
    connections: ["auror_office", "holding_cells"],
    items: [
      { id: "veritaserum", name: "진실의 약", description: "한 방울이면 모든 비밀이 드러난다.", type: "item" }
    ],
    clues: [
      "의자 아래 숨겨진 쪽지: '그들은 모든 것을 알고 있다'",
      "최근 심문 기록이 찢겨져 있다"
    ],
    scenario: "심문실에 들어서자 이상한 압박감이 느껴진다. 누군가 이 방에서 무언가를 숨기고 있는 것 같다."
  },
  evidence_room: {
    id: "evidence_room",
    name: "증거 보관실",
    description: "압수된 마법 도구들이 가득한 창고. 각각 마법 봉인이 걸려있다.",
    flavor: "선반 위의 물건들이 가끔씩 저절로 움직인다.",
    connections: ["auror_office"],
    items: [
      { id: "dark_artifact", name: "어둠의 유물", description: "강력한 저주가 걸린 고대 유물.", type: "key", target: "dark_archives" },
      { id: "invisibility_cloak", name: "투명 망토 조각", description: "진짜 투명 망토의 일부인 것 같다.", type: "item" }
    ],
    clues: [
      "최근 추가된 물건의 태그에 수상한 마법사의 이름이 적혀있다",
      "봉인이 풀린 빈 선반이 있다"
    ],
    scenario: "증거 보관실의 물건들이 불안하게 진동하고 있다. 강력한 어둠의 기운이 느껴진다."
  },
  death_room: {
    id: "death_room",
    name: "죽음의 방",
    description: "낡은 돌 아치가 서 있는 방. 아치에는 낡은 베일이 걸려있고, 그 너머에서 속삭임이 들린다.",
    flavor: "베일이 바람도 없는데 흔들린다.",
    connections: ["department_mysteries"],
    items: [
      { id: "veil_fragment", name: "베일 조각", description: "죽음의 아치에서 떨어진 천. 이상한 기운이 느껴진다.", type: "item" }
    ],
    clues: [
      "베일 너머에서 들리는 목소리: '...돌아가야 해...'",
      "바닥의 고대 문자가 '죽음은 끝이 아니다'라고 쓰여있다"
    ],
    scenario: "죽음의 방에 들어선 순간, 시간이 느리게 흐르는 것 같은 느낌이 든다."
  },
  time_room: {
    id: "time_room",
    name: "시간의 방",
    description: "수백 개의 시계가 벽을 가득 채우고 있다. 모두 다른 시간을 가리키고 있다.",
    flavor: "타임터너들이 선반 위에 가지런히 놓여있다.",
    connections: ["department_mysteries"],
    items: [
      { id: "time_turner", name: "타임터너", description: "시간을 되돌릴 수 있는 모래시계 목걸이.", type: "key", target: "past_ministry" }
    ],
    clues: [
      "시계 하나가 거꾸로 가고 있다",
      "선반 위의 메모: '절대 세 바퀴 이상 돌리지 말 것'"
    ],
    scenario: "시간의 방에서는 미래와 과거가 뒤섞이는 느낌이 든다. 타임터너들이 빛을 발하고 있다."
  },
  brain_room: {
    id: "brain_room",
    name: "뇌의 방",
    description: "수조 안에 마법으로 보존된 뇌들이 떠다니고 있다. 각각 다른 색깔의 빛을 발한다.",
    flavor: "뇌들이 이따금 수면 위로 촉수 같은 것을 내밀었다 집어넣는다.",
    connections: ["department_mysteries", "thought_archive"],
    items: [
      { id: "memory_vial", name: "기억 약병", description: "누군가의 소중한 기억이 담긴 은빛 액체.", type: "item" }
    ],
    clues: [
      "수조 바닥에 가라앉은 물건이 보인다",
      "보존된 뇌 하나가 다른 것들보다 훨씬 크다"
    ],
    scenario: "뇌의 방에 들어서자 머릿속에 낯선 생각들이 침투하는 것 같다."
  },
  minister_office: {
    id: "minister_office",
    name: "마법부 장관실",
    description: "마법부 최고 권력자의 집무실. 고급스러운 가구와 마법 초상화들이 벽을 장식하고 있다.",
    flavor: "역대 마법부 장관들의 초상화가 수군거리고 있다.",
    connections: ["level2_hall", "secret_passage"],
    locked: true,
    requiredKey: "atrium_key",
    items: [
      { id: "ministry_seal", name: "마법부 인장", description: "모든 마법부 문서에 날인되는 공식 인장.", type: "key", target: "classified_vault" }
    ],
    clues: [
      "책상 서랍에 잠긴 상자가 있다",
      "초상화들이 갑자기 조용해진다"
    ],
    scenario: "장관실에 들어서자 역대 장관들의 초상화가 일제히 시선을 돌린다."
  },
  level2_hall: {
    id: "level2_hall",
    name: "2층 복도",
    description: "마법 법무부와 마법 집행국이 있는 층의 복도. 직원들이 바쁘게 오가고 있다.",
    flavor: "공문서들이 마법으로 공중에서 날아다니고 있다.",
    connections: ["atrium", "minister_office", "wizengamot_chamber", "magical_law"],
    items: [],
    clues: [
      "게시판에 긴급 공지가 붙어있다",
      "누군가 황급히 뛰어가고 있다"
    ],
    scenario: "2층 복도에서 긴장된 분위기가 느껴진다. 무언가 큰 일이 벌어지고 있는 것 같다."
  },
  level3_hall: {
    id: "level3_hall",
    name: "3층 복도",
    description: "마법 사고 및 재해 대응부가 있는 층의 복도.",
    flavor: "비상구 표시가 마법으로 빛나고 있다.",
    connections: ["atrium", "magical_accidents", "obliviator_hq"],
    items: [
      { id: "portkey", name: "항구항", description: "오래된 부츠. 특정 장소로 이동시켜준다.", type: "key", target: "secret_passage" }
    ],
    clues: [
      "최근 머글 세계에서 발생한 마법 사고 보고서",
      "기억 수정팀이 긴급 출동한 흔적"
    ],
    scenario: "3층 복도 끝에서 이상한 소음이 들려온다."
  },
  wizengamot_chamber: {
    id: "wizengamot_chamber",
    name: "위젠가못 법정",
    description: "마법사 세계 최고 법원. 원형으로 배치된 좌석이 위압적이다.",
    flavor: "재판이 없는 지금, 법정은 고요하지만 무거운 공기가 흐른다.",
    connections: ["level2_hall"],
    items: [
      { id: "court_record", name: "재판 기록서", description: "최근 비밀 재판의 기록. 이름이 지워져있다.", type: "item" }
    ],
    clues: [
      "피고인석의 사슬이 저절로 움직인다",
      "최근 기록에서 삭제된 페이지들"
    ],
    scenario: "위젠가못 법정에 들어서자 과거의 판결들이 메아리처럼 울리는 것 같다."
  },
  magical_law: {
    id: "magical_law",
    name: "마법 집행국",
    description: "마법 법규를 집행하는 부서. 각종 규정집과 처벌 명령서가 가득하다.",
    flavor: "책장에서 저절로 문서들이 분류되고 있다.",
    connections: ["level2_hall", "holding_cells"],
    items: [
      { id: "arrest_warrant", name: "체포 영장", description: "이름이 비어있는 체포 영장.", type: "item" }
    ],
    clues: [
      "비밀 처벌 목록이 잠긴 캐비닛에 있다",
      "최근 발령된 수배령 중 수상한 것이 있다"
    ],
    scenario: "마법 집행국의 분위기는 삼엄하다. 모든 것이 기록되고 있다."
  },
  holding_cells: {
    id: "holding_cells",
    name: "임시 구치소",
    description: "재판을 기다리는 마법사들이 수용되는 곳. 마법 차단 결계가 쳐져있다.",
    flavor: "독방에서 누군가 중얼거리는 소리가 들린다.",
    connections: ["interrogation_room", "magical_law"],
    items: [
      { id: "prisoner_note", name: "수감자 쪽지", description: "수감자가 남긴 암호화된 메시지.", type: "item" }
    ],
    clues: [
      "특정 독방의 문이 다른 것들보다 더 두껍다",
      "바닥에 새겨진 마법 문자들"
    ],
    scenario: "임시 구치소에서 절망적인 기운이 느껴진다."
  },
  magical_accidents: {
    id: "magical_accidents",
    name: "마법 사고 대응부",
    description: "예기치 못한 마법 사고를 처리하는 부서. 각종 해독약과 반격 주문서가 구비되어있다.",
    flavor: "한쪽 구석에서 연기가 피어오르고 있다.",
    connections: ["level3_hall", "research_lab"],
    items: [
      { id: "antidote", name: "만능 해독약", description: "대부분의 저주를 해제할 수 있다.", type: "item" }
    ],
    clues: [
      "최근 사고 보고서 중 은폐된 사건들이 있다",
      "비정상적인 마법 에너지 측정 기록"
    ],
    scenario: "마법 사고 대응부에서 불안정한 마법 에너지가 느껴진다."
  },
  obliviator_hq: {
    id: "obliviator_hq",
    name: "기억 수정팀 본부",
    description: "머글의 기억을 수정하는 팀의 본부. 수정된 기억의 파편들이 보관되어있다.",
    flavor: "유리 케이스 안의 기억 파편들이 빛나고 있다.",
    connections: ["level3_hall"],
    items: [
      { id: "obliviate_wand", name: "기억 수정 지팡이", description: "특수 제작된 기억 수정 전용 지팡이.", type: "item" }
    ],
    clues: [
      "수정되어서는 안 되는 기억이 포함된 파편",
      "마법사의 기억도 수정된 흔적이 있다"
    ],
    scenario: "기억 수정팀 본부에서 이상한 기시감이 느껴진다. 이곳에 온 적이 있는 것 같기도 하다."
  },
  research_lab: {
    id: "research_lab",
    name: "마법 연구소",
    description: "첨단 마법 연구가 이루어지는 실험실. 실험 중인 약품들이 가득하다.",
    flavor: "형형색색의 약품들이 보글보글 끓고 있다.",
    connections: ["magical_accidents", "classified_vault"],
    items: [
      { id: "experimental_potion", name: "실험적 약품", description: "아직 승인되지 않은 강력한 약품.", type: "item" },
      { id: "lab_key", name: "연구소 열쇠", description: "기밀 보관실로 통하는 열쇠.", type: "key", target: "classified_vault" }
    ],
    clues: [
      "연구 노트에 금지된 마법 실험 기록",
      "최근 실험이 실패한 흔적들"
    ],
    scenario: "연구소의 실험들이 예상치 못한 방향으로 진행되고 있는 것 같다."
  },
  classified_vault: {
    id: "classified_vault",
    name: "기밀 보관실",
    description: "마법부의 최고 기밀 문서들이 보관된 방. 여러 겹의 마법 봉인이 걸려있다.",
    flavor: "문을 열자마자 경보 마법이 느껴진다.",
    connections: ["research_lab", "secret_passage"],
    locked: true,
    requiredKey: "lab_key",
    items: [
      { id: "horcrux_intel", name: "호크룩스 정보", description: "볼드모트의 호크룩스에 관한 기밀 보고서.", type: "item" }
    ],
    clues: [
      "가장 높은 단계의 보안 파일들",
      "일부 파일이 최근에 누군가 열람한 흔적"
    ],
    scenario: "기밀 보관실에서 엄청난 마법의 기운이 느껴진다. 여기에 중요한 것이 있다."
  },
  secret_passage: {
    id: "secret_passage",
    name: "비밀 통로",
    description: "마법부 청사의 숨겨진 통로. 오직 내부자만 알고 있는 이 통로는 여러 층을 연결한다.",
    flavor: "벽이 마법으로 이동하며 새로운 길을 만든다.",
    connections: ["minister_office", "classified_vault", "dark_archives"],
    locked: true,
    requiredKey: "portkey",
    items: [],
    clues: [
      "벽에 새겨진 마법 표시들",
      "발자국이 나타났다 사라진다"
    ],
    scenario: "비밀 통로에서 여러 갈래의 길이 펼쳐진다."
  },
  dark_archives: {
    id: "dark_archives",
    name: "어둠의 기록실",
    description: "금지된 마법과 어둠의 마법사들에 관한 기록이 보관된 비밀 방.",
    flavor: "책들이 저절로 열리고 닫힌다.",
    connections: ["secret_passage", "evidence_room"],
    locked: true,
    requiredKey: "dark_artifact",
    items: [
      { id: "dark_spell_book", name: "금지된 마법서", description: "가장 강력한 어둠의 마법이 담긴 책.", type: "item" },
      { id: "final_key", name: "최후의 열쇠", description: "마법부 청사의 모든 비밀을 열 수 있는 마스터 키.", type: "key", target: "final_revelation" }
    ],
    clues: [
      "볼드모트의 부활 계획이 담긴 고문서",
      "배신자의 이름이 적힌 목록"
    ],
    scenario: "어둠의 기록실에 들어서자 강력한 어둠의 기운이 엄습한다. 여기서 모든 것이 밝혀질 것 같다."
  },
  thought_archive: {
    id: "thought_archive",
    name: "사고 기록실",
    description: "마법사들의 사고 실험이 기록된 방. 다양한 마법 연구 자료들이 있다.",
    flavor: "유리 구슬 속에 생각의 파편들이 담겨있다.",
    connections: ["brain_room"],
    items: [
      { id: "pensieve_key", name: "억측기 열쇠", description: "억측기(펜시브)에 접근할 수 있는 열쇠.", type: "item" }
    ],
    clues: [
      "중요한 기억이 삭제된 흔적",
      "실험 기록 중 이상한 패턴"
    ],
    scenario: "사고 기록실에서 수많은 기억의 조각들이 흘러다닌다."
  },
  past_ministry: {
    id: "past_ministry",
    name: "과거의 마법부",
    description: "타임터너로 도달한 과거의 마법부. 모든 것이 다르게 배치되어있다.",
    flavor: "50년 전의 마법부가 눈앞에 펼쳐진다.",
    connections: ["time_room"],
    locked: true,
    requiredKey: "time_turner",
    items: [
      { id: "past_secret", name: "과거의 비밀", description: "50년 전에 은폐된 사건의 증거.", type: "item" }
    ],
    clues: [
      "현재에는 사라진 기록들이 여기 있다",
      "과거 마법부 직원의 일기"
    ],
    scenario: "과거의 마법부에서 현재를 바꿀 수 있는 열쇠를 찾아야 한다."
  }
};

// 초기 방 연결 상태
const ROOM_CONNECTIONS = Object.keys(ROOMS_DATA).reduce((acc, roomId) => {
  acc[roomId] = ROOMS_DATA[roomId].connections;
  return acc;
}, {});
