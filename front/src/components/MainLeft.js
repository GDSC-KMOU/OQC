import React, {useState} from 'react';
import GetAllStts from './GetAllStts';
import GetMyStts from './GetMyStts';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainLeftWrapper = styled.div`
    width: 48%;
    height: 444px;
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
`;

const StyledBtn = styled.button`
    width: ${(props) => props.width || '0px'};
    height: 50px;
    margin-left: ${(props) => props.marginLeft};
    border: none;
    border-right: solid white ${(props) => props.borderRight || '0px'};
    border-left: solid white ${(props) => props.borderLeft || '0px'};
    background-color: ${(props) => props.clicked ? '#024598' : '#0279C2'};
    color: white;
    cursor: pointer;
    border-top-left-radius: ${(props) => props.borderTopLeft || '0px'};
    border-top-right-radius: ${(props) => props.borderTopRight || '0px'};
    font-weight: bold;
    font-size: ${(props) => props.fontSize || '20px'};
`

const StyledLink = styled(Link)`
  text-decoration: none;
  height: ${(props) => props.height || '100%'};
  color: ${(props) => props.color || 'white'};
  display: flex;  
  justify-content: center;
  align-items: center;
`;

const SelectWrapper = styled.div`
    height: 394px;
    border: solid rgb(207, 207, 207) 1px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const MainLeft = () => {
    const [selectedItem, setSelectedItem] = useState("전체 배출 신청 현황");
    const [isClicked, setIsClicked] = useState(false);

    const clickHandler = (item) => {
        setSelectedItem(item);
        setIsClicked(true);
    }

    const ContentTop = () => {
        return(
            <ContentTopWrapper>
                <StyledBtn width="221px" borderTopLeft="5px" borderRight="1px" clicked={selectedItem === "전체 배출 신청 현황"} onClick={() => clickHandler("전체 배출 신청 현황")}>전체 배출 신청 현황</StyledBtn> 
                <StyledBtn width="162px" borderRight="1px" clicked={selectedItem === "My 신청 현황"} onClick={() => clickHandler("My 신청 현황")}>My 신청 현황</StyledBtn>
                <StyledBtn width="90px" borderTopRight="5px" marginLeft="auto" fontSize="15px">
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

export default MainLeft;