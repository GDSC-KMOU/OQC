import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Postcode from '../components/Postcode';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '', // 폰번호 필드 추가
        address: '', // 주소 필드 추가
        detailAddress: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddressChange = (address, detailAddress) => {
        setFormData({
            ...formData,
            address: address,
            detailAddress: detailAddress,
        });
    };

    const passwordsMatch = () => {
        return formData.password === formData.confirmPassword;
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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'> 
                        <input 
                            type="text" 
                            id='name' 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder='이름을 입력해주세요'
                            required
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='username'>
                        <input 
                            type="text" 
                            id='username' 
                            name='username' 
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder='아이디를 입력해주세요'
                            required
                        />
                        <button type='button'>중복확인</button>
                    </label>
                </div>
                <div>
                    <label htmlFor='password'>
                        <input 
                            type="password" 
                            id='password' 
                            name='password' 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder='비밀번호를 입력해주세요'
                            required
                        />
                    </label>
                    <label>
                        <input 
                            type="password" 
                            placeholder='비밀번호를 다시 한 번 입력해주세요'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {formData.confirmPassword && !passwordsMatch() && (
                        <p>비밀번호가 일치하지 않습니다.</p>
                    )}
                    {formData.confirmPassword && passwordsMatch() && (
                        <p>비밀번호가 일치합니다.</p>
                    )}
                </div>
                <Postcode onAddressChange={handleAddressChange} />
                <div>
                    <label htmlFor='phoneNumber'>
                        휴대폰
                        <input 
                            type="text"     
                            id='phoneNumber' 
                            name='phoneNumber' 
                            value={formData.phoneNumber} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>
                </div>
                <button type='submit'>완료</button>
                <button type='button'>취소</button>
            </form>
            
        </div>
    );
};

export default Signup;