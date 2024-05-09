import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Loading';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                setToken(localStorage.getItem('token'));
                const response = await axios.get('https://api.capserver.link/user', {
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
    }, [token]);
    
    if(!token){
        return <p>로그인이 필요한 서비스입니다.</p>
    }
    if (loading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <p>데이터 불러오기 실패</p>;
    }

    return (
        <div>
            <h1>My 신청 현황</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)}>
                            <div>
                                <p>상태: {post.paid ? (post.accepted ? '승인완료' : '결제완료') : '미결제'}</p>
                                <p>날짜: {post.time}</p>
                            </div>
                            <div>
                                <p>폐기물명: {post.garbageName}</p>
                                <p>배출자명: {post.username}</p>
                                {/* 추가 필요
                                <p>결제금액: {post.paymentAmount}</p>
                                <p>배출장소: {post.address}</p>
                                */}
                            </div>                            
                        </li>
                    ))}
                </ul>
            ) : (
                <p>신청안했음</p>
            )}
        </div>
    );
}

export default MyPosts;
