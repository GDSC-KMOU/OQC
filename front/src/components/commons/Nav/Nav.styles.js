import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  height: ${(props) => props.height || '100%'};
  color: ${(props) => props.color || 'white'};
  display: flex;  
  justify-content: center;
  align-items: center;
`;
export const StyledNav = styled.nav`
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
export const StyledDiv = styled.div`
    width: 100%;
    height: 120px;
    @media (max-width: 768px){
        height: 64px;
    }
`;
export const NavTop = styled.div`
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
export const NavTopLeft = styled.div`
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
export const YgWDS = styled.p`
    font-size: 24px;
    font-weight: bold;
    color: #4DA3D5;
    padding-left: 10px;    
    @media (max-width: 768px){
        font-size: 24px;
    }
`;
export const Username = styled.div`
    width: 115px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const StyledP = styled.p`
    color: ${(props) => props.color || '#024598'};
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
`;
export const Button = styled.div`
    width: ${(props) => props.width || '100px'};
    height: 48px;
    background-color: #4DA3D5;
    font-size: 16px;
    border-radius: 12px;
    text-align: center;
    line-height : 56px;
    &:hover {
    background-color: #2e8bc1;
    transition: 0.3s;
  }
`;
export const NavTopRight = styled.div`
    width: 192px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    @media (max-width: 768px){
        display : none;
    }
`;
export const NavBottomContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #017CC4, #014194);
    @media (max-width: 768px){
        display : none;
    }
`;
export const NavBottom = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 60px;
`;
export const Styledul = styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Styledli = styled.li`
    height: 80%;
    flex-grow: 1;
    text-align: center;
    font-weight: ${(props) => props.selected ? 'bold' : 'normal'};
    &:hover {
        cursor: pointer;
        font-weight: bold;
    }
`;

export const MobileNavContainer = styled.div`
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
export const MobileHamburger = styled.div`
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
export const MobileNavTop = styled.div`
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

export const MobileNavMenu = styled.div`
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

export const MobileStyledLink = styled(Link)`
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

export const MobileStyledP = styled.p`
    color: #333;
    font-size: 18px;
    font-weight: bold;
    align-items: center;
    height: 48px;
    width: 78%;
    display: flex;
    background-color: #4DA3D5;
    padding: 0 12px;
    color: white;
    margin-bottom: 12px;
    border-radius: 12px;
    font-size: 14px;
`;