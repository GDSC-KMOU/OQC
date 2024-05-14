import styled from "styled-components";

export const Card = styled.div`
    width: 100%;
    height: 338px;
    &:hover {
        cursor: pointer;
    }
`;
export const PostTitle = styled.div`
    background-color: ${props => {
        if (props.$status === 'paid') {
            return '#99B88C'; // 결제완료
        } else if (props.$status === 'accepted') {
            return '#33B5E5'; // 승인완료
        } else {
            return '#FFBB33'; // 미결제
        }
    }};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 15px;
    height: 50px;
    color: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;
export const StyledP = styled.p`
    font-size: ${(props) => props.$fonsSize};
    font-weight: bold;
`;
export const PostContentWrapper = styled.div`
    border: solid rgb(207, 207, 207) 1px;
    box-sizing: border-box;
    border-radius: 0 0 5px 5px;
    height: 288px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const PostContent = styled.div`
    width: 45%;
    height: 240px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
export const StyledSpan = styled.span`
    color: #666666;
`;
export const PostImg = styled.div`
    width: 40%;
    height: 240px;
    background-color: #ccc;
`;
