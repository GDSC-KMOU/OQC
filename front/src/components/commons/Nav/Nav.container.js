import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import NavUI from './Nav.presenter';

export default function Nav(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [username, setUsername] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    function base64DecodeUnicode(str) {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    useEffect(() => {
        const paths = ['/myposts', '/wastefee', '/wasteout', '/allposts'];
        const index = paths.findIndex(path => location.pathname.startsWith(path));
        setSelectedItem(index !== -1 ? index : null);
    }, [location.pathname]);

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            const payload = JSON.parse(base64DecodeUnicode(token.split('.')[1]));
            setIsAdmin(payload.role === 'ROLE_ADMIN');
            setUsername(payload.name);
        }
    }, []);

    const handleLinkClick = (path) => {
        if (location.pathname === path) {
            navigate(0); // 현재 페이지 새로고침
        }
        
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleOverlayClick = (e) => {
        if (e.currentTarget) {
            handleToggle();
        }
    };

    return <NavUI 
        handleLinkClick={handleLinkClick} 
        isLoggedIn={isLoggedIn}
        username={username}
        selectedItem={selectedItem}
        handleOverlayClick={handleOverlayClick}
        handleToggle={handleToggle}
        isOpen={isOpen}
    />
}