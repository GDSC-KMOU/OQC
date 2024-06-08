import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import LoadingSpinner from "../Loading";

const GetAllStts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const [isAdmin, setIsAdmin] = useState(false);

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

                const response = await axios.get('https://api.capserver.link/', { headers });
                if (response.data.allPosts) {
                    setAllPosts(response.data.allPosts.content.slice(0,6));
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('Failed to load data.');
                return(<p>데이터를 불러오지 못하였습니다.</p>)
            } finally {
                setLoading(false);
            }
    };
        fetchPosts();
    }, [token]);
    useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setIsAdmin(payload.role === 'ROLE_ADMIN');
        }
    }, []);
    const formatPostTime = (time) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
    
        // 형식화된 시간을 반환
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

    if(loading){
        return <LoadingSpinner />
    }
    if(error){
        return (
            <StyledContainer>
                <StyledLoginMessage>
                    <p>데이터 불러오기 실패</p>
                </StyledLoginMessage> 
            </StyledContainer>
        )
    }
    if(allPosts.length === 0){
        return(
            <StyledContainer>
                <StyledLoginMessage>
                    <p>신청된 폐기물이 없습니다.</p>
                </StyledLoginMessage> 
            </StyledContainer>
        )
    }
    return (
        <>
            <StyledTable>
                <tbody>
                    {allPosts.map(post => (
                        <StyledTr key={post.id} onClick={() => isAdmin ? navigate(`/view-by-post/${post.id}`) : null} $isAdmin={isAdmin}>
                            <StyledTd width="10%">
                                <StyledP
                                    width="80px"
                                    height="36px"
                                    $bgColor={post.accepted ? "#33B5E5" : "#FFBB33"}
                                >
                                    {post.accepted ? "승인완료" : "대기중"}
                                </StyledP>
                            </StyledTd>
                            <StyledTd $paddingLeft="10px">{post.garbageName}</StyledTd>
                            <StyledTd $textAlign="right" color="#666666">{isAdmin ? post.username : formatAnonymous(post.username)} | {formatPostTime(post.time)}</StyledTd>
                        </StyledTr>
                    ))} 
                </tbody>
            </StyledTable>
        </>
        
    );
};

const StyledTable = styled.table`
    padding: 10px 0px 10px 0px;
    width: 95%;
    margin: auto;
    border-collapse: separate;
    border-spacing: 10px 10px;
    @media (max-width: 768px) {
         width: 100%;
         padding: 0;
         
    }
`

const StyledTr = styled.tr`
    cursor: ${(props) => props.$isAdmin ? 'pointer' : ''};
    height: 59px;
    display: table;
    width: 100%;
    @media (max-width: 768px) {
        height: 28px;
        width: 100%;
   }
`

const StyledTd = styled.td`
    width: ${(props) => props.width};
    text-align: ${(props) => props.$textAlign};
    padding-left: ${(props) => props.$paddingLeft};
    color: ${(props) => props.color || ""};
    @media (max-width: 768px) {
        font-size: 12px;
        padding-left: 0;
   }
`

const StyledP = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
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
const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
const StyledLoginMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
`;

export default GetAllStts;
