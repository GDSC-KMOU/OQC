import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [allPosts, setAllPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const headers = {
                    'Content-Type': 'application/json',
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await axios.get('http://localhost:8080/', { headers });
                if (response.data.allPosts) {
                    setAllPosts(response.data.allPosts.content);
                }
                if (response.data.myPosts) {
                    if (typeof response.data.myPosts === 'string') {
                        setError(response.data.myPosts);
                    } else {
                        setMyPosts(response.data.myPosts.content);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [token]);


    return (
        <div>
            <h1>All Posts</h1>
            {loading ? (
                <p>Loading...</p>
            ) : allPosts.length > 0 ? (
                allPosts.map(post => (
                    <div key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)} style={{ cursor: 'pointer' }}>
                        <h3>폐기물명: {post.garbageName}</h3>
                        <p>신청인: {post.username}</p>
                        <p>날짜: {post.time}</p>
                        <p>상태: {post.isAccepted ? (post.isPaid ? '승인완료' : '결제완료') : '미결제'}</p>
                    </div>
                ))
            ) : <p>No posts found.</p>}

            <h2>My Posts</h2>
            {loading ? (
                <p>Loading...</p>
            ) : myPosts.length > 0 ? (
                myPosts.map(post => (
                    <div key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)} style={{ cursor: 'pointer' }}>
                        <h3>폐기물명: {post.garbageName}</h3>
                        <p>신청인: {post.username}</p>
                        <p>날짜: {post.time}</p>
                        <p>상태: {post.isAccepted ? (post.isPaid ? '승인완료' : '결제완료') : '미결제'}</p>
                    </div>
                ))
            ) : token ? <p>신청이 없습니다.</p> : <p>로그인해라</p>}
        </div>
    );
}

export default HomePage;
