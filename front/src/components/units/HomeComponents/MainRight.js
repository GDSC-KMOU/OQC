import React from 'react';
import styled from 'styled-components';

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
                    <StatusContentWrapper>
                        <StatusWrapper>
                            <Status $bgColor= {"#FFBB33"}>미결제?</Status> 
                            <StatusDescription>: 배출 신청 후 결제하지 않은 상태</StatusDescription> 
                        </StatusWrapper>
                        <StatusWrapper>
                        <Status $bgColor= {"#33B5E5"}>대기중?</Status> 
                            <StatusDescription>: 결제완료 후 관리자 승인 대기 상태</StatusDescription> 
                        </StatusWrapper>
                        <StatusWrapper>
                            <Status $bgColor= {"#5cb85c"}>승인완료?</Status>
                            <StatusDescription>: 관리자 승인 완료 상태</StatusDescription> 
                        </StatusWrapper>
                    </StatusContentWrapper>
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
    height: 83px; 
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
const StatusContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`
const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
`

const StatusDescription = styled.span`
    margin-left: 12px;
    color: #666666;
    font-weight: bold;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`
const Status = styled.div`
    width: 100px;
    height: 28px;
    background-color: ${(props) => props.$bgColor};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    color: white;
    @media (max-width: 768px) {
        width: 54px;
        height: 28px;
        font-size: 10px;
}
`;

export default MainRight;