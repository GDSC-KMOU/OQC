import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// API 요청을 별도의 함수로 분리
const fetchPosts = async (pageNumber, pageSize, setPosts, setErrorLoading, setTotalPages) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8080/posts?page=${pageNumber}&size=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setPosts(response.data.content);  // 페이지 데이터
    setTotalPages(response.data.totalPages); // 총 페이지 수
    setErrorLoading(false); // 데이터 로딩 완료
  } catch (error) {
    console.error('Error fetching data:', error);
    setErrorLoading(false); // 에러 발생 시에도 로딩 상태 갱신
  }
};

function App() {
  const [posts, setPosts] = useState([]);
  const [errorLoading, setErrorLoading] = useState(true); // 로딩 상태 관리
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const pageSize = 10; // 한 페이지당 게시물 수

  useEffect(() => {
    fetchPosts(currentPage, pageSize, setPosts, setErrorLoading, setTotalPages);
  }, [currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {!errorLoading ? (
        posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)} style={{ cursor: 'pointer' }}>
              <h2>폐기물: {post.garbageName}</h2>
              <p>작성자: {post.username}</p>
              <p>신청일: {post.time}</p>
              <p>상태: {post.paid ? (post.accepted ? '승인완료' : '승인대기중') : '미결제'}</p>
            </div>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
      {totalPages > 1 && (
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
