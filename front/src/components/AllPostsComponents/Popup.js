import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import LoadingSpinner from "../Loading";
import Xmark from "../../assets/xmark(white).svg";

const PopupContainer = ({ postId, setPostId, handlePopup }) => {
    const [popupContents, setPopupContents] = useState(null);
    const [errorLog, setErrorLog] = useState(null); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://api.capserver.link/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data)
            setPopupContents(response.data);
        } catch (error) {
            setErrorLog(error.message);
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (errorLog) {
            console.log(errorLog);
        }
    }, [errorLog]);

    const handleClose = () => {
        setPostId("")
        setPopupContents(null);
        handlePopup();
    }

    const formatPostTime = (time) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);;
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };
    const handleApprove = async (postId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`https://api.capserver.link/admin/${postId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('승인이 완료되었습니다.');
            navigate(0);
        } catch (error) {
            alert('승인 처리 중 오류가 발생했습니다.');
            navigate(0);
        }
    };
    return (
        <PopupPresentation
            postId={popupContents?.id}
            paid={popupContents?.paid}
            $accepted={popupContents?.accepted}
            time={popupContents?.time}
            userName={popupContents?.userName}
            phoneNumber={popupContents?.phoneNumber}
            garbageName={popupContents?.garbageName}
            garbageContent={popupContents?.garbageContent}
            price={popupContents?.price}
            address={popupContents?.address}
            image={popupContents?.image}
            handleClose={handleClose}
            formatPostTime={formatPostTime}
            formatPrice={formatPrice}
            handleOverlayClick={handleOverlayClick}
            handleApprove={handleApprove}
            loading={loading}
        />
    );
};

const PopupPresentation = ({ postId, paid, $accepted, time, userName, phoneNumber, garbageName, garbageContent, price, address, image, handleClose, formatPostTime, formatPrice, handleOverlayClick, handleApprove, loading}) => {
    return (
        <PopupOverlay onClick={handleOverlayClick}>
            <StyledPopupContainer>
                <PopupTop $accepted={$accepted} $paid={paid}>
                    <PopupTopLeft>
                        {loading ? null : (paid? ($accepted ? "승인완료" : "대기중") : "미결제")}
                    </PopupTopLeft>
                    <PopupTopRight>
                        {loading ? null : formatPostTime(time)}
                        <PopupCloseBtn onClick={handleClose}><img src={Xmark} alt="Xmark"></img></PopupCloseBtn>
                    </PopupTopRight>
                </PopupTop>
                <PopupMainWrapper>
                    {loading ? ( 
                        <LoadingSpinner />
                    ) : (
                        <>
                            <PopupMainContainer>
                                <PopupMain>
                                    <StyledDiv>배출자명: <StyledSpan>{userName}</StyledSpan></StyledDiv>
                                    <StyledDiv>휴대폰 : <StyledSpan>{phoneNumber}</StyledSpan></StyledDiv>
                                    <StyledDiv>폐기물명: <StyledSpan>{garbageName}({garbageContent})</StyledSpan></StyledDiv>
                                    <StyledDiv>결제금액: <StyledSpan>{formatPrice(price)}원</StyledSpan></StyledDiv>
                                    <StyledDiv>
                                        <StyledP>배출장소</StyledP>
                                        <p><StyledSpan>{address}</StyledSpan></p>    
                                    </StyledDiv>
                                </PopupMain>
                                <PopupMain>
                                    <ImgWrapper>
                                        {image && <StyledImg src={`data:image/jpeg;base64,${image}`} alt={garbageName} />}
                                    </ImgWrapper>
                                </PopupMain>    
                            </PopupMainContainer>
                            <SubmitBtn onClick={() => handleApprove(postId)} disabled={paid ? ($accepted ? true : false) : true} $accepted={$accepted} $paid={paid}>승인</SubmitBtn>
                        </>
                    )}
                </PopupMainWrapper>
            </StyledPopupContainer>
        </PopupOverlay>
    );
};

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
const StyledPopupContainer = styled.div`
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.25);
    width: 80%;
    max-width: 740px;
    min-height: 434px;
    z-index: 1001;
    @media (max-width: 768px) {
        width: 98%;
    }
`;

const PopupTop = styled.div`
    background-color: ${(props) => props.$paid? (props.$accepted ? "#5cb85c" : "#33B5E5") : "#FFBB33"};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 30px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`;
const PopupMainWrapper = styled.div`
    padding: 24px 16px;
    position: relative;
    height: 336px;
    width: calc(100% - 32px);
`;
const PopupMainContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const PopupMain = styled.div`
    width: 48%;
    height: 245px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 48%;
`;
const ImgWrapper = styled.div`
    width: auto;
    height: 245px;
    display: flex;
    justify-content: end;
`;
const StyledImg = styled.img`
    max-width: 100%;
    height: 100%;
`;
const PopupTopLeft = styled.div`
    font-size: 20px;
`;
const PopupTopRight = styled.div`
    display: flex;
    align-items: center;
`;
const StyledDiv = styled.div`
`;
const PopupCloseBtn = styled.div`
    cursor: pointer;
    margin-left: 16px;
    width: 24px;
    height: 24px;
`;
const SubmitBtn = styled.button`
    background-color: ${(props) => props.$paid ? ( props.$accepted ? '#666666;' : '#0D6EFD;') : '#666666'};
    border-radius: 5px;
    color: white;
    width: calc(100% - 32px);
    height: 48px;
    font-size: 16px;
    border: none;
    position: absolute;
    bottom: 24px;
    cursor: ${(props) => props.$paid ? ( props.$accepted ? '' : 'pointer;') : ''};
    &:hover{
        background-color: ${(props) => props.$paid ? ( props.$accepted ? '#666666;' : '#0257d5;') : '#666666'};
        transition: 0.3s;
    };
`;
const StyledP = styled.p`
    padding-bottom: 8px;
`
const StyledSpan = styled.span`
    color: #666666;
`;
export default PopupContainer;
