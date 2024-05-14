import React from 'react';
import { Card, PostTitle, PostContentWrapper, PostContent, PostImg, StyledP, StyledSpan } from './Card.styles'; // 스타일 및 컴포넌트 임포트 

const PostCard = ({ post, formatPostTime, navigate }) => {
    return (
        <Card key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)}>
            <PostTitle $status={post.paid ? (post.accepted ? 'accepted' : 'paid') : 'unpaid'}>
                <StyledP $fonsSize="20px">{post.paid ? (post.accepted ? '승인완료' : '결제완료') : '미결제'}</StyledP>
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
        </Card>
    );
};

export default PostCard;
