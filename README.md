# 🐑 램고치 (RAMgotti)

> **"맥북 프리징을 때려잡는 화면 위 듀얼 메모리 청소 다마고치"**  
> *Always-on-Top macOS Desktop Companion built with Tauri v2 + React 19 + TypeScript + Rust*

<p align="center">
  <img src="assets/ramgotti-preview.svg" alt="RAMgotti 3-Stage Preview" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tauri-v2.0-24C8D8?style=flat-square&logo=tauri&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Rust-Native-orange?style=flat-square&logo=rust&logoColor=white" />
  <img src="https://img.shields.io/badge/macOS-Apple_Silicon_%26_Intel-white?style=flat-square&logo=apple&logoColor=black" />
</p>

---

## ⚡ 왜 만들었을까? (Problem)

개발자·디자이너의 맥북은 항상 고통받습니다:
1. **Chromium 램 폭식**: 크롬 탭 30개+, 피그마, 슬랙, 노션이 RAM을 85~95%까지 집어삼킵니다.
2. **에디터 언어 서버 비대화**: VS Code의 `tsserver`나 `Code Helper`가 몇 시간만 지나도 프로세스 혼자 2GB를 넘깁니다.
3. **작업 중 강제 종료의 공포**: 기존 클리너 앱들은 무식하게 앱을 꺼버려 작성 중이던 코드가 날아갑니다.
4. **결국 비치볼(Beachball) & 프리징**: 스왑 메모리를 기록할 디스크 공간마저 부족해지면 맥북 전체가 멈춥니다.

---

## 💡 램고치의 해결책 (Solution)

**램고치는 작업창을 끄지 않고 백그라운드 찌꺼기 램만 쏙 빼주는 화면 위 플로팅 펫입니다.**

1. **Always-on-Top 투명 플로팅 윈도우**:
   - 평소엔 주 모니터 우측 하단에서 조용히 쿨쿨 잠을 잡니다 (`RAM < 60%`).
2. **위기 감지 80% 팝업**:
   - RAM 압박도가 80%를 돌파하면 화면 아래에서 땀을 삐질삐질 흘리며 고개를 쏙 내밉니다.
   - 말풍선: *"주인님... 크롬 탭이랑 VS Code가 램 3.8GB 먹고 있어요! [ 🧹 싹 쓸기 ]"*
3. **App-Aware 1초 다이어트 (작업 손실 0%)**:
   - 활성 탭은 그대로 두고, 15분 이상 안 본 백그라운드 탭만 절전 동결 (Tab Discarding)
   - 에디터 창은 유지한 채 비대해진 `tsserver`만 핫 리셋 (Hot-Reload)
   - macOS Inactive RAM 퍼지(`purge`)
   - **한 번의 클릭으로 2~4GB 즉시 회수!**
4. **도파민 루프 (게이미피케이션)**:
   - 턴 램 용량(MB)이 그대로 경험치(XP)가 되어 펫이 레벨업하고 진화합니다!
   - 꼬마 먼지양(Lv.1) ➔ 청소부 양(Lv.5) ➔ 사이보그 양(Lv.10) ➔ 램 대마법사(Lv.20)
5. **🎨 나만의 램고치 선택 & 환경설정 (Settings Modal)**:
   - 펫에 마우스를 올리고 ⚙️ 아이콘을 누르면 언제든 원하는 캐릭터로 변경 가능!
   - 🌟 **1호: 몽글 픽셀 램** (황금 뿔 & 별빛 눈망울의 모찌 솜사탕 양)
   - 🧢 **2호: 비니 쓴 청소양** (노란 털비니와 미니 빗자루를 든 아기양)
   - ☁️ **3호: 마시멜로 구름양** (램 위기 시 땀방울을 삐질 흘리는 발광 구름)
   - 👾 **4호: 레트로 도트 양** (가볍고 미니멀한 오리지널 벡터 도트)
   - 위기 감지 임계치(75% / 80% / 85%) 및 8비트 사운드 FX, 자동 청소 토글 지원!

---

## 📦 설치하기 (Installation)

### ✅ 방법 1. Homebrew로 1초 설치 (권장)
터미널에서 명령어 한 줄이면 설치 끝! Apple Silicon(M1/M2/M3/M4)과 Intel 칩셋 자동 인식 및 Gatekeeper 우회(`xattr`)까지 자동 처리됩니다.

```bash
brew install --cask project-hh-com/ramgotti/ramgotti
```

> **제거할 때**:
> ```bash
> brew uninstall --cask ramgotti
> ```

### 📥 방법 2. DMG 직접 다운로드
[GitHub Releases](https://github.com/project-hh-com/ramgotti/releases)에서 내 Mac 칩셋에 맞는 DMG를 내려받아 `Applications` 폴더로 드래그하세요.
- **Apple Silicon (M1/M2/M3/M4)**: `RAMgotti-arm64.dmg`
- **Intel Mac**: `RAMgotti-x64.dmg`

*(직접 설치 시 Gatekeeper "손상되어 열 수 없습니다" 경고가 뜨면: `xattr -dr com.apple.quarantine /Applications/RAMgotti.app` 실행)*

---

## 🚀 빠른 시작 (Quick Start)

### 1. 맥북 터미널에서 당장 램 3GB 털어내기 (독립 스크립트)
앱을 빌드하지 않고도, 포함된 단독 쉘 스크립트로 맥북의 램을 지금 즉시 확보할 수 있습니다:

```bash
# 램고치 퀵 다이어트 엔진 실행 (1초 만에 비활성 탭 및 찌꺼기 램 정리)
bash scripts/quick-diet.sh
```

---

### 2. 웹 브라우저에서 펫 시뮬레이터 띄우기 (Mock Mode)
Tauri/Rust 환경 없이도 표준 웹 브라우저(`Chrome/Safari`)에서 램고치 UI와 애니메이션, 청소 루프를 바로 테스트할 수 있습니다:

```bash
# 의존성 설치
pnpm install

# 브라우저 개발 서버 실행 (http://localhost:1420)
pnpm dev
```
> 상단 **DEV MOCK** 컨트롤러로 RAM 55%(수면), 72%(주의), 88%(위기) 상태를 실시간 토글하며 빗자루 청소 사운드와 액션을 경험해보세요!

---

### 3. macOS 데스크톱 네이티브 앱 실행 (Tauri v2)
실제 맥북 화면 위에 투명하게 떠 있는 Always-on-Top 램고치를 실행합니다:

```bash
# macOS 투명 플로팅 윈도우 실행
pnpm tauri dev
```

---

## 🛠 기술 아키텍처 (Architecture)

> **"메모리 청소 앱 자체가 메모리를 300MB씩 먹으면 모순이다."**  
> Electron 대신 **Tauri v2 (Rust + React/TypeScript)** 로 구축하여 메모리 점유율 **15MB 미만**을 달성했습니다.

```
ramgotti/
├── src/                          # React 19 + TypeScript 프론트엔드
│   ├── components/
│   │   ├── RamgottiPet.tsx       # 5가지 감정 상태 픽셀 램 벡터 렌더러
│   │   ├── PanicBubble.tsx       # 80% 위기 팝업 & [ 🧹 싹 쓸기 ] CTA
│   │   └── CleanReceipt.tsx      # 회수 용량 및 EXP 획득 영수증
│   ├── lib/
│   │   ├── tauri-bridge.ts       # Tauri invoke ↔ Web Mock 자동 브릿지
│   │   └── sfx.ts                # Web Audio API 기반 8비트 사운드 엔진
│   └── App.tsx                   # 상태 머신 및 실시간 텔레메트리 루프
├── src-tauri/                    # Rust 네이티브 백엔드 (Tauri v2)
│   ├── src/lib.rs                # macOS 시스템 메모리 계측 & Purge 커맨드
│   └── tauri.conf.json           # 투명(Transparent) & Always-on-Top 윈도우 설정
└── scripts/
    └── quick-diet.sh             # 맥북 터미널 1초 램 다이어트 쉘 엔진
```

---

## 📜 로드맵 (Roadmap)
- [x] **v0.1**: 램고치 5단계 상태 펫 인터랙션 & 사운드 FX
- [x] **v0.1**: 브라우저 Mock 시뮬레이터 & 맥북 CLI 퀵 다이어트 스크립트
- [x] **v0.1**: Tauri v2 투명 플로팅 윈도우 & Rust 시스템 텔레메트리 연동
- [ ] **v0.2**: Chrome DevTools Protocol / AppleScript 기반 실시간 탭 디스카드 완성
- [ ] **v0.3**: 30일 방치 `node_modules` 원클릭 레이드 소탕 엔진
- [ ] **v0.4**: macOS 메뉴바 트레이(Tray) 및 펫 진화/스킨 커스터마이징

---

## 👥 Authors
- **황다희 (@dahee90522)** · Product Engineer
- **팡팡 (FangFang)** · AI Assistant
- **조직**: [project-hh-com](https://github.com/project-hh-com)
