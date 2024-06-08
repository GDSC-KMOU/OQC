import React, {useState, useEffect, useCallback} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import styled from 'styled-components';
import MobileNav from './MobileNav';
import axios from 'axios';

const NavRender = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [username, setUsername] = useState("");
    
    useEffect(() => {
        const paths = ['/myposts', '/wastefee', '/wasteout', '/allposts'];
        const index = paths.findIndex(path => location.pathname.startsWith(path));
        setSelectedItem(index !== -1 ? index : null);
    }, [location.pathname]);
    
    //등급 확인
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            const payload = JSON.parse(atob(token.split('.')[1]));
            setIsAdmin(payload.role === 'ROLE_ADMIN');
            setUsername(payload.username);
        }
    }, []);

    const handleLinkClick = (path) => {
        if (location.pathname === path) {
            navigate(0); // 현재 페이지 새로고침
        }
    };
    
    return(
        <>
        <StyledNav>
            <NavTop>
                <NavTopLeft>
                    <img src={Logo} alt="Logo" style={{height: "36px"}}/>
                    <StyledLink to="/" onClick={() => handleLinkClick('/')}><YgWDS>YgWDS</YgWDS></StyledLink>
                </NavTopLeft>
                <NavTopRight >
                        {/*로그인 안하면 밑에 두 개 출력*/}                
                        {!isLoggedIn && (
                            <>
                            <Button width="80px">
                                <StyledLink to="/login" onClick={() => handleLinkClick('/login')}>
                                    로그인
                                </StyledLink>
                            </Button>
                            <Button width="100px">
                                <StyledLink to="/signup" onClick={() => handleLinkClick('/signup')}>
                                        회원가입
                                </StyledLink>
                            </Button>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <Username>
                                    <StyledP color='#0279C2' fontSize="18px" fontWeight="bold" style={{paddingLeft: "24px"}}>{username}</StyledP> 
                                    <StyledP>&nbsp;님</StyledP>
                                </Username>
                                <Button>
                                    <StyledLink to="/logout">
                                        로그아웃
                                    </StyledLink>   
                                </Button>                           
                                {/*isAdmin && <Button><StyledLink to="/admin" onClick={() => handleLinkClick('/admin')}>관리</StyledLink></Button>*/}
                            </>
                        )}
                </NavTopRight>
                <MobileNav/>
            </NavTop>
            <NavBottomContainer>
                <NavBottom>
                <Styledul>
                    <Styledli selected={selectedItem === 0}>
                        <StyledLink to="/myposts" onClick={() => handleLinkClick('/myposts')}>내 신청</StyledLink>
                    </Styledli>
                    <Styledli selected={selectedItem === 1}>
                        <StyledLink to="/wastefee" onClick={() => handleLinkClick('/wastefee')}>폐기물 수수료 안내</StyledLink>
                    </Styledli>
                    <Styledli selected={selectedItem === 2}>
                        <StyledLink to="/wasteout" onClick={() => handleLinkClick('/wasteout')}>폐기물 배출하기</StyledLink>
                    </Styledli>
                    <Styledli selected={selectedItem === 3}>
                        <StyledLink to="/allposts" onClick={() => handleLinkClick('/allposts')}>전체 신청 현황</StyledLink>
                    </Styledli>
                </Styledul>
                </NavBottom>
            </NavBottomContainer>
        </StyledNav>
        <StyledDiv />
        </>
    )
};

const Nav = () => {
    return(
        <NavRender />
    )
};

const StyledLink = styled(Link)`
  text-decoration: none;
  height: ${(props) => props.height || '100%'};
  color: ${(props) => props.color || 'white'};
  display: flex;  
  justify-content: center;
  align-items: center;
`;
const StyledNav = styled.nav`
    width: 100%;
    position: fixed; /* 상단 고정 */
    top: 0; /* 맨 위에 고정 */
    background-color: white; /* 배경색 지정 */
    z-index: 1000; /* 다른 요소 위로 표시 */
    @media (max-width: 768px){
        height: 64px;
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25);
    }
`;
const StyledDiv = styled.div`
    width: 100%;
    height: 120px;
    @media (max-width: 768px){
        height: 64px;
    }
`;
const NavTop = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 60px;
    @media (max-width: 768px){
        width: 100%;
        height: 64px;
    }
`;
const NavTopLeft = styled.div`
    width: 269px;
    display: flex;
    align-items: center;
    @media (max-width: 768px){
        img {
            width : 32px;
            height : 32px;
        }
        padding: 16px;
    }
`;
const YgWDS = styled.p`
    font-size: 24px;
    font-weight: bold;
    color: #4DA3D5;
    padding-left: 10px;    
    @media (max-width: 768px){
        font-size: 24px;
    }
`;
const Username = styled.div`
    width: 115px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StyledP = styled.p`
    color: ${(props) => props.color || '#024598'};
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
`;
const Button = styled.div`
    width: ${(props) => props.width || '100px'};
    height: 48px;
    background-color: #4DA3D5;
    font-size: 16px;
    border-radius: 12px;
    text-align: center;
    line-height : 56px;
`;
const NavTopRight = styled.div`
    width: 192px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px){
        display : none;
    }
`;
const NavBottomContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #017CC4, #014194);
    @media (max-width: 768px){
        display : none;
    }
`;
const NavBottom = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 60px;
`;
const Styledul = styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Styledli = styled.li`
    height: 80%;
    flex-grow: 1;
    text-align: center;
    font-weight: ${(props) => props.selected ? 'bold' : 'normal'};
    &:hover {
        cursor: pointer;
        font-weight: bold;
    }
`;

export default Nav;