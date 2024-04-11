import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import JoinForm from './Component/JoinForm';
import LoginForm from './Component/LoginForm';
import Logout from './Component/Logout';
import ViewAllPosts from './Component/ViewAllPosts';
import ViewByPost from './Component/ViewByPost';
import Payment from './Component/Payment';
import SuccessPage from './Component/Success';
import ImageUploadComponent from './Component/ImageProcess';
import AdminPosts from './Component/AdminAllPosts';

function App() {
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

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        {/*로그인 안하면 밑에 두 개 출력*/}
                        {!isLoggedIn && (
                            <>
                                <li><Link to="/login">로그인</Link></li>
                                <li><Link to="/join">회원가입</Link></li>
                            </>
                        )}
                        {/*로그인시 밑에 세 개 출력, 어드민이면 관리자도 출력*/}
                        {isLoggedIn && (
                            <>
                                <li><Link to="/logout">로그아웃</Link></li>
                                <li><Link to="/image">폐기 신청</Link></li>
                                <li><Link to="/allpost">폐기 신청글 보기</Link></li>
                                {isAdmin && <li><Link to="/admin">관리자</Link></li>}
                            </>
                        )}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/join" element={<JoinForm />} />
                    <Route path="/allpost" element={<ViewAllPosts />} />
                    <Route path="/view-by-post/:postId" element={<ViewByPost />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path="/image" element={<ImageUploadComponent />} />
                    <Route path="/admin" element={<AdminPosts />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
