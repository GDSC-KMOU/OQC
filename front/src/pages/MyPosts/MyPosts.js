import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/Loading';
import Card from '../../components/MyPostsComponents/Card'
import {
    Container,
    MyPostsWrapper,
    StyledTitle,
    State,
    PostsContainer
} from './MyPosts.styles';

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
            { 
                !token ? (
                        <>
                            <StyledTitle>MY 신청 현황</StyledTitle>
                            <State>로그인이 필요한 서비스입니다.</State>
                        </>
                ) : loading ? (
                        <>
                            <StyledTitle>MY 신청 현황</StyledTitle>
                            <State><LoadingSpinner /></State>
                        </>
                ) : error ? (
                        <>
                            <StyledTitle>MY 신청 현황</StyledTitle>
                            <State>데이터 불러오기 실패</State>
                        </>
                ) : (
                        <>
                            <StyledTitle>MY 신청 현황</StyledTitle>
                            <PostsContainer>
                                {posts.length > 0 ? (
                                    posts.map(post => (
                                        <Card key={post.id} post={post} formatPostTime={formatPostTime} navigate={navigate} />      
                                    ))
                                ) : (
                                    <State>신청된 폐기물이 없습니다.</State>
                                )}
                            </PostsContainer>
                        </>
                )
            }
            </MyPostsWrapper>
        </Container>
    );
}

export default MyPosts;
