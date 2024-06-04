import React from 'react';
import styled from 'styled-components';

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
                    <p>휴대폰 : <StyledSpan>{post.phoneNumber}</StyledSpan></p>
                    <p>폐기물명: <StyledSpan>{post.garbageName}</StyledSpan></p>
                    <p>결제금액: <StyledSpan>{post.price}원</StyledSpan></p>
                    <p>배출장소: <br /><StyledSpan>{post.address}</StyledSpan></p>
                </PostContent>
                <PostImgWrapper>
                    <PostImg src={`data:image/jpeg;base64,${post.image}`} alt={post.title}/>
                </PostImgWrapper>
            </PostContentWrapper>                            
        </Card>
    );
};

const Card = styled.div`
    width: 100%;
    height: 338px;
    &:hover {
        cursor: pointer;
    }
`;
const PostImg = styled.img`
    width: 100%;
    height: 100%;
`
const PostTitle = styled.div`
    background-color: ${props => {
        if (props.$status === 'paid') {
            return '#99B88C'; // 결제완료
        } else if (props.$status === 'accepted') {
            return '#33B5E5'; // 승인완료
        } else {
            return '#FFBB33'; // 미결제
        }
    }};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 15px;
    height: 50px;
    color: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;
const StyledP = styled.p`
    font-size: ${(props) => props.$fonsSize};
    font-weight: bold;
`;
const PostContentWrapper = styled.div`
    border: solid rgb(207, 207, 207) 1px;
    box-sizing: border-box;
    border-radius: 0 0 5px 5px;
    height: 288px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const PostContent = styled.div`
    width: 45%;
    height: 240px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
const StyledSpan = styled.span`
    color: #666666;
`;
const PostImgWrapper = styled.div`
    width: 40%;
    height: 240px;
    background-color: #ccc;
`;

export default PostCard;
