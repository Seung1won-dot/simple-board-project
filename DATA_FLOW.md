# 🔄 전체 데이터 흐름 설명

## 아키텍처 개요

```
┌─────────────┐      HTTP 요청       ┌─────────────┐      SQL 쿼리      ┌─────────────┐
│             │  ──────────────────▶  │             │  ──────────────▶  │             │
│  브라우저    │                      │  Node.js    │                    │   MySQL     │
│  (React)    │  ◀─────────────────  │  (Express)  │  ◀──────────────  │   DB        │
│             │      JSON 응답        │             │      결과         │             │
└─────────────┘                      └─────────────┘                    └─────────────┘
   포트 3000                             포트 3001                         포트 3306
```

## 1️⃣ READ (데이터 조회) 흐름

### 사용자 행동: 페이지를 열면 게시글 목록이 보임

```
1. [브라우저] 사용자가 http://localhost:3000 접속
   │
2. [React] App.jsx의 useEffect가 실행
   │   └─▶ fetch('/posts') 호출
   │
3. [HTTP] GET http://localhost:3001/posts 요청 전송
   │
4. [Express] 서버가 요청 수신
   │   └─▶ app.get('/posts', ...) 실행
   │
5. [MySQL] SELECT * FROM posts 쿼리 실행
   │   └─▶ DB에서 데이터 조회
   │
6. [결과 반환] MySQL → Express → React 순서로 데이터 전달
   │
7. [React] setPosts(data)로 상태 업데이트
   │
8. [UI] posts.map()으로 게시글 목록 화면에 렌더링
```

### 코드 흐름 (App.jsx)
```javascript
// 1. useEffect가 처음 실행
useEffect(() => {
  fetchPosts();  // 이 함수가 실행됨
}, []);

// 2. fetch로 API 호출
const fetchPosts = async () => {
  const response = await fetch('http://localhost:3001/posts');
  const data = await response.json();
  setPosts(data);  // 상태 업데이트 → 화면 다시 그려짐
};
```

---

## 2️⃣ CREATE (데이터 생성) 흐름

### 사용자 행동: 제목, 내용, 작성자를 입력하고 등록 버튼 클릭

```
1. [사용자] 입력 폼에 데이터 입력
   │
2. [React] 사용자가 입력할 때마다 handleChange 호출
   │   └─▶ setFormData({ ...formData, [name]: value })로 상태 업데이트
   │
3. [사용자] "등록" 버튼 클릭 → handleSubmit 실행
   │
4. [HTTP] POST http://localhost:3001/posts 요청 전송
   │   └─▶ Body에 JSON 데이터 포함
   │
5. [Express] 서버가 요청 수신
   │   └─▶ app.post('/posts', ...) 실행
   │
6. [Express] req.body에서 데이터 추출
   │   └─▶ const { title, content, author } = req.body;
   │
7. [MySQL] INSERT INTO posts (title, content, author) VALUES (...) 쿼리 실행
   │
8. [결과 반환] 생성된 게시글 정보 반환
   │
9. [React] fetchPosts() 재호출 → 목록 갱신
```

### 코드 흐름
```javascript
// 1. 폼 제출 시
<form onSubmit={handleSubmit}>
  <input name="title" value={formData.title} onChange={handleChange} />
  ...
</form>

// 2. POST 요청 전송
const response = await fetch('http://localhost:3001/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)  // 객체를 JSON 문자열로 변환
});
```

---

## 3️⃣ DELETE (데이터 삭제) 흐름

### 사용자 행동: 게시글의 "삭제" 버튼 클릭

```
1. [사용자] 삭제 버튼 클릭 → handleDelete(post.id) 실행
   │
2. [HTTP] DELETE http://localhost:3001/posts/{id} 요청 전송
   │
3. [Express] 서버가 요청 수신
   │   └─▶ app.delete('/posts/:id', ...) 실행
   │
4. [Express] URL에서 id 추출
   │   └─▶ const { id } = req.params;
   │
5. [MySQL] DELETE FROM posts WHERE id = ? 쿼리 실행
   │
6. [React] fetchPosts() 재호출 → 목록 갱신
```

---

## 4️⃣ REST API 정리

| HTTP 메서드 | URL | 설명 | 비유 |
|------------|-----|------|-----|
| GET | /posts | 모든 게시글 조회 | 📖 책 읽기 |
| POST | /posts | 새 게시글 작성 | ✏️ 글 쓰기 |
| DELETE | /posts/:id | 특정 게시글 삭제 | 🗑️ 종이 버리기 |

---

## 5️⃣ 각 기술의 역할

| 기술 | 역할 | 비유 |
|-----|------|-----|
| **React** | UI 렌더링, 사용자 입력 처리 | 📺 TV 화면 |
| **Node.js** | JavaScript 런타임 (서버运行环境) | 🏭 공장 |
| **Express** | HTTP 요청 라우팅, 미들웨어 | 📬 우체부 |
| **MySQL** | 데이터 영구 저장 | 🗄️ 창고 |

---

## 6️⃣ 데이터 형식 변환

클라이언트와 서버가 데이터를 주고받을 때는 **JSON** 형식을 사용합니다.

```javascript
// JavaScript 객체
{ title: "안녕하세요", content: "내용", author: "홍길동" }

// JSON 문자열 (네트워크 전송 시)
'{"title":"안녕하세요","content":"내용","author":"홍길동"}'

// 변환 함수
JSON.stringify(obj)    // 객체 → JSON (전송할 때)
JSON.parse(jsonString) // JSON → 객체 (받을 때)
```
