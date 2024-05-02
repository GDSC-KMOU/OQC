import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const NavRender = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    //등급 확인
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const payload = JSON.parse(atob(token.split('.')[1]));
            setIsAdmin(payload.role === 'ROLE_ADMIN');
        }
    }, []);

    return(
        <nav id='Nav'>
            <div id='NavTop'>
                <div>
                    <img src={Logo} alt="Logo" />
                    <Link to="/">YgWDS</Link>
                </div>
                <div>
                    <ul>
                        {/*로그인 안하면 밑에 두 개 출력*/}                
                        {!isLoggedIn && (
                            <>
                                <li><Link to="/login">로그인</Link></li>
                                <li><Link to="/signup">회원가입</Link></li>
                            </>
                        )}
                        {/*로그인시 밑에 세 개 출력, 어드민이면 관리자도 출력*/}
                        {isLoggedIn && (
                            <>
                                <li>adaadadada 님</li> {/*유저 이름 출력*/}
                                <li><Link to="/logout">로그아웃</Link></li>                          
                                {isAdmin && <li><Link to="/admin">관리</Link></li>}
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div id='NavBottom'>
            <ul>
                <li>
                    <Link to="/myposts">내 신청</Link>
                </li>
                <li>
                    <Link to="/wastefee">폐기물 수수료 안내</Link>
                </li>
                <li>
                    <Link to="/wasteout">폐기물 배출하기</Link>
                </li>
                <li>
                    <Link to="/allposts">전체 신청 현황</Link>
                </li>
            </ul>
            </div>
        </nav>
    )
};

const Nav = () => {
    return(
        <NavRender />
    )
};

export default Nav;