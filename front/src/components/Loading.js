import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = ({height}) => {
    return (
        <StyledLoadingContainer height={height}>
            <StyledLoadingIcon />
        </StyledLoadingContainer>
    );
};

const StyledLoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${props => props.height || "100%"};
`;

const spinAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const StyledLoadingIcon = styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
`;

export default LoadingSpinner;
