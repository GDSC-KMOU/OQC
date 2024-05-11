import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import styled from 'styled-components';

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
`;
const StyledDiv = styled.div`
    width: 100%;
    height: 160px; 
`;
const NavTop = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 100px;
`;
const NavTopLeft = styled.div`
    width: 269px;
    display: flex;
    align-items: center;
`;
const YgWDS = styled.p`
    font-size: 35px;
    font-weight: bold;
    color: #4DA3D5;
    padding-left: 10px;    
`;
const Button = styled.div`
    width: ${(props) => props.width || '140px'};
    height: 56px;
    background-color: #4DA3D5;
    font-size: 18px;
    border-radius: 15px;
    text-align: center;
    line-height : 56px;
`;
const NavTopRight = styled.div`
    width: 269px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const NavBottomContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #017CC4, #014194);
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

const NavRender = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        switch(location.pathname) {
            case '/myposts':
                setSelectedItem(0);
                break;
            case '/wastefee':
                setSelectedItem(1);
                break;
            case '/wasteout':
                setSelectedItem(2);
                break;
            case '/allposts':
                setSelectedItem(3);
                break;
            default:
                setSelectedItem(null);
        }
    }, [location.pathname]);
    
    //등급 확인
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const payload = JSON.parse(atob(token.split('.')[1]));
            setIsAdmin(payload.role === 'ROLE_ADMIN');
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
                    <img src={Logo} alt="Logo" />
                    <StyledLink to="/" onClick={() => handleLinkClick('/')}><YgWDS>YgWDS</YgWDS></StyledLink>
                </NavTopLeft>
                <NavTopRight>
                        {/*로그인 안하면 밑에 두 개 출력*/}                
                        {!isLoggedIn && (
                            <>
                            <Button width="120px">
                                <StyledLink to="/login" onClick={() => handleLinkClick('/login')}>
                                    로그인
                                </StyledLink>
                            </Button>
                            <Button width="140px">
                                <StyledLink to="/signup" onClick={() => handleLinkClick('/signup')}>
                                        회원가입
                                </StyledLink>
                            </Button>
                            </>
                        )}
                        {/*로그인시 밑에 세 개 출력, 어드민이면 관리자도 출력*/}
                        {isLoggedIn && (
                            <>
                                <div>adaadadada 님</div> {/*유저 이름 출력*/}
                                <Button>
                                    <StyledLink to="/logout">
                                        로그아웃
                                    </StyledLink>   
                                </Button>                           
                                {isAdmin && <Button><StyledLink to="/admin" onClick={() => handleLinkClick('/admin')}>관리</StyledLink></Button>}
                            </>
                        )}
                </NavTopRight>
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

export default Nav;