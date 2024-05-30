import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";
import LoadingSpinner from "../Loading";

const PopupContainer = ({ postId, setPostId, handlePopup }) => {
    const [popupContents, setPopupContents] = useState(null);
    const [errorLog, setErrorLog] = useState(null); 
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://api.capserver.link/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPopupContents(response.data);
            console.log("setCon")
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


    return (
        <PopupPresentation
            paid={popupContents?.paid}
            accepted={popupContents?.accepted}
            time={popupContents?.time}
            userName={popupContents?.userName}
            //phoneNumber={popupContents?.phoneNumber} // 추가 필요
            garbageName={popupContents?.garbageName}
            garbageContent={popupContents?.garbageContent}
            price={popupContents?.price}
            address={popupContents?.address}
            image={popupContents?.image}
            handleClose={handleClose}
            formatPostTime={formatPostTime}
            formatPrice={formatPrice}
            handleOverlayClick={handleOverlayClick}
            loading={loading}
        />
    );
};

const PopupPresentation = ({ paid, accepted, time, userName, phoneNumber, garbageName, garbageContent, price, address, image, handleClose, formatPostTime, formatPrice, handleOverlayClick, loading}) => {
    return (
        <PopupOverlay onClick={handleOverlayClick}>
            <StyledPopupContainer>
                <PopupTop accepted={accepted}>
                    <PopupTopLeft>
                        {loading ? null : (accepted ? "승인완료" : "대기중")}
                    </PopupTopLeft>
                    <PopupTopRight>
                        {loading ? null : formatPostTime(time)}
                        <PopupCloseBtn onClick={handleClose}>X</PopupCloseBtn>
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
                                    <StyledDiv>휴대폰 : <StyledSpan>01012345678</StyledSpan></StyledDiv>
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
                            <SubmitBtn disabled={accepted ? false : true} accepted={accepted}>승인</SubmitBtn>
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
    background-color: ${(props) => props.accepted ? "#33B5E5" : "#FFBB33"};
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
`;
const StyledDiv = styled.div`
`;
const PopupCloseBtn = styled.button`
    cursor: pointer;
    margin-left: 16px;
    width: 24px;
    height: 24px;
`;
const SubmitBtn = styled.button`
    background-color: ${(props) => props.accepted ? '#666666;' : '#0D6EFD;'};
    border-radius: 5px;
    color: white;
    width: calc(100% - 32px);
    height: 48px;
    font-size: 16px;
    border: none;
    position: absolute;
    bottom: 24px;
    &:hover{
        ${(props) => props.accepted ? null : 'cursor: pointer;'};
    };
`;
const StyledP = styled.p`
    padding-bottom: 8px;
`
const StyledSpan = styled.span`
    color: #666666;
`;
export default PopupContainer;
