import React from 'react';
import RightImg from '../assets/RightImg.png';
import YDImg from '../assets/Youngdo-gu.png';
import styled from 'styled-components';
 
const Container = styled.div`
    background-image: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${YDImg});
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;  
`;

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin: auto;
`;

const RightImgComponentWrapper = styled.div`
    text-align: center;
`;

const LeftTextWrapper = styled.div`
    align-self: flex-end;
    color: white;
    font-size: 30px;
    font-weight: bold;
`;

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

export default Top;