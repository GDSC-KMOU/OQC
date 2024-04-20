import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setPosts(response.data.content); 
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch user posts:', error);
                setError('Failed to load posts');
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>내 신청 현황</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)}>
                            <h3>폐기물명: {post.garbageName}</h3>
                            <p>신청인: {post.username}</p>
                            <p>날짜: {post.time}</p>
                            <p>상태: {post.paid ? (post.accepted ? '승인완료' : '결제완료') : '미결제'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>신청안했음</p>
            )}
        </div>
    );
}

export default UserPostsPage;
