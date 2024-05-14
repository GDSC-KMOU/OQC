import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
`;
export const WasteFeeWrapper = styled.div`
    width: 80%;
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
export const StyledContent = styled.div`
    display: grid;
    grid-template-rows: 200px;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1280px) {
        grid-template-columns: 1fr 1fr;
        
    }
    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
    grid-gap: 36px 3%;
    width: 98%;
`;
export const TableWrapper = styled.div`
    height: 200px;
`;
export const StyledTable = styled.table`
    width: 100%;
    border: solid #C7D1D0 1px;
    text-align: center;
`;
export const StyledTr = styled.tr`
    border: solid #C7D1D0 1px;
    color: #666666;
    vertical-align: middle;
    height: 50px;
`;
export const StyledTd = styled.td`
    border: solid #C7D1D0 1px;
    color: #666666;
    vertical-align: middle;
    width: 33.33%;
    
`;