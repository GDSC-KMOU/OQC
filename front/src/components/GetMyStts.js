import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import XMark from '../assets/XMark.png';
import LoadingSpinner from "./Loading";

const StyledTable = styled.table`
    padding: 10px 0px 10px 0px;
    width: 95%;
    margin: auto;
    border-collapse: separate;
    border-spacing: 10px 10px;
`

const StyledTr = styled.tr`
    cursor: pointer;
    height: 59px;
    display: table;
`

const StyledTd = styled.td`
    width: ${(props) => props.width};
    text-align: ${(props) => props.textAlign};
    padding-left: ${(props) => props.paddingLeft};
`

const StyledP = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.bgColor};
    margin-left: ${(props) => props.marginLeft};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    color: white;
`

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const StyledImage = styled.img`
    margin-bottom: 15px; /* 아래쪽 여백 설정 */
`;

const StyledLoginMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
`

const GetMyStts = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

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
                if (response.data.myPosts) {
                    if (typeof response.data.myPosts === 'string') {
                        setError(response.data.myPosts);
                    } else {
                        setMyPosts(response.data.myPosts.content.reverse().slice(0,6));
                    }
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [token]);

    if(!token){
        return(
            <StyledContainer>
                <StyledLoginMessage>
                    <StyledImage src={XMark} alt="" />
                    <p>로그인이 필요한 서비스입니다.</p>
                </StyledLoginMessage> 
            </StyledContainer>
        )
    }
    if(loading){
        return <LoadingSpinner />
    }
    if(error){
        return <p>데이터 불러오기 실패</p>
    }
    return (
        <>
            <StyledTable>
                <tbody>
                    {myPosts.map(post => (
                        <StyledTr key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)}>
                            <StyledTd width="10%">
                                <StyledP
                                    width="80px"
                                    height="36px"
                                    marginY="80px" 
                                    bgColor={post.accepted ? "#33B5E5" : "#FFBB33"}
                                >
                                    {post.accepted ? "승인완료" : "대기중"}
                                </StyledP>
                            </StyledTd>
                            <StyledTd paddingLeft="10px">{post.garbageName}</StyledTd>
                            <StyledTd width="40%" textAlign="right">{post.username} | 2024.00.00{/* {post.date} <-- 추가필요 */}</StyledTd>
                        </StyledTr>
                    ))} 
                </tbody>
            </StyledTable>
        </>
    );
};

export default GetMyStts;
