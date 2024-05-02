import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

                const response = await axios.get('http://localhost:8080/', { headers });
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
        return <p>로그인이 필요한 서비스입니다.</p>
    }
    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>데이터 불러오기 실패</p>
    }
    return (
        <div>
            <table>
                <tbody>
                {
                    myPosts.map(post => (
                        <tr key={post.id} onClick={() => navigate(`/view-by-post/${post.id}`)}>
                            <td>{post.state}</td>
                            <td>{post.title}</td>
                            <td>{post.user_id}</td>
                            <td>{post.date}</td>
                        </tr>
                    ))    
                }
                </tbody>
            </table>
        </div>
        
    );
};

export default GetMyStts;
