# ⚜️ 마법부 청사 — 멀티플레이어 조사 게임

해리포터 세계관의 마법부 청사를 배경으로 한 실시간 멀티플레이어 탐정 게임입니다.

---

## 🚀 빠른 시작 가이드

### 1단계: Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com) 접속
2. **새 프로젝트 만들기** → 프로젝트 이름 입력 (예: `ministry-of-magic`)
3. Google Analytics는 선택사항 (꺼도 됨)

### 2단계: Realtime Database 설정

1. Firebase 콘솔 → **빌드 → Realtime Database**
2. **데이터베이스 만들기** 클릭
3. **테스트 모드로 시작** 선택
4. **규칙 탭**에서 `firebase-rules.json` 내용을 복사/붙여넣기 후 **게시**

### 3단계: Firebase 설정값 입력

1. Firebase 콘솔 → **프로젝트 설정** (톱니바퀴 아이콘)
2. **내 앱** → **웹 앱 추가** → 앱 등록
3. `firebaseConfig` 값 복사
4. `js/firebase-config.js` 파일 상단의 `FIREBASE_CONFIG` 객체를 실제 값으로 교체:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "실제_API_키",
  authDomain: "프로젝트ID.firebaseapp.com",
  databaseURL: "https://프로젝트ID-default-rtdb.firebaseio.com",
  projectId: "프로젝트ID",
  storageBucket: "프로젝트ID.appspot.com",
  messagingSenderId: "발신자ID",
  appId: "앱ID"
};
```

### 4단계: GitHub Pages 배포

```bash
# 1. GitHub 저장소 생성 후 업로드
git init
git add .
git commit -m "마법부 청사 초기 배포"
git remote add origin https://github.com/USERNAME/ministry-of-magic.git
git push -u origin main

# 2. GitHub 저장소 Settings → Pages
#    Source: main 브랜치, / (root) 선택 → Save
#    배포 주소: https://USERNAME.github.io/ministry-of-magic/
```

---

## 🎮 게임 방법

### 입장
1. `index.html` 접속
2. 마법사 이름, 진영 선택 (불사조 기사단 / 죽음을 먹는 자)
3. **같은 팀**이면 동일 팀 코드 입력
4. 또는 팀원에게 **🔗 팀 초대** 링크 공유

### 탐색
- 현재 방의 **물건** 클릭 → 발견! (전 서버에서 한 명만 가능)
- **단서** 클릭 → 팀 조사 기록에 추가
- **이동 가능한 공간** 버튼 → 팀원 전원 동의 시 이동

### 열쇠 시스템
- 특정 물건은 🔑 열쇠 타입
- 열쇠를 발견하면 해당 잠긴 방 진입 가능
- **전 서버에서 단 한 명만 발견 가능** (먼저 클릭한 사람이 가져감)

### 전투 (다른 진영과 같은 방에서 만날 때)
**선택 1: 전투** — 주문 카드 배틀
- 5가지 주문 중 1개 선택 (15초 제한)
- 동시 공개 → 상성 판정 → HP 차감
- HP 0이 되면 패배 → 아트리움(복도)으로 강제 이동

**선택 2: 협상 퇴장** — 주사위 대결
- 양 팀 주사위 굴리기
- 높은 수가 나온 팀이 방에 머뭄
- 낮은 팀은 아트리움으로 이동

### 주문 상성표
| 내 주문 | 이김 | 비김 | 짐 |
|---------|------|------|----|
| ⚡ Stupefy (공격) | 🪄 방어 | ⚡ 공격 | 🛡️ 방어막, ✨ 반격 |
| 🪄 Expelliarmus (방어) | ✨ 반격 | 🪄 방어 | ⚡ 공격 |
| ✨ Accio (반격) | ⚡ 공격 | ✨ 반격 | 🪄 방어, 🛡️ 방어막 |
| 🔥 Incendio (공격) | 🪄 방어 | ⚡ 공격(tie) | 🛡️ 방어막, ✨ 반격 |
| 🛡️ Protego (방어막) | ⚡ 공격, ✨ 반격 | 🪄 방어 | — |

---

## 🗺️ 방 구조 (22개)

```
아트리움 (시작)
├── 오러 사무소
│   ├── 심문실 → 임시 구치소
│   └── 증거 보관실 → 어둠의 기록실 (잠김)
├── 신비부
│   ├── 죽음의 방 (잠김 - 예언구 필요)
│   ├── 시간의 방 → 과거의 마법부 (잠김)
│   ├── 뇌의 방 → 사고 기록실
├── 2층 복도
│   ├── 마법부 장관실 (잠김 - 황금 배지 필요)
│   │   └── 비밀 통로 (잠김)
│   ├── 위젠가못 법정
│   └── 마법 집행국 → 임시 구치소
└── 3층 복도
    ├── 마법 사고 대응부 → 마법 연구소
    │   └── 기밀 보관실 (잠김) → 비밀 통로
    └── 기억 수정팀 본부
```

---

## 🔧 커스터마이징

### 방 추가/수정
`js/firebase-config.js`의 `ROOMS_DATA` 객체에 새 방 추가:
```javascript
new_room: {
  id: "new_room",
  name: "방 이름",
  description: "설명",
  flavor: "분위기 묘사",
  connections: ["연결된_방_id"],
  items: [...],
  clues: [...],
  scenario: "시나리오 텍스트"
}
```

### 시나리오 수정
각 방의 `scenario` 필드 텍스트를 변경하면 됩니다.

---

## ⚙️ Firebase 무료 플랜 제한
- 동시 접속: 100명 (30명 사용 시 충분)
- 저장 용량: 1GB
- 월 다운로드: 10GB
- 30명 동시 사용에 충분합니다.

---

## 📁 파일 구조

```
ministry-of-magic/
├── index.html          # 로그인/팀 선택 화면
├── lobby.html          # 메인 게임 화면
├── firebase-rules.json # Firebase 보안 규칙
├── css/
│   └── style.css       # 전체 스타일
└── js/
    ├── firebase-config.js  # Firebase 설정 + 방 데이터
    └── game.js             # 게임 로직 (Firebase 연동)
```
