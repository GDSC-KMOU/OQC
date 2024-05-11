import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await axios.post('https://api.capserver.link/login', formData);

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
        <div>
            <form onSubmit={handleLogin}>
                <label>
                    아이디 : 
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='아이디를 입력해주세요'/>
                </label>
                <label>
                    비밀번호 :
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='비밀번호를 입력해주세요'/>
                </label>
                <button type='submit'>로그인</button>
                <Link to = {'/signup'}>
                    <button>회원가입</button>
                </Link>
            </form>
        </div>
        
    );
};

export default Login;