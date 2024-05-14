import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/Loading';
import {
    Container,
    MyPostsWrapper,
    StateWrapper,
    StyledTitle,
    State,
    PostsContainer,
    Item,
    PostTitle,
    StyledP,
    PostContentWrapper,
    StyledSpan,
    PostContent,
    PostImg
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
                                        <Item onClick={() => navigate(`/view-by-post/${post.id}`)}>
                                            <PostTitle status={post.paid ? (post.accepted ? 'accepted' : 'paid') : 'unpaid'}>
                                                <StyledP fonsSize="20px">{post.paid ? (post.accepted ? '승인완료' : '결제완료') : '미결제'}</StyledP>
                                                <StyledP>{formatPostTime(post.time)}</StyledP>
                                            </PostTitle>
                                            <PostContentWrapper>
                                                <PostContent>
                                                    <p>배출자명: <StyledSpan>{post.username}</StyledSpan></p>
                                                    <p>휴대폰 : <StyledSpan>01012345678</StyledSpan></p>
                                                    <p>폐기물명: <StyledSpan>{post.garbageName}</StyledSpan></p>
                                                    <p>결제금액: <StyledSpan>8,000원</StyledSpan></p>
                                                    <p>배출장소: <br /><StyledSpan>부산 영도구 태종로 727 한국해양대학교 공학1관</StyledSpan></p>
                                                    {/* 추가 필요
                                                    <p>결제금액: {post.paymentAmount}</p>
                                                    <p>배출장소: {post.address}</p>
                                                    */}
                                                </PostContent>
                                                <PostImg>
                                                    사진
                                                </PostImg>
                                            </PostContentWrapper>                            
                                        </Item>
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
