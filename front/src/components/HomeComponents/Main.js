import React from 'react';
import MainLeft from './MainLeft';
import MainRight from './MainRight';
import styled from 'styled-components';

const Main = () => {
    return(
        <MainWrapper>
            <MainLeft />
            <MainRight />
        </MainWrapper>
    )
};

const MainWrapper = styled.div`
    width: 80%;
    height: 444px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    padding: 36px 16px 36px 16px;
    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        margin: 0;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin-top: 24px;
    }
`

export default Main;