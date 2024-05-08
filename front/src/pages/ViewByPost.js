import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function getUsernameFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));

    try {
        return JSON.parse(jsonPayload).username;
    } catch (e) {
        console.error("Payload parsing error:", e);
        return null;
    }
}

function ViewByPost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loggedInUsername = getUsernameFromToken();

    const fetchData = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://api.capserver.link/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPost(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleGoToCheckout = () => {
        navigate('/payment', { state: { post } });
    };

    if (loading) return <div>데이터를 불러오는 중입니다...</div>;
    if (error) return <div>에러가 발생했습니다: {error.message}</div>;
    if (!post) return null;

    const isAuthor = post.userId === loggedInUsername;
    const canPay = !post.paid && isAuthor;

    console.log("data: ", post)
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && <img src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />}
            <p>폐기물명: {post.garbageName}</p>
            <p>폐기물 사이즈: {post.garbageContent}</p>
            <p>가격: {post.price}원</p>
            <p>주소: {post.address}</p>
            <p>결제 여부: {post.paid ? (post.accepted ? '승인 완료' : '승인 대기중') : '미결제'}</p>
            <p>신청자: {post.userId}</p>
            <p>게시일: {post.time}</p>
            {canPay && <button onClick={handleGoToCheckout}>결제하기</button>}
        </div>
    );
}

export default ViewByPost;
