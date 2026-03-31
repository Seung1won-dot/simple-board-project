/**
 * ============================================
 * 📋 메인 컴포넌트 (App.jsx)
 * ============================================
 * 
 * 【핵심 개념】
 * - useState: React에서 상태(데이터)를 관리하는 Hook
 *   → 값이 바뀌면 화면이 자동으로 다시 그려짐 (Re-render)
 * - useEffect: 컴포넌트가 처음 나타날 때 / 값이 바뀔 때 실행
 * - fetch: 브라우저에서 API를 호출하는 방법 (백엔드와 통신)
 * 
 * 【데이터 흐름】
 * 1. 화면 로드 → useEffect 실행 → 백엔드에서 데이터 가져옴
 * 2. 사용자가 입력 → 상태(state) 업데이트
 * 3. 등록 버튼 클릭 → 백엔드로 데이터 전송 → 목록 갱신
 * 4. 삭제 버튼 클릭 → 백엔드에 삭제 요청 → 목록 갱신
 */

import { useState, useEffect } from 'react';

// ===== 백엔드 API 주소 =====
const API_URL = 'http://localhost:3001';  // 백엔드 서버 주소

function App() {
  // ===== 상태(State) 정의 =====
  // posts: 게시글 목록을 저장 (초기값: 빈 배열)
  const [posts, setPosts] = useState([]);
  
  // formData: 입력 폼의 데이터를 저장
  const [formData, setFormData] = useState({
    title: '',     // 제목 입력값
    content: '',   // 내용 입력값
    author: ''     // 작성자 입력값
  });
  
  // isLoading: 데이터 로딩 중인지 표시
  const [isLoading, setIsLoading] = useState(false);

  // ===== 데이터 가져오기 (Read) =====
  // useEffect: 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    fetchPosts();
  }, []);

  // 백엔드에서 게시글 목록 가져오기
  const fetchPosts = async () => {
    try {
      setIsLoading(true);  // 로딩 시작
      // fetch: HTTP GET 요청 (데이터 조회)
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();  // JSON을 JavaScript 객체로 변환
      setPosts(data);  // 상태 업데이트 → 화면 다시 그리기
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    } finally {
      setIsLoading(false);  // 로딩 끝
    }
  };

  // ===== 게시글 생성 (Create) =====
  const handleSubmit = async (e) => {
    e.preventDefault();  // 폼 제출 기본 동작(페이지 새로고침) 방지
    
    try {
      // fetch: HTTP POST 요청 (데이터 생성)
      // 두 번째 인자: 요청 설정 (메서드, 헤더, 본문)
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',                          // POST 메서드
        headers: {
          'Content-Type': 'application/json',   // JSON 형식임을 명시
        },
        body: JSON.stringify(formData),          // 객체를 JSON 문자열로 변환
      });

      if (response.ok) {  // 응답이 성공적이었다면
        setFormData({ title: '', content: '', author: '' });  // 폼 초기화
        fetchPosts();  // 목록 다시 불러오기 (갱신)
      }
    } catch (error) {
      console.error('생성 실패:', error);
    }
  };

  // ===== 게시글 삭제 (Delete) =====
  const handleDelete = async (id) => {
    try {
      // fetch: HTTP DELETE 요청
      await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',  // DELETE 메서드
      });
      fetchPosts();  // 목록 다시 불러오기
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  // ===== 입력 변경 처리 =====
  const handleChange = (e) => {
    // e.target: 이벤트가 발생한 입력 요소
    // name: 입력 요소의 name 속성 (title, content, author 중 하나)
    // value: 입력된 값
    setFormData({
      ...formData,           // 기존 데이터 복사 (스프레드 연산자)
      [e.target.name]: e.target.value  // 해당 필드만 업데이트
    });
  };

  // ===== 화면 그리기 (JSX 반환) =====
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📝 간단한 게시판</h1>

      {/* ===== 게시글 작성 폼 ===== */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="title"              // state의 title과 연결
            placeholder="제목을 입력하세요"
            value={formData.title}    // 현재 값 표시
            onChange={handleChange}   // 값이 바뀌면 handleChange 호출
            required                  // 필수 입력
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="author"
            placeholder="작성자"
            value={formData.author}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          등록
        </button>
      </form>

      {/* ===== 게시글 목록 ===== */}
      {isLoading ? (
        <p>로딩 중...</p>
      ) : posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}  // React에서 리스트 렌더링 시必需なkey
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '5px'
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>작성자: {post.author}</small>
            <button
              onClick={() => handleDelete(post.id)}
              style={{
                float: 'right',
                padding: '5px 10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              삭제
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
