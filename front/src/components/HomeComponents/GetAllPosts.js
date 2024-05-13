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
                    setAllPosts(response.data.allPosts.content.reverse().slice(0,6));
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
                    {allPosts.map(post => (
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

export default GetAllStts;
