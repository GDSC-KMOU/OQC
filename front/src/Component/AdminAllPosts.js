import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminPosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/admin', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPosts(response.data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response && error.response.status === 403) {
                    alert('접근 권한이 없습니다.');
                    navigate('/');
                }
            }
        };

        fetchPosts();
    }, [navigate]); 

    const handleApprove = async (postId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`http://localhost:8080/admin/${postId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('승인이 완료되었습니다.');
            setPosts(prevPosts => prevPosts.map(post =>
                post.id === postId ? { ...post, accepted: true } : post
            )); 
        } catch (error) {
            alert('승인 처리 중 오류가 발생했습니다.');
        }
    };

    console.log("data: ", posts)

    return (
        <div>
            <h1>Admin Post List</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            주소: {post.address} / 
                            날짜: {post.time} / 
                            신청자: {post.name} - {post.paid ? (post.accepted ? '승인 완료' : (
                                <button onClick={() => handleApprove(post.id)}>승인하기</button>
                            )) : '미결제'}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>게시글이 없습니다.</p>
            )}
        </div>
    );
}

export default AdminPosts;
