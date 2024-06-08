import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Loading';
import Card from '../components/MyPostsComponents/Card'
import styled from "styled-components";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const navigate = useNavigate();
    const formatPostTime = (time) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        // 형식화된 시간을 반환
        return `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    };

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
    
    return (
        <Container>
            <MyPostsWrapper>
            <StyledTitle $width="98%">MY 신청 현황</StyledTitle>
            { 
                !token ? (
                    <State>로그인이 필요한 서비스입니다.</State>
                ) : loading ? (
                    <State><LoadingSpinner /></State>
                ) : error ? (
                    <State>데이터 불러오기 실패</State>
                ) : (
                    <>
                        {posts.length > 0 ? (
                            <PostsContainer>
                            {posts.map(post => (
                                <Card key={post.id} post={post} formatPostTime={formatPostTime} navigate={navigate} />
                            ))}
                            </PostsContainer>  
                        ) : (
                            <State>신청된 폐기물이 없습니다.</State>
                        )} 
                    </>
                )
            }
            </MyPostsWrapper>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
`;
const MyPostsWrapper = styled.div`
    width: 80%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        width: 95%;
    }    
`;
const StyledTitle = styled.div`
    width: ${props => props.$width || "96%" };
    height: 50px;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    border-bottom: solid #4DA3D5 5px;
    color: #4DA3D5;
    font-size: 25px;
    font-weight: bold;
    @media (max-width: 768px) {
        font-size: 20px;
        border-bottom: solid #4DA3D5 2px;
        height: 36px;
    }    
`;
const State = styled.div`
    width: 100%;
    height: calc(100vh - 160px - 100px - 54.67px - 30px - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const PostsContainer = styled.div`
    display: grid;
    grid-gap: 20px 3%;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1440px) {
        grid-template-columns: 1fr 1fr;
        width: 98%;
    }
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
        width: 100%;
    }
    width: 98%;
    height: 100%;
    margin-bottom: 20px;
`;

export default MyPosts;
