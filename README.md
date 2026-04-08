# Flight Operation Frontend

항공편 운항 현황을 실시간으로 모니터링하는 대시보드 웹 애플리케이션입니다.

## 주요 기능

- **실시간 항공편 현황판** - 항공편 스케줄, 상태(정시/지연/결항 등)를 테이블로 표시
- **실시간 알림 패널** - 지연, 결항, 게이트 변경 등 알림을 WebSocket(STOMP)으로 수신 및 확인 처리
- **항공편 지도** - Leaflet 기반 지도에서 비행 중인 항공편 위치를 실시간 표시
- **통계 대시보드** - 일일 운항 통계(정시율, 지연, 결항)와 Recharts 기반 차트 시각화
- **연결 상태 표시** - WebSocket 연결 상태를 헤더 및 배너로 표시

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React 19, TypeScript |
| 지도 | Leaflet, React-Leaflet |
| 차트 | Recharts |
| 실시간 통신 | STOMP over WebSocket (SockJS) |
| 빌드 | Create React App |
| 배포 | Docker (Node 20 + Nginx) |

## 프로젝트 구조

```
src/
├── api/
│   └── client.ts          # API 클라이언트 (Flight API, Alert API)
├── components/
│   ├── Header.tsx          # 상단 헤더 (WebSocket 연결 상태)
│   ├── ConnectionBanner.tsx # 연결 끊김 배너
│   ├── StatsBar.tsx        # 일일 운항 통계 바
│   ├── FlightBoard.tsx     # 항공편 현황판 테이블
│   ├── AlertPanel.tsx      # 실시간 알림 패널
│   ├── FlightMap.tsx       # 항공편 위치 지도
│   └── StatsCharts.tsx     # 통계 차트
├── hooks/
│   └── useAlerts.ts        # 알림 WebSocket 훅
├── types/
│   └── index.ts            # TypeScript 타입 정의
└── App.tsx                 # 루트 컴포넌트
```

## 시작하기

### 사전 요구사항

- Node.js 20+
- npm

### 환경 변수

| 변수 | 설명 | 기본값 |
|------|------|--------|
| `REACT_APP_FLIGHT_API` | Flight API 서버 URL | `http://localhost:8081` |
| `REACT_APP_ALERT_API` | Alert API 서버 URL | `http://localhost:8082` |

### 로컬 실행

```bash
npm install
npm start
```

`http://localhost:3000`에서 접속할 수 있습니다.

### 빌드

```bash
npm run build
```

### Docker 실행

```bash
docker build -t flight-operation-fe .
docker run -p 80:80 flight-operation-fe
```

## 백엔드 연동

이 프론트엔드는 두 개의 백엔드 서비스와 통신합니다:

- **Flight API** (`REACT_APP_FLIGHT_API`) - 항공편 정보, 위치, 통계 조회
- **Alert API** (`REACT_APP_ALERT_API`) - 알림 조회/확인 및 WebSocket 실시간 알림 구독
