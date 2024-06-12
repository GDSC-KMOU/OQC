import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username){
            alert("아이디를 입력해주세요.")
        }else if (!password){
            alert("비밀번호를 입력해주세요.")
        }else{
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        
        try {
            const response = await axios.post('https://api.capserver.link/login', formData);
            const token = response.headers['authorization'] || response.headers['Authorization'];

            if (token) {
                localStorage.setItem('token', token);
                navigate('/');
                window.location.reload();
            }
            
        } catch (error) {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.")
        }
    }
    };

    return (
        <FormWrapper>
            <StyledForm onSubmit={handleLogin}>
                <StyledDivTop />
                <StyledDivBottom>
                    <StyledLabel>
                        <StyledInput type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='아이디를 입력해주세요'/>
                    </StyledLabel>
                    <StyledLabel>
                        <StyledInput type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='비밀번호를 입력해주세요' autoComplete="off"/>
                    </StyledLabel>
                    <ButtonWrapper>
                        <StyledBtn type='submit'>로그인</StyledBtn>
                        
                        <StyledLink to = {'/signup'}>회원가입</StyledLink>
                        
                    </ButtonWrapper>
                </StyledDivBottom>
            </StyledForm>
        </FormWrapper>
        
    );
};

const FormWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 160px - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        align-items: normal;
        margin-top: 24px;
    }
`
const StyledForm = styled.form`
    width: 40%;
    height: 313px;
    display:flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.25);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    @media (max-width: 768px) {
        width: 95%;
        height:246px;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 60%;
    }
`
const StyledDivTop = styled.div`
    width: 100%;
    height: 50px;
    background-color: #4DA3D5;
    display: flex;
    justify-content: center;
    border-radius: 5px 5px 0 0;
    @media (max-width: 768px) {
        height: 36px;
    }
`
const StyledDivBottom = styled.div`
    width: 100%;
    height: 263px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 5px 5px;
    box-sizing: border-box;
    @media (max-width: 768px) {
        height: 210px;
        padding-top: 12px;
    }
    
`

const StyledLabel = styled.label`
    margin: 12px 0 12px 0;
    width: calc(100% - 34px); 
    display:flex;
    flex-direction: column;
    align-items: center;
`
const StyledInput = styled.input`
    width: calc(90% - 34px); 
    height: 17px;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 17px 13px 17px;
    border: none;
    background-color: #F6F6F6;
    color: #666666;
    border-radius: 5px;
    @media (max-width: 768px) {
        font-size: 10px;
        padding: 10px 17px;
    }
`
const ButtonWrapper = styled.div`
    width: calc(90% - 34px); 
    height: 48px;
    display: flex;
    justify-content: space-between;
    margin: 12px 0 12px 0;
    @media (max-width: 768px) {
        gap: 12px;
    }
`
const StyledBtn = styled.button`
    width: 49%;
    height: 48px;
    border: none;
    border-radius: 5px;
    background-color: #4DA3D5;
    color: white;
    font-size: 16px;
    font-weight: bold;
    &:hover {
        background-color: #2e8bc1;
        transition: 0.3s;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        font-size: 12px;
        height: 36px;
    }
`
const StyledLink = styled(Link)`
    text-decoration-line: none;
    width: 49%;
    height: 48px;
    border: none;
    border-radius: 5px;
    background-color: #4DA3D5;
    color: white;
    font-size: 16px;
    font-weight: bold;
    &:hover {
        background-color: #2e8bc1;
        transition: 0.3s;
        cursor: pointer;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        font-size: 12px;
        height: 36px;
    }
`


export default Login;