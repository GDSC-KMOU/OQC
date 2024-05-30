import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    
    if(post.userId !== loggedInUsername)
        return navigate('/');
    return (
        <VBPContainer>
            <VBPCotents>
                <ContentTop />
                <ContentBottom>
                    <ContentImg src={`data:image/jpeg;base64,${post.image}`} alt={post.title}/>
                    <ContentText>폐기물명</ContentText>
                    <InputWrapper>
                        <ContentInput value={post.garbageName} readOnly></ContentInput>
                    </InputWrapper>

                    <ContentText>폐기물 사이즈</ContentText>
                    <InputWrapper>
                        <ContentInput value={post.garbageContent} readOnly></ContentInput>
                    </InputWrapper>

                    <ContentText>가격</ContentText>
                    <InputWrapper>
                        <ContentInput value={`${post.price}원`} readOnly></ContentInput>
                    </InputWrapper>

                    <ContentText>주소</ContentText>
                    <InputWrapper>
                        <ContentInput value={post.address} readOnly></ContentInput>
                    </InputWrapper>

                    <ContentText>신청자</ContentText>
                    <InputWrapper>
                        <ContentInput value={post.userName} readOnly></ContentInput>
                    </InputWrapper>

                    <ContentText>신청일</ContentText>
                    <InputWrapper>
                        <ContentInput value={post.time} readOnly></ContentInput>
                    </InputWrapper>
                    
                    {canPay ? 
                    <ContentBtn onClick={handleGoToCheckout} color="#4DA3D5" alt="canpay">결제하기</ContentBtn> 
                    : <ContentBtn color="#666666">결제완료</ContentBtn>
                    }
                </ContentBottom>
            </VBPCotents>
        </VBPContainer>
    );
}

const VBPContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 23px 0 26px 0;
`;
const VBPCotents = styled.div`
    width: 40%;
    height: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px) {
        width: 95%;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 60%;
    }
`;
const ContentTop = styled.div`
    width: 100%;
    height: 50px;
    background-color: #4DA3D5;
    display: flex;
    justify-content: center;
    border-radius: 5px 5px 0 0;
    @media (max-width: 768px) {
        height: 36px;
    }
`;
const ContentBottom = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.25);
    padding: 36px 0 51px 0;
    gap: 16px;
    @media (max-width: 768px) {
        padding: 24px 0;
    }
`;

const ContentImg = styled.img`
    width: 80%;
    height: 400px;
    margin-bottom: 12px;
    @media (max-width: 768px) {
        height: 360px;
    }
`

const ContentText = styled.p`
    width: 90%;
    font-size:20px;
    font-weight: bold;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const InputWrapper = styled.div `
    width: 90%;
`;

const ContentInput = styled.input`
    width: calc(100% - 24px);
    padding: 12px;
    border: none;
    background-color: #F6F6F6;
    color: #666666;
    border-radius: 5px;
    font-size: 16px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const ContentBtn = styled.button`
    width: 90%;
    height: 48px;
    margin-top: 24px;
    border: none;
    cursor: ${(props) => props.alt === "canpay" ? "pointer" : ""};
    font-size: 20px;
    font-weight: bold;
    background-color: ${(props) => props.color};
    color: #fff;
    border-radius: 5px;
    @media (max-width: 768px) {
        font-size: 16px;
        height: 36px;
    }
`

export default ViewByPost;
