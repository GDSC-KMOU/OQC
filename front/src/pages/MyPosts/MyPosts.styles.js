import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
`;
export const MyPostsWrapper = styled.div`
    width: 80%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const StyledTitle = styled.div`
    width: 98%;
    height: 50px;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    border-bottom: solid #4DA3D5 5px;
    color: #4DA3D5;
    font-size: 25px;
    font-weight: bold;
`;
export const State = styled.div`
    width: 100%;
    height: calc(100vh - 160px - 100px - 54.67px - 30px - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const PostsContainer = styled.div`
    display: grid;
    grid-gap: 0 3%;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1440px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
    width: 98%;
    height: 716px;
    margin-bottom: 20px;
`;
export const Item = styled.div`
    width: 100%;
    height: 338px;
    padding-bottom: 20px;
    &:hover {
        cursor: pointer;
    }
`;
export const PostTitle = styled.div`
    background-color: ${props => {
        if (props.status === 'paid') {
            return '#99B88C'; // 결제완료
        } else if (props.status === 'accepted') {
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
    font-size: ${(props) => props.fonsSize};
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
export const StyledSpan = styled.span`
    color: #666666;
`;
export const PostContent = styled.div`
    width: 45%;
    height: 240px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
export const PostImg = styled.div`
    width: 40%;
    height: 240px;
    background-color: #ccc;
`;
