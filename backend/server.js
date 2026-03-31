/**
 * ============================================
 * 🖥️ 백엔드 서버 메인 파일 (server.js)
 * ============================================
 * 
 * 이 파일이 서버의 시작점입니다!
 * Express 프레임워크를 사용하여 REST API를 제공합니다.
 * 
 * 【핵심 개념】
 * - Express: Node.js 웹 프레임워크 (路由, 미들웨어 등 제공)
 * - REST API: URL로资源的를 표현하고 HTTP 메서드로 동작을 정의
 *   예) GET /posts  → 데이터 조회
 *       POST /posts → 데이터 생성
 *       DELETE /posts/:id → 데이터 삭제
 * - CORS: 다른 도메인에서 요청을 허용 (프론트엔드 포트와 통신 위해)
 */

const express = require('express');  // Express 프레임워크 가져오기
const cors = require('cors');         // CORS 미들웨어 (프론트엔드와 통신 허용)
const pool = require('./db');        // DB 연결 모듈 가져오기

// ===== 서버 기본 설정 =====
const app = express();              // Express 앱 생성
const PORT = 3001;                  // 서버 포트 번호 (프론트는 보통 3000)

// ===== 미들웨어 설정 =====
// 미들웨어: 요청이 도착했을 때 처리하기 전에 거쳐가는 중간 처리기
app.use(cors());                    // 모든 도메인에서 API 접근 허용
app.use(express.json());            // JSON 형식의 요청.body를 파싱

// ===== REST API 라우트 정의 =====
// 라우트: URL 경로와 처리 함수를 연결

/**
 * 【GET /posts】
 * 모든 게시글을 조회합니다 (READ)
 * 
 * 데이터 흐름:
 * 1. 클라이언트가 GET /posts 요청
 * 2. → Express가 요청 수신
 * 3. → DB에서 SELECT 쿼리 실행
 * 4. → 결과를 JSON으로 응답
 */
app.get('/posts', async (req, res) => {
  try {
    // DB에서 모든 게시글 조회 (최신순)
    const [rows] = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(rows);  // JSON 형태로 응답
  } catch (err) {
    console.error('조회 실패:', err);
    res.status(500).json({ error: '게시글 조회 실패' });
  }
});

/**
 * 【POST /posts】
 * 새 게시글을 생성합니다 (CREATE)
 * 
 * 데이터 흐름:
 * 1. 클라이언트가 POST /posts + JSON 본문 전송
 * 2. → Express가 요청.body에서 데이터 추출
 * 3. → DB에 INSERT 쿼리 실행
 * 4. → 생성된 데이터를 응답
 */
app.post('/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;  // 요청에서 데이터 추출
    
    // DB에 새 게시글 삽입
    const [result] = await pool.query(
      'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
      [title, content, author]
    );
    
    // 생성된 게시글의 ID와 함께 응답
    res.json({
      id: result.insertId,
      title,
      content,
      author,
      message: '게시글이 생성되었습니다!'
    });
  } catch (err) {
    console.error('생성 실패:', err);
    res.status(500).json({ error: '게시글 생성 실패' });
  }
});

/**
 * 【DELETE /posts/:id】
 * 특정 게시글을 삭제합니다 (DELETE)
 * 
 * :id → URL 파라미터 (예: /posts/5 → id=5)
 */
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;  // URL에서 id 추출
    
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    res.json({ message: '삭제 완료!' });
  } catch (err) {
    console.error('삭제 실패:', err);
    res.status(500).json({ error: '삭제 실패' });
  }
});

// ===== 서버 시작 =====
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║  🚀 서버가 시작되었습니다!                ║
  ║  http://localhost:${PORT}                   ║
  ║                                          ║
  ║  사용 가능한 API:                         ║
  ║  - GET    /posts    → 게시글 목록 조회    ║
  ║  - POST   /posts    → 게시글 작성         ║
  ║  - DELETE /posts/:id → 게시글 삭제        ║
  ╚══════════════════════════════════════════╝
  `);
});
