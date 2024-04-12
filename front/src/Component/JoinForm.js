import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        phoneNumber: '', // 폰번호 필드 추가
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/join', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert('회원가입 성공!');
                navigate('/');
            }
        } catch (error) {
            console.error('회원가입 오류', error);
            alert('회원가입 실패: ' + error.response.data.message); // 오류 메시지 개선
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">아이디</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="name">이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="phoneNumber">전화번호</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">회원가입</button>
        </form>
    );
}

export default SignUpForm;
