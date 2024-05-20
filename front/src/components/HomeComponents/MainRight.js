import React from 'react';
import styled from 'styled-components';
import NumberImg from '../../assets/Number.png';

const MainRight = () => {
    const ContentTop = () => {
        return(
            <ContentTopWrapper>
                <ContentTitle>폐기물 종류</ContentTitle>
                <StyledUl>
                    <StyledLi>밥상</StyledLi>
                    <StyledLi>서랍장</StyledLi>
                    <StyledLi>소파</StyledLi>
                    <StyledLi $borderLeft="5px">의자</StyledLi>
                    <StyledLi>장롱</StyledLi>
                    <StyledLi $borderRight="5px">책상</StyledLi>
                </StyledUl>
            </ContentTopWrapper>
        )
    }
    const ContentBottom = () => {
        return(
            <ContentBottomWrapper>
                <ContentTitle>고객지원안내</ContentTitle>
                <ContentBottomContent>
                    <TextWrapper>불편이 생긴 경우 고객센터로 문의해주시길 바랍니다</TextWrapper>
                    <img src={NumberImg} alt="" />
                </ContentBottomContent>
            </ContentBottomWrapper>
        )
    }
    return(
        <MainRightWrapper>
            <ContentTop />
            <ContentBottom />
        </MainRightWrapper>
    )
};

const MainRightWrapper = styled.div`
    width: 48%;
    height: 444px;
    @media (max-width: 768px) {
        width: 95%;
        height: 100%;
    }
`;

const ContentTopWrapper = styled.div`
    width: 100%;
    height: 216px;
    margin-bottom: 48px;
    @media (max-width: 768px) {
        margin-bottom: 24px;
    }
`

const ContentTitle = styled.div`
    height: 50px;
    background-color: #0279C2;
    color: white;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-size: 20px;
    @media (max-width: 768px) {
        height: 36px;
        font-size: 14px;
    }
`

const StyledUl = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.25);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const StyledLi = styled.li`
    text-align: center;
    color: #0279C2;
    height: 83px; /* 각 항목 사이의 간격을 조절할 수 있습니다. */
    border: solid rgb(207, 207, 207) 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: ${(props) => props.$borderLeft || '0px'};
    border-bottom-right-radius: ${(props) => props.$borderRight || '0px'};
`;

const ContentBottomWrapper = styled.div`
    width: 100%;
    height: 180px;
    @media (max-width: 768px) {
        margin-bottom: 24px;
    }
`

const ContentBottomContent = styled.div`
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.25);
    height: 130px;
    display: flex; /* Added display flex */
    flex-direction: column; /* Added flex-direction column */
    align-items: center;
    justify-content: center;
    text-align: center;
    @media (max-width: 768px){
        img {
            width: 70%;
        }
    }
`

const TextWrapper = styled.div`
    padding-bottom: 17px;
    @media (max-width: 768px){
        font-size: 12px;
    }
`

export default MainRight;