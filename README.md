# 📝 심플 풀스택 게시판 앱

React, Express, Node.js, MySQL를 사용한 CRUD 연산을 보여주는 입문자 친화적 풀스택 애플리케이션입니다.

![기술 스택](https://img.shields.io/badge/Node.js-18+-green) ![React](https://img.shields.io/badge/React-18-blue) ![MySQL](https://img.shields.io/badge/MySQL-8+-orange)

## 🚀 빠르게 시작하기

### 사전 요구사항

- Node.js 18+ 설치
- MySQL 8+ 설치 및 실행 중

### 1. 데이터베이스 설정

```bash
# MySQL 로그인
mysql -u root -p

# 스키마 실행 (backend/schema.sql 내용 복사)
source backend/schema.sql

# 또는 MySQL Workbench/CLI에 SQL 명령어 직접 붙여넣기
```

### 2. 백엔드 설정

```bash
cd backend
npm install

# 환경 파일 복사 및 편집
cp ../.env.example .env
# .env 파일에 MySQL 비밀번호 입력

npm start
# 서버 실행: http://localhost:3001
```

### 3. 프론트엔드 설정

```bash
# 새 터미널에서
cd frontend
npm install
npm run dev
# 앱 실행: http://localhost:3000
```

## 📁 프로젝트 구조

```
simple-board/
├── backend/
│   ├── server.js       # Express API 서버
│   ├── db.js           # MySQL 연결
│   ├── schema.sql      # 데이터베이스 스키마
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx     # 메인 React 컴포넌트
│   │   └── main.jsx    # React 진입점
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example        # 환경 변수 템플릿
├── .gitignore
├── README.md
└── DATA_FLOW.md        # 데이터 흐름 문서 (한국어)
```

## 🔌 API 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
|--------|----------|------|
| GET | `/posts` | 모든 게시글 조회 |
| POST | `/posts` | 새 게시글 생성 |
| DELETE | `/posts/:id` | ID로 게시글 삭제 |

### 요청/응답 예시

**게시글 생성**
```bash
curl -X POST http://localhost:3001/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"안녕하세요","content":"내용입니다","author":"홍길동"}'
```

**모든 게시글 조회**
```bash
curl http://localhost:3001/posts
```

## 🛠️ 기술 스택

| 레이어 | 기술 |
|-------|------|
| 프론트엔드 | React 18, Vite |
| 백엔드 | Node.js, Express |
| 데이터베이스 | MySQL |
| HTTP 클라이언트 | Fetch API |

## 📚 학습 주제

이 프로젝트에서 다룰 내용:
- REST API를 통한 프론트엔드 ↔ 백엔드 통신
- Express 라우팅 (GET, POST, DELETE)
- MySQL CRUD 연산
- React 상태 관리 (useState, useEffect)
- 클라이언트-서버 통신을 위한 JSON 데이터 형식

## ⚠️ 일반적인 문제

### `MySQL 연결 불가`
1. MySQL이 실행 중인지 확인: `net start mysql`
2. `.env` 파일의 비밀번호 확인
3. `simple_app` 데이터베이스가 존재하는지 확인

### CORS 오류
- 백엔드가 3001번 포트에서 실행 중인지 확인
- `frontend/src/App.jsx`의 `API_URL` 확인

### 포트가 이미 사용 중
- `backend/server.js` 또는 `frontend/vite.config.js`의 포트 변경

## 📄 라이선스

MIT
