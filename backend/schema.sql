-- ============================================
-- 📊 데이터베이스 스키마 (schema.sql)
-- ============================================
-- 
-- 【핵심 개념】
-- - 스키마: DB의 구조(테이블, 컬럼, 타입 등)를 정의
-- - 테이블: 엑셀의 시트처럼 행(ROW)과 열(COLUMN)로 구성
-- - PRIMARY KEY: 각 행을 구별하는 고유 식별자
-- - AUTO_INCREMENT: 새 행이 추가될 때 자동으로 1씩 증가
-- - TIMESTAMP: 날짜/시간을 저장하는 타입

-- 1) 데이터베이스 생성 (없으면 생성)
CREATE DATABASE IF NOT EXISTS simple_app;

-- 2) 사용할 데이터베이스 선택
USE simple_app;

-- 3) 게시글 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- 고유 ID (1, 2, 3...)
    title VARCHAR(255) NOT NULL,            -- 제목 (필수, 최대 255자)
    content TEXT,                           -- 내용 (긴 텍스트)
    author VARCHAR(100),                     -- 작성자
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 작성 시각 (자동 기록)
);

-- 4) 샘플 데이터 삽입 (선택사항)
INSERT INTO posts (title, content, author) VALUES 
    ('첫 번째 게시글', '안녕하세요! 이것은 샘플 게시글입니다.', '홍길동'),
    ('두 번째 게시글', '풀스택 개발을 시작해봅시다!', '김철수');
