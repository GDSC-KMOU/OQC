import React from 'react';
import styled from "styled-components";

const WasteFee = () => {
    return (
        <Container>
            <WasteFeeWrapper>
                <StyledTitle  $width="98%">폐기물 수수료</StyledTitle>
                <StyledContent>
                    <TableWrapper>
                        <StyledTable>
                            <tbody>
                            <StyledTr>
                                <StyledTd rowSpan="3" width="150px">밥상</StyledTd>
                                <StyledTd>6인용 이상</StyledTd>
                                <StyledTd>3,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>4인용</StyledTd>
                                <StyledTd>2,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>2인용</StyledTd>
                                <StyledTd>1,000</StyledTd>
                            </StyledTr>
                            </tbody>
                        </StyledTable>
                    </TableWrapper>
                    <TableWrapper>
                        <StyledTable>
                            <tbody>
                            <StyledTr>
                                <StyledTd rowSpan="2" width="150px">서랍장</StyledTd>
                                <StyledTd>5단 이상</StyledTd>
                                <StyledTd>10,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>5단 미만</StyledTd>
                                <StyledTd>6,000</StyledTd>
                            </StyledTr>
                            </tbody>
                        </StyledTable>
                    </TableWrapper>
                    <TableWrapper>
                        <StyledTable>
                            <tbody>
                            <StyledTr>
                                <StyledTd rowSpan="4">소파</StyledTd>
                                <StyledTd>5인용 이상</StyledTd>
                                <StyledTd>17,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>3인용</StyledTd>
                                <StyledTd>12,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>2인용</StyledTd>
                                <StyledTd>9,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>1인용</StyledTd>
                                <StyledTd>5,000</StyledTd>
                            </StyledTr>
                            </tbody>
                        </StyledTable>
                    </TableWrapper>
                    <TableWrapper>
                        <StyledTable>
                            <tbody>
                            <StyledTr>
                                <StyledTd rowSpan="4">의자</StyledTd>
                                <StyledTd>목재, 철재</StyledTd>
                                <StyledTd>2,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>목재, 철재 외</StyledTd>
                                <StyledTd>3,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>회전, 안락, 사무용 의자</StyledTd>
                                <StyledTd>5,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>안마의자</StyledTd>
                                <StyledTd>30,000</StyledTd>
                            </StyledTr>
                            </tbody>
                        </StyledTable>
                    </TableWrapper>
                    <TableWrapper>
                        <StyledTable>
                            <tbody>
                            <StyledTr>
                                <StyledTd rowSpan="3">장롱</StyledTd>
                                <StyledTd>120cm 이상 1짝</StyledTd>
                                <StyledTd>17,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>120cm 미만 1짝</StyledTd>
                                <StyledTd>14,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>90cm 미만 1짝</StyledTd>
                                <StyledTd>10,000</StyledTd>
                            </StyledTr>
                            </tbody>
                        </StyledTable>
                    </TableWrapper>
                    <TableWrapper>
                        <StyledTable>
                            <tbody>
                            <StyledTr>
                                <StyledTd rowSpan="4">책상</StyledTd>
                                <StyledTd>서랍장 2개<br /> 혹은 1m 이상</StyledTd>
                                <StyledTd>8,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>서랍장 2개<br /> 혹은 1m 이하</StyledTd>
                                <StyledTd>5,000</StyledTd>
                            </StyledTr>
                            <StyledTr>
                                <StyledTd>책상 + 책장 세트</StyledTd>
                                <StyledTd>12,000</StyledTd>
                            </StyledTr>
                            </tbody>
                        </StyledTable>
                    </TableWrapper>
                </StyledContent>
            </WasteFeeWrapper>
        </Container>

    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
`;
const WasteFeeWrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        width: 95%;
    }    
`;
const StyledTitle = styled.div`
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
    @media (max-width: 768px) {
        font-size: 20px;
        border-bottom: solid #4DA3D5 2px;
        height: 36px;
    } 
`;
const StyledContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1280px) {
        grid-template-columns: 1fr 1fr;
        
    }
    @media (max-width: 720px) {
        grid-template-columns: 1fr;
        padding-bottom: 24px;
        width: 100%;
    }
    grid-gap: 36px 3%;
    width: 98%;
`;
const TableWrapper = styled.div`
    height: 100%;
    @media (max-width: 720px) {
        font-size: 12px;
    }
`;
const StyledTable = styled.table`
    width: 100%;
    border: solid #C7D1D0 1px;
    text-align: center;
`;
const StyledTr = styled.tr`
    border: solid #C7D1D0 1px;
    color: #666666;
    vertical-align: middle;
    height: 50px;
`;
const StyledTd = styled.td`
    border: solid #C7D1D0 1px;
    color: #666666;
    vertical-align: middle;
    width: 33.33%;
    
`;

export default WasteFee;