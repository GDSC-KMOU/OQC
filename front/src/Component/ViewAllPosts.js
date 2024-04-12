import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  console.log("zz: ", posts)
  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)} style={{ cursor: 'pointer' }}>
            <h2>제목: {post.garbageName}</h2>
            <p>작성자: {post.username}</p>
          </div>
        ))
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default App;
