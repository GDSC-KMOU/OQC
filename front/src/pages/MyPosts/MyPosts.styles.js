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
    grid-gap: 20px 3%;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1440px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
    width: 98%;
    height: 100%;
    margin-bottom: 20px;
`;