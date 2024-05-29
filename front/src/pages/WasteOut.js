import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import LoadingSpinner from '../components/Loading';
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import Find from "../assets/find.svg"

function ImageUploadComponent() {
    const [image, setImage] = useState(null);
    const [options, setOptions] = useState([]);
    const [resValue, setResValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [error, setError] = useState('');
    const [recognitionLoading, setRecognitionLoading] = useState(false);
    const [postingLoading, setPostingLoading] = useState(false);
    const [name, setName] = useState('');        
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const formData = new FormData();
    // Form 데이터에 이름 추가
    formData.append('name', name);
    // Form 데이터에 번호 추가
    formData.append('phoneNumber', phoneNumber);
    const handleImageUpload = async () => {
        //ai 서버에 전송할 img 추가
        formData.append('image', image);
        setRecognitionLoading(true);
        try {
            const response = await axios.post('https://api.capserver.link/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (Object.keys(response.data).length === 0) {
                setRecognitionLoading(false);
                setImage(null);
                setResValue('');
                alert('취급하지 않는 폐기물입니다');
                return;
            }
            const firstKey = Object.keys(response.data)[0];
            if (response.data[firstKey]) {
                setResValue(firstKey);
                const parsedOptions = response.data[firstKey].map(item => {
                    const description = Object.keys(item)[0];
                    const price = item[description];
                    return { description, price };
                });
                setOptions(parsedOptions);
            }
            setRecognitionLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('이미지 잘못 올라감');
            setRecognitionLoading(false);
        }
    };

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        if(!image){
            alert('이미지를 업로드 하세요.');
            return;
        }
        if(!selectedOption){
            alert('규격을 선택해주세요.');
            return;
        }
        // Form 데이터에 image, price, resValue, Adress, detailAddress 추가
        formData.append('image', image);
        formData.append('selectedOption', JSON.parse(selectedOption).price);
        formData.append('resValue', resValue);
        formData.append('address', `${address} ${detailAddress}`);
        
        if (!token) {
            alert('로그인이 필요한 서비스입니다.');
            return;
        }
        try {
            setPostingLoading(true);
            const data = await axios.post('https://api.capserver.link/selection', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setPostingLoading(false);
            alert('신청 완료! 결제 부탁드립니다!');
            navigate(`/view-by-post/${data.data.id}`);
        } catch (error) {
            setPostingLoading(false);
            setError('Failed to upload posts');
            alert(`포스팅 에러: ${error.response ? error.response.data.message : '에러'}`);
        }
    };

    useEffect(() => {
        if (image) {
            handleImageUpload();
        }
    }, [image]);
    const handleChange = (e) => {
        const { name, value } = e.target;        
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'detailAddress':
                setDetailAddress(value);
                break;
            default:
                break;
        }      
        
    };

    // DaumPostCode관련 코드
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "50%",
            height: "480px",
            padding: "0",
            overflow: "hidden",
        },
    };
    const completeHandler = (data) => {
        const { address } = data;
        setAddress(address);
        setIsOpen(false);
      };

    const toggle = () =>{
        setIsOpen(!isOpen);
    }

    return (
        <>
            {recognitionLoading && (
                <FullScreenLoading>
                    <LoadingSpinner height="0" />
                    <StyledP>객체 인식중...</StyledP>
                </FullScreenLoading>
            )}
            {postingLoading && (
                <FullScreenLoading>
                    <LoadingSpinner height="0" />
                    <StyledP>폐기물 배출중...</StyledP>
                </FullScreenLoading>
            )}
            <Container>
                
                    {!token ? (
                        <>
                            <WasteOutWrapper $height="calc(100vh - 160px - 100px - 30px)" $marginBottom="0" $justifyContent="center" $flexDirection="column">
                                <StyledTitle $width="98%">폐기물 배출하기</StyledTitle>
                                <State>로그인이 필요한 서비스입니다.</State>
                            </WasteOutWrapper>
                        </>
                    ) : error ? (
                        <>  
                            <WasteOutWrapper $height="calc(100vh - 160px - 100px - 30px)" $marginBottom="0" $justifyContent="center" $flexDirection="column">
                                <StyledTitle $width="98%">폐기물 배출하기</StyledTitle>
                                <State>데이터 불러오기 실패</State>
                            </WasteOutWrapper>
                        </>
                    ) : (
                        <>  
                        <WasteOutWrapper>
                            <ContentsWrapper>
                                <StyledTitle>폐기물 정보</StyledTitle>
                                <StyledContent>
                                    {image ? (
                                        <ImgLabel htmlFor="file">
                                            <ImgWrapper width="auto" $backColor="none" border="none">
                                                <StyledImg src={URL.createObjectURL(image)} alt="Selected Image" />
                                            </ImgWrapper>
                                        </ImgLabel>
                                    ):(
                                        <ImgLabel htmlFor="file">
                                            <ImgWrapper />
                                        </ImgLabel>
                                    )}
                                    <StyledLabel htmlFor="file">
                                        이미지 업로드
                                        <StyledInputFile type="file" id='file' onChange={e => setImage(e.target.files[0])} />
                                    </StyledLabel>
                                    <TitleRenderWrapper>
                                        <StyledTitleRender>폐기물명</StyledTitleRender>
                                    </TitleRenderWrapper>
                                    <StyledValueRender>{resValue}</StyledValueRender>
                                    <TitleRenderWrapper>
                                        <StyledTitleRender>규격</StyledTitleRender>
                                    </TitleRenderWrapper>
                                    <StyledSelectWrapper $marginBottom="0px">
                                        <StyledSelect onChange={handleOptionSelect} value={selectedOption}>
                                            <option value="">선택해주세요</option>
                                            {options.map((option, index) => (
                                                <option key={index} value={JSON.stringify(option)}>{`${option.description}: ${option.price}원`}</option>
                                            ))}
                                        </StyledSelect>
                                    </StyledSelectWrapper>
                                </StyledContent>
                            </ContentsWrapper>
                            <ContentsWrapper>
                                <StyledForm onSubmit={handleSubmitPost}>
                                    <StyledTitle>배출자 정보</StyledTitle>
                                    <StyledContent $marginBottom="100px">
                                        <TitleRenderWrapper>
                                            <StyledTitleRender>이름</StyledTitleRender>
                                        </TitleRenderWrapper>
                                        <StyledInput type="text" name="name" value={name} onChange={handleChange} required/>
                                        <TitleRenderWrapper>
                                            <StyledTitleRender>휴대폰</StyledTitleRender>
                                        </TitleRenderWrapper>
                                        <StyledInput type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange} required/>
                                        <TitleRenderWrapper display="flex">
                                            <StyledTitleRender>주소</StyledTitleRender>
                                            <AddressFindButton onClick={toggle}><img src={Find} alt='find' width="16px" height="16px"></img></AddressFindButton>
                                        </TitleRenderWrapper>
                                        <StyledInput type="text" name="address" value={address} onChange={handleChange} required/>
                                        <TitleRenderWrapper>
                                            <StyledTitleRender>상세 주소</StyledTitleRender>
                                        </TitleRenderWrapper>
                                        <StyledInput type="text" name="detailAddress" value={detailAddress} onChange={handleChange} required/>
                                    </StyledContent>
                                    <BtnWrapper>
                                        <StyledBtn type='submit' position="absolute" bottom="0" width="90%" height="48px" fontSize="18px">
                                            폐기물 배출하기
                                        </StyledBtn>
                                    </BtnWrapper>                              
                                </StyledForm>
                            </ContentsWrapper>
                            </WasteOutWrapper>
                        </>
                    )}
                    <ModalContainer />
                    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                        <ModalXButton onClick={toggle}>x</ModalXButton>
                        <DaumPostcode onComplete={completeHandler} height="100%" />
                    </Modal>
            </Container>
        </>
    );
}

const FullScreenLoading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
const StyledP = styled.p`
    margin-top: 50px;
    font-size: 18px;
    color: #ffffff;
`;
const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
`;
const WasteOutWrapper = styled.div`
    width: 80%;
    height: 70%;
    display: flex;
    flex-direction: ${props => props.$flexDirection};
    justify-content: ${props => props.$justifyContent || "space-between"};
    align-items: center;
    margin-bottom:  ${props => props.$marginBottom || "57px"};
    @media (max-width: 768px) {
        width: 95%;
        flex-direction : column;
        gap: 24px;
    }
`;
const ContentsWrapper = styled.div`
    width: 48%;
    height: ${props => props.$height || "700px"};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`;
const StyledTitle = styled.div`
    width: ${props => props.$width || "96%" };
    height: 50px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    border-bottom: solid #4DA3D5 5px;
    color: #4DA3D5;
    font-size: 25px;
    font-weight: bold;
    justify-content: space-between;
    @media (max-width: 768px) {
       font-size: 20px;
       border-bottom: solid #4DA3D5 2px;
       height: 36px;
    }
`;
const BtnWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        margin-top: 36px;
    }
`
const StyledBtn = styled.button`
    width: ${props => props.width || "120px"};
    height: ${props => props.height || "36px"};
    border-radius: 5px;
    border: none;
    font-size: ${props => props.fontSize || "14px"};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4DA3D5;
    margin-top: ${props => props.$marginTop};
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
       height: 32px;
       font-size: 16px;
    }
`;
const State = styled.div`
    width: 100%;
    height: calc(100vh - 160px - 100px - 54.67px - 30px - 28px);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.$marginBottom};
    @media (max-width: 768px) {
        margin-bottom: 0;
`;
const ImgWrapper = styled.div`
    width: ${props => props.width || "280px"};
    height: ${props => props.$height || "320px"};
    background-color: ${props => props.$backColor || "#F6F6F6"};
    border: ${props => props.border || "solid #C7D1D0 1px"};
`;
const ImgLabel = styled.label`
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    &:hover {
        cursor: pointer;
    }
    
`;
const StyledImg = styled.img`
    width: 100%;
    height: 100%;
`;
const StyledLabel = styled.label`
    width: 280px;
    height: ${props => props.$height || "36px"};
    border: solid black 1px;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
    margin-bottom: 36px;
`
const StyledInputFile = styled.input`
    display: none;
`;
const TitleRenderWrapper = styled.div`
    width: 90%;
    margin-bottom: 12px;
    display: ${(props) => props.display};
    justify-content: space-between;
`;
const StyledTitleRender = styled.div`
    font-size: 20px;
    font-weight: bold;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;
const StyledValueRender = styled.div`
    width: calc(90% - 34px); 
    height: 17px;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 17px 13px 17px;
    border: none;
    background-color: #F6F6F6;
    border-radius: 5px;
    margin-bottom: 36px;
    @media (max-width: 768px) {
        padding: 10px 17px;
        margin-bottom: 16px;
    }
`;
const StyledSelectWrapper = styled.div`
    width: 90%;
    height: 44px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: ${props => props.$marginBottom || "36px"};
`;
const StyledSelect = styled.select`
    width: 100%;
    height: 100%;
    border: none;
    background-color: #F6F6F6;
    padding: 14px 17px 13px 17px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    @media (max-width: 768px) {
        padding: 10px 17px;
        font-size: 12px;
    }
`;
const StyledInput = styled.input`
    width: calc(90% - 34px); 
    height: 17px;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 17px 13px 17px;
    border: none;
    background-color: #F6F6F6;
    border-radius: 5px;
    margin-bottom: 36px;
    @media (max-width: 768px) {
        padding: 10px 17px;
        margin-bottom: 16px;
    }
`
const StyledForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const ModalXButton = styled.button`
    float: right;
    margin: 6px 12px;
    cursor: pointer;
`

const AddressFindButton = styled.button`
    cursor: pointer;
    background-color: #4dA3d6;
    border: none;
    height: 24px;
    padding: 4px 16px;
    border-radius: 5px;
`;

const ModalContainer = createGlobalStyle`
  .ReactModal__Content {
    @media (max-width: 768px) {
      width: 100% !important;
    }
  }
`;

export default ImageUploadComponent;
