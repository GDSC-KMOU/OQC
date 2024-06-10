import styled from 'styled-components';

export const StyledFooterWrapper = styled.footer`
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
`;
export const FooterText = styled.div`
    font-size: ${(props) => props.fontSize === "m" ? "16px" : "14px"};
    font-weight: ${(props) => props.fontWeight};
    padding: 6px;
    @media (max-width: 768px){
        font-size: ${(props) => props.fontSize === "m" ? "12px" : "10px"};
    }
`;