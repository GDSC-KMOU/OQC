import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await axios.post('http://localhost:8080/login', formData);

            console.log('응답 헤더:', response.headers);
            const token = response.headers['authorization'] || response.headers['Authorization'];

            if (token) {
                localStorage.setItem('token', token);
                console.log('로그인 성공, 토큰:', token);
                navigate('/');
                window.location.reload();
            }
            
        } catch (error) {
            console.error('로그인 실패', error.response ? error.response.data : error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
