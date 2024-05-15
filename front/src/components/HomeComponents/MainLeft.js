import React, {useState} from 'react';
import GetAllStts from './GetAllPosts';
import GetMyStts from './GetMyPosts';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainLeft = () => {
    const [selectedItem, setSelectedItem] = useState("전체 배출 신청 현황");

    const clickHandler = (item) => {
        setSelectedItem(item);
    }

    const ContentTop = () => {
        return(
            <ContentTopWrapper>
                <StyledBtn width="221px" $borderTopLeft="5px" $borderRight="1px" $clicked={selectedItem === "전체 배출 신청 현황"} alt = "1" onClick={() => clickHandler("전체 배출 신청 현황")}>전체 배출 신청 현황</StyledBtn> 
                <StyledBtn width="162px" $borderRight="1px" $clicked={selectedItem === "My 신청 현황"} alt = "2" onClick={() => clickHandler("My 신청 현황")}>My 신청 현황</StyledBtn>
                <StyledBtn width="90px" $borderTopRight="5px" $marginLeft="auto" fontSize="sm" alt = "1">
                    <StyledLink to={selectedItem=== "전체 배출 신청 현황" ? "/allposts" : "/myposts"}>+ 더보기</StyledLink>
                </StyledBtn>
            </ContentTopWrapper>
        )
    }
    const ContentMain = () => {
        return(
            <SelectWrapper>
                {selectedItem === "전체 배출 신청 현황" && 
                    (<>{<GetAllStts />}</>)
                }
                {selectedItem === "My 신청 현황" && 
                    <>{<GetMyStts />}</>
                    }
            </SelectWrapper>
        )
    }
    return(
        <MainLeftWrapper>
            <ContentTop />
            <ContentMain />
        </MainLeftWrapper>
    )
};

const MainLeftWrapper = styled.div`
    width: 48%;
    height: 444px;
    @media (max-width: 768px) {
        width: 95%;
        height: 100%;
    }
`;

const ContentTopWrapper = styled.nav`
    height: 50px;
    background-color: #0279C2;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    @media (max-width: 768px) {
        height: 36px;
    }
`;

const StyledBtn = styled.button`
    width: ${(props) => props.width || '0px'};
    height: 50px;
    margin-left: ${(props) => props.$marginLeft};
    border: none;
    border-right: solid white ${(props) => props.$borderRight || '0px'};
    border-left: solid white ${(props) => props.$borderLeft || '0px'};
    background-color: ${(props) => props.$clicked ? '#024598' : '#0279C2'};
    color: white;
    cursor: pointer;
    border-top-left-radius: ${(props) => props.$borderTopLeft ? '5px' : '0px'};
    border-top-right-radius: ${(props) => props.$borderTopRight ? '5px' : '0px'};
    font-weight: bold;
    font-size: ${(props) => props.fontSize === "sm"? '15px' : '20px'};
    @media (max-width: 768px) {
        font-size: ${(props) => props.fontSize === "sm"?  '10px': '14px'};
        height: 36px;
        width: ${(props) => props.alt === "1"? '37%' : '26%'};
    }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: ${(props) => props.height || '100%'};
  color: ${(props) => props.color || 'white'};
  display: flex;  
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    float: right;
    padding-right: 6px;
}
`;

const SelectWrapper = styled.div`
    height: 394px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.25);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

export default MainLeft;