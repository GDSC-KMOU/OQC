import React from 'react';
import RightImg from '../../../assets/RightImg.png';
import YDImg from '../../../assets/Youngdo-gu.jpg';
import styled from 'styled-components';
 
const LeftText = () => {
    return(
        <LeftTextWrapper>
            <div>영도구 폐기물 처리 시스템</div>
            <div>(Youngdo-gu Waste Disposal System)</div>
        </LeftTextWrapper>
    )
}

const RightImgComponent = () => {
    return(
        <RightImgComponentWrapper>
            <img src={RightImg} alt="" />
        </RightImgComponentWrapper>    
    )
}


const Top = () => {
    return(
        <Container>
            <Wrapper>
            <LeftText />
            <RightImgComponent />
            </Wrapper>
        </Container>
    )
};


const Container = styled.div`
    background-image: linear-gradient( rgba(37, 37, 37, 0.5), rgba(37, 37, 37, 0.5) ), url(${YDImg});
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;  
    background-size : cover;
    background-position: center;
    @media (max-width: 768px){
        border-radius: 0 0 24px 24px;
        box-shadow: 0 8px 8px 0 rgba(0,0,0,0.25);
    }
`;

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin: auto;
    @media (max-width: 768px){
        flex-direction : column-reverse;
        gap: 30px;
    }
`;

const RightImgComponentWrapper = styled.div`
    text-align: center;
    @media (max-width: 768px){
        img {
            width : 180px;
            height : 100px;
        }
    }
`;

const LeftTextWrapper = styled.div`
    align-self: flex-end;
    color: white;
    font-size: 30px;
    font-weight: bold;
    @media (max-width: 768px){
        width: 100%;
        div:first-child{
            font-size: 24px;
            text-align: center;
        }
        div:last-child{
            font-size:16px;
            text-align: center;
        }
    }
`;

export default Top;