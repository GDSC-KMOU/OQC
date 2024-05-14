import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <StyledFooter>
            한국해양대학교 인공지능공학부 캡스톤디자인2 - YOLOv7을 활용한 영도구 폐기물 처리시스템
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
    width:100%;
    height: 100px;
    background-color: #F6F6F6;
    color: #666666;
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    font-weight: bold;
    position : absolute;
    bottom : 0;
`

export default Footer;