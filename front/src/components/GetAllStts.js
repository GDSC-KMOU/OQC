import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                //ddddddddddd
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
                        allPosts.map(post => (
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

export default GetAllStts;
