import React from 'react';
import MainLeft from './MainLeft';
import MainRight from './MainRight';
import styled from 'styled-components';

const MainWrapper = styled.div`
    width: 80%;
    height: 516px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    padding: 36px 16px 36px 16px;
`

const Main = () => {
    return(
        <MainWrapper>
            <MainLeft />
            <MainRight />
        </MainWrapper>
    )
};

export default Main;