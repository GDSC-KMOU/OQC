import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <StyledFooterWrapper>
            <FooterText fontWeight="bold" fontSize="m">
            한국해양대학교 인공지능공학부 캡스톤디자인
            </FooterText>
            <FooterText>
            YOLOv7을 활용한 영도구 폐기물 처리시스템
            </FooterText>
        </StyledFooterWrapper>
    );
};

const StyledFooterWrapper = styled.footer`
    width:100%;
    height: 100px;
    background-color: #F6F6F6;
    flex-direction: column;
    color: #666666;
    display: flex;
    justify-content: center; 
    align-items: center; 
    font-weight: bold;
    position : absolute;
    bottom : 0;
`
const FooterText = styled.div`
    font-size: ${(props) => props.fontSize === "m" ? "16px" : "14px"};
    font-weight: ${(props) => props.fontWeight === "bold" ? "bold" : "normal"};
    padding: 6px;
    @media (max-width: 768px){
        font-size: ${(props) => props.fontSize === "m" ? "12px" : "10px"};
    }
`

export default Footer;