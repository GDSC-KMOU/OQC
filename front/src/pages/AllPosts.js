import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/Loading';
import styled from "styled-components";
import Popup from "../components/AllPostsComponents/Popup";

function AllPostsContainer() {
    const { page } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(Number(page) ? Number(page) - 1 : 0);
    const [totalPages, setTotalPages] = useState(0);
    const [postId, setPostId] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [isAdmin, setIsAdmin] = useState(true);
    const pageSize = 15; // 한 페이지당 게시물 수

    useEffect(() => {
        fetchPosts(currentPage, pageSize, setPosts, setTotalPages);
    }, [currentPage]);

    useEffect(() => {
        if (page !== undefined) {
            setCurrentPage(Number(page) - 1);
        } else {
            setCurrentPage(0);
        }
    }, [page]);

    const handlePageChange = (newPage) => {
        if (0 <= newPage && newPage < totalPages) {
            navigate(`/allposts/${newPage + 1}`);
            window.scrollTo({ top: 0});
        }
    };

    useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setIsAdmin(payload.role === 'ROLE_ADMIN');
        }
        window.scrollTo({ top: 0});
    }, []);

    const handlePopup = (postId) => {
        setShowPopup(!showPopup);
        setPostId(postId);
    };

    // API 요청을 별도의 함수로 분리
    const fetchPosts = async (pageNumber, pageSize, setPosts, setTotalPages) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.capserver.link/posts?page=${pageNumber}&size=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderPageNumbers = () => { // 페이징 버튼 생성
        let totalPagesToShow = totalPages;
        if (totalPages >= 10) {
            totalPagesToShow = 9;
        }
        const pageRange = Math.floor(totalPagesToShow / 2);

        let startPage = currentPage - pageRange;
        let endPage = currentPage + pageRange;

        if (startPage < 0) {
            endPage -= startPage;
            startPage = 0;
        }
        if (endPage >= totalPages) {
            endPage = totalPages - 1;
            startPage = Math.max(0, totalPages - totalPagesToShow);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    const formatPostTime = (time) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`;
    };

    const formatAnonymous = (userid) => {
        if(userid.length > 2){
            const length = userid.length - 2;
            userid = userid.slice(0, 2);
            return `${userid}${'*'.repeat(length)}`;
        }else if(userid.length == 2){
            const length = userid.length - 1;
            userid = userid.slice(0, 1);
            return `${userid}${'*'.repeat(length)}`;
        }
        else{
            return `${userid}`;
        }
    };
    
    return (
        <AllPostsPresentation
            loading={loading}
            posts={posts}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            renderPageNumbers={renderPageNumbers}
            formatPostTime={formatPostTime}
            formatAnonymous={formatAnonymous}
            handlePopup={handlePopup}
            postId={postId}
            setPostId={setPostId}
            showPopup={showPopup}
            token={token}
            $isAdmin={isAdmin}
        />
    );
}

const AllPostsPresentation = ({ loading, posts, totalPages, handlePageChange, currentPage, renderPageNumbers, formatPostTime, formatAnonymous, handlePopup, postId, setPostId, showPopup, token, $isAdmin }) => {
    return (
        <Container>
            <AllPostsWrapper>
                <StyledTitle>전체 배출 신청 현황</StyledTitle>
                {!token ? (
                    <StyledMessage>
                        로그인이 필요한 서비스입니다.
                    </StyledMessage>
                ) : (
                    <PostListWrapper>
                        <PostListTop />
                        <PostListMain>
                            {loading ? (
                                <>
                                    <StyledMessage>
                                        <LoadingSpinner />
                                    </StyledMessage>
                                </>
                            ) : (
                                <>
                                    {posts && posts.length > 0 ? (
                                        posts.map(post => (
                                            <Post key={post.id} $isAdmin={$isAdmin} onClick={() => $isAdmin ? handlePopup(post.id) : undefined}>
                                                <StyledData $justifyContent="center" $paddingLeft="24px" $width="10%">
                                                    <Status
                                                        $bgColor={post.accepted ? "#33B5E5" : "#FFBB33"}
                                                    >
                                                        {post.accepted ? "승인완료" : "대기중"}
                                                    </Status>
                                                </StyledData>
                                                <StyledData $paddingLeft="10px">{post.garbageName}</StyledData>
                                                <StyledData $textAlign="right" $paddingRight="24px">
                                                    {$isAdmin ? post.username : formatAnonymous(post.username)} | {formatPostTime(post.time)}
                                                </StyledData>
                                            </Post>
                                        ))
                                    ) : (
                                        <StyledMessage>
                                            <p>신청된 폐기물이 없습니다.</p>
                                        </StyledMessage>
                                    )}
                                </>
                            )}
                        </PostListMain>
                    </PostListWrapper>
                )}
                {totalPages > 1 && (
                    <Paging>
                        <StyledBtn $width="35px" onClick={() => handlePageChange(0)} $borderTopLeft="5px" $borderBottomLeft="5px">{"<<"}</StyledBtn>
                        <StyledBtn $width="35px" onClick={() => handlePageChange(currentPage - 1)}>{"<"}</StyledBtn>
                        {renderPageNumbers().map(number => (
                            <StyledBtn key={number} onClick={() => handlePageChange(number)} $currentPage={currentPage === number}>
                                {number + 1}
                            </StyledBtn>
                        ))}
                        <StyledBtn $width="35px" onClick={() => handlePageChange(currentPage + 1)}>{">"}</StyledBtn>
                        <StyledBtn $width="35px" onClick={() => handlePageChange(totalPages - 1)} $borderTopRight="5px" $borderBottomRight="5px">{">>"}</StyledBtn>
                    </Paging>
                )}
            </AllPostsWrapper>
            {showPopup && <Popup postId={postId} setPostId={setPostId} handlePopup={handlePopup} />}
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
const AllPostsWrapper = styled.div`
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
    width: 98%;
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
        width: 100%;
    }
`;
const PostListWrapper = styled.div`
    width: 98%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const PostListTop = styled.div`
    background-color: #4DA3D5;
    height: 50px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;
const PostListMain = styled.div`
    height: 100%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;
const Post = styled.div`
    width: 100%;
    display: table;
    align-items: center;
    padding: 7px 0px;
    border-bottom: solid #C7D1D0 1px;
    &:hover{
        ${(props) => props.$isAdmin ? "cursor: pointer;" : null}
    }
`;
const Status = styled.div`
    width: 80px;
    height: 36px;
    background-color: ${(props) => props.$bgColor};
    margin-left: ${(props) => props.marginLeft};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    color: white;
    @media (max-width: 768px) {
        width: 54px;
        height: 28px;
        font-size: 10px;
}
`;
const StyledData = styled.div`
    width: ${(props) => props.$width};
    text-align: ${(props) => props.$textAlign};
    padding-left: ${(props) => props.$paddingLeft};
    padding-right: ${(props) => props.$paddingRight};
    display: table-cell;
    
    justify-content: ${(props) => props.$justifyContent};
    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const Paging = styled.div`
    padding : 25px 0 10px 0;
    border-radius: 5px;
    display: flex;
`;
const StyledBtn = styled.button`
    border: ${(props) => props.$currentPage ? 'solid #4DA3D5 1px' : 'solid #C7D1D0 1px'};    
    width: ${(props) => props.$width || '30px'}; 
    height: 30px;
    background-color: ${(props) => props.$currentPage ? '#4DA3D5' : 'white'};
    color: ${(props) => props.$currentPage ? 'white' : '#0279C2'};
    box-sizing: border-box;
    border-top-left-radius: ${(props) => props.$borderTopLeft};
    border-top-right-radius: ${(props) => props.$borderTopRight};
    border-bottom-left-radius: ${(props) => props.$borderBottomLeft};
    border-bottom-right-radius: ${(props) => props.$borderBottomRight};
    &:hover{
        cursor: pointer;
        color: ${(props) => props.$currentPage ? 'white' : '#0279C2'};
        background-color: ${(props) => props.$currentPage ? '#4DA3D5' : '#F6F6F6'};
    }
`;
const StyledMessage = styled.div`
    width: 100%;
    height: calc(100vh - 160px - 100px - 54.67px - 30px - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 250px;
`;

export default AllPostsContainer;