/**
 * ============================================
 * 📦 데이터베이스 연결 파일 (db.js)
 * ============================================
 * 
 * 이 파일은 MySQL 데이터베이스에 연결하는 역할을 합니다.
 * MySQL2 라이브러리를 사용하여 비동기 DB 작업을 지원합니다.
 * 
 * 【핵심 개념】
 * - 연결 풀(Connection Pool): DB 연결을 미리 생성하여 재사용
 *   → 매 요청마다 새 연결을 만들면 느려지니까!
 * - 환경변수: DB 접속 정보는 별도 관리 (보안)
 */

const mysql = require('mysql2/promise');

// ===== 여기를 본인 환경에 맞게 수정하세요 =====
const dbConfig = {
  host: 'localhost',      // DB 서버 주소 (로컬이면 localhost)
  user: 'root',          // MySQL 사용자 이름
  password: 'your_password',  // MySQL 비밀번호 (본인 비번으로 변경!)
  database: 'simple_app' // 사용할 데이터베이스 이름
};
// ==========================================

// 연결 풀 생성 - 최대 10개 연결을 미리 확보
const pool = mysql.createPool(dbConfig);

module.exports = pool;  // 다른 파일에서 사용하기 위해 내보내기
