import React from 'react';
import {
    Container,
    WasteFeeWrapper,
    StyledTitle,
    StyledContent,
    TableWrapper,
    StyledTable,
    StyledTr,
    StyledTd,
} from './WasteFee.styles';

const WasteFee = () => {
    return (
        <Container>
            <WasteFeeWrapper>
                <StyledTitle>폐기물 수수료</StyledTitle>
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

export default WasteFee;