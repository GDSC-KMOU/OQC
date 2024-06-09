import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../assets/home.svg";
import Xmark from "../assets/xmark(white).svg";
import Arrow from "../assets/arrow.svg";

function base64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

const MobileNav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            const payload = JSON.parse(base64DecodeUnicode(token.split('.')[1]));
            setUsername(payload.name);
        }
    }, []);

    const handleLinkClick = (path) => {
        if (location.pathname === path) {
            navigate(0); // 현재 페이지 새로고침
        }
        setIsOpen(!isOpen);
    };
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleToggle();
        }
    };

    return (
        <>
        <Hamburger onClick={handleToggle}>
            <div />
            <div />
            <div />
        </Hamburger>
        {isOpen && (
            <NavContainer onClick={handleOverlayClick}>
            <NavMenu>
                <NavTop>
                <div>
                    <a href="/">
                    <img src={HomeIcon} alt="home"></img>
                    </a>
                </div>
                <div onClick={handleToggle}>
                    <img src={Xmark} alt="Xmark"></img>
                </div>
                </NavTop>
                {!isLoggedIn && (
                <>
                        <StyledLink to="/login" onClick={() => handleLinkClick('/login')} alt={"light"}>
                            로그인
                            <img src={Arrow} alt="arrow"></img>
                        </StyledLink>
                        <StyledLink to="/signup" onClick={() => handleLinkClick('/signup')} alt={"light"}>
                            회원가입
                            <img src={Arrow} alt="arrow"></img>
                        </StyledLink>                    
                </>
                )}
                {isLoggedIn && (
                <>
                    <StyledLink alt={"light"}>{username}</StyledLink>
                    <StyledLink to="/logout" onClick={() => handleLinkClick('/logout')} alt={"light"}>
                        로그아웃
                        <img src={Arrow} alt="arrow"></img>
                    </StyledLink>
                </>
                )}
                <StyledLink to="/myposts" onClick={() => handleLinkClick('/myposts')}>
                    내 신청
                    <img src={Arrow} alt="arrow"></img>
                </StyledLink>
                <StyledLink to="/wastefee" onClick={() => handleLinkClick('/wastefee')}>
                    폐기물 수수료 안내
                    <img src={Arrow} alt="arrow"></img>
                </StyledLink>
                <StyledLink to="/wasteout" onClick={() => handleLinkClick('/wasteout')}>
                    폐기물 배출하기
                    <img src={Arrow} alt="arrow"></img>
                </StyledLink>
                <StyledLink to="/allposts" onClick={() => handleLinkClick('/allposts')}>
                    전체 신청 현황
                    <img src={Arrow} alt="arrow"></img>
                </StyledLink>
            </NavMenu>
            </NavContainer>
        )}
        </>
    );
    };
const NavContainer = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: block;
    }
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1100;
    background-color: rgba(0, 0, 0, 0.25);
`;
const Hamburger = styled.div`
    display: none;
    cursor: pointer;
    z-index: 1000;
    position: fixed;
    top: 15px;
    right: 15px;

    @media (max-width: 768px) {
        display: block;
    }

    & > div {
        width: 28px;
        height: 4px;
        background-color: #4da3d5;
        margin: 6px 0;
        border-radius: 16px;
    }
 `;
const NavTop = styled.div`
    width: 100%;
    height: 64px;
    background: linear-gradient(to right, #017cc4, #014194);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    div {
        padding: 12px;
        color: white;
    }
    div:first-child > a {
        text-decoration: none;
        color: white;
    }
`;

const NavMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    background-color: #fff;
    z-index: 1200;
    display: flex;
    flex-direction: column;
    align-items: center;

    @keyframes fadeInRight {
        0% {
        opacity: 1;
        transform: translate3d(100%, 0, 0);
        }
        to {
        opacity: 1;
        transform: translateZ(0);
        }
    }

    animation: fadeInRight 0.5s;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-size: 18px;
    align-items: center;
    height: 48px;
    width: 78%;
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => (props.alt === "light" ? '#4DA3D5' : '#0279C2')};
    padding: 0 12px;
    color: white;
    margin-bottom: 12px;
    border-radius: 12px;
    font-size: 14px;
`;

export default MobileNav;

    