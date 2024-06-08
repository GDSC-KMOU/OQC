import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Postcode from '../components/Postcode';
import styled from 'styled-components';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        phoneNumber: '', // 폰번호 필드 추가
    });
    const [confirmPassword,setConfirmPassword] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'confirmPassword'){
            setConfirmPassword(value)
        }
        else{
            setFormData({
                ...formData,
                [name]: value,
            })
        };
    };

    const passwordsMatch = () => {
        return formData.password === confirmPassword;
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmPassword && !passwordsMatch()) {
            alert('비밀번호가 일치하지 않습니다.');
            return; // 일치하지 않을 경우 함수를 여기서 종료합니다.
        }
        try {
            const response = await axios.post('https://api.capserver.link/join', formData, {
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
        <FormWrapper>
            <StyledForm onSubmit={handleSubmit}>
                <StyledDivTop />
                <StyledDivBottom>
                    <LabelWrapper $marginBottom="24px">
                        <StyledLabel htmlFor='name'> 
                            <StyledInput 
                                type="text" 
                                id='name' 
                                name='name' 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder='이름을 입력해주세요'
                                required
                            />
                        </StyledLabel>
                    </LabelWrapper>
                    <LabelWrapper $marginBottom="24px">
                        <StyledLabel htmlFor='username'>
                            <StyledInput 
                                type="text" 
                                id='username' 
                                name='username' 
                                value={formData.username} 
                                onChange={handleChange} 
                                placeholder='아이디를 입력해주세요'
                                required
                            />
                            <StyledBtn type="button" $marginLeft="5%" alt="check">중복확인</StyledBtn>
                        </StyledLabel>
                    </LabelWrapper>
                    <LabelWrapper $marginBottom="24px">
                        <StyledLabel htmlFor='password'>
                            <StyledInput 
                                type="password" 
                                id='password' 
                                name='password' 
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder='비밀번호를 입력해주세요'
                                required
                                autoComplete="off"
                            />
                        </StyledLabel>
                    </LabelWrapper>
                    <LabelWrapper $marginBottom="36px">
                        <StyledLabel $display="inline">
                            <StyledInput 
                                $width="calc(100% - 34px)"
                                type="password" 
                                placeholder='비밀번호를 다시 한 번 입력해주세요'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                            {confirmPassword && !passwordsMatch() && (
                                <StyledP $paddingTop="8px" $color="#FF0000">비밀번호가 일치하지 않습니다.</StyledP>
                            )}
                            {confirmPassword && passwordsMatch() && (
                                <StyledP $paddingTop="8px" $color="#4DA3D5">비밀번호가 일치합니다.</StyledP>
                            )}
                        </StyledLabel>
                    </LabelWrapper>
                    <LabelWrapper $marginBottom="53px" $hegiht="96px">
                        <StyledLabel htmlFor='phoneNumber' $display="inline">
                            <StyledP>휴대폰</StyledP>
                            <StyledInput
                                $width="calc(100% - 34px)"
                                type="text"     
                                id='phoneNumber' 
                                name='phoneNumber' 
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                                required
                            />
                        </StyledLabel>
                    </LabelWrapper>
                    <LabelWrapper $justifyContent="space-between" $marginTop="24px">
                        <StyledBtn type='submit' $width="49%">완료</StyledBtn>
                        <StyledLink to="/"><StyledBtn type='button' color='gray'>취소</StyledBtn></StyledLink>
                    </LabelWrapper>
                </StyledDivBottom>
            </StyledForm>
        </FormWrapper>
    );
};

const FormWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 23px 0 26px 0;
`;
const StyledForm = styled.form`
    width: 40%;
    height: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 768px) {
        width: 95%;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 60%;
    }
`;
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
`;
const StyledDivBottom = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.25);
    padding: 36px 0 51px 0;
    @media (max-width: 768px) {
        padding: 24px 0 0 0;
    }
`;
const LabelWrapper = styled.div`
    width: 86%;
    height: ${(props) => props.$hegiht || "48px"};
    display:flex;
    justify-content: ${(props) => props.$justifyContent || "center"};
    margin-bottom: ${(props) => props.$marginBottom};
    @media (max-width: 768px) {
        gap: 12px;
        margin-bottom: 12px;
        margin-top: ${(props) => props.$marginTop};
    }
`;
const StyledLabel = styled.label`
    width: 100%; 
    height: 48px;
    display: ${(props) => props.$display || 'flex'};
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        margin-bottom: 12px;
    }
`;
const StyledInput = styled.input`
    width: ${(props) => props.$width || '100%'};
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
`;
const StyledBtn = styled.button`
    width: ${(props) => props.$width || '100%'};
    height: 48px;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 17px 13px 17px;
    border: none;
    background-color:  ${(props) => props.color === "gray" ? "#666666" : "#4DA3D5"};
    color: white;
    border-radius: 5px;
    margin-left: ${(props) => props.$marginLeft};;
    &:hover {
        background-color: ${(props) => props.color === "gray" ? "#4d4d4d" : "#2e8bc1"};
        transition: 0.3s;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        height: ${(props) => props.alt === "check"? "36px" : "32px"};
        font-size: 12px;
        padding: 0;
    }
`;
const StyledP = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.$color || '#666666'};;
    margin-bottom: 24px;
    padding-top: ${(props) => props.$paddingTop};
    @media (max-width: 768px) {
        margin-top: 24px;
        margin-bottom: 12px;
    }
    
`;
const StyledLink = styled(Link)`
text-decoration-line: none;
    width: 49%;
    height: 48px;
    border: none;
    border-radius: 5px;
    background-color: #666666;
    color: white;
    font-size: 16px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: #4d4d4d;
        transition: 0.3s;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        height: 32px;
        font-size: 12px;
        padding: 0;
    }
`
export default Signup;