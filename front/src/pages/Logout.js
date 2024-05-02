import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    }, [navigate]);
    Boolean(localStorage.getItem('token'));
    return null;
}

export default Logout;
