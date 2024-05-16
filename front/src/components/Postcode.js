import React, { useState, useRef } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import styled from "styled-components";

const Postcode = ({onAddressChange}) => {
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 추가

  const completeHandler = (data) => {
    setRoadAddress(data.roadAddress);
    setIsOpen(false); // 추가
    onAddressChange(data.roadAddress, detailAddress)
  };

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 1000,
    },
    content: {
      margin: "auto",
      width: "500px",
      height: "600px",
      padding: "0",
      overflow: "hidden",
    },
  };

  // 검색 클릭
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 상세 주소검색 event
  const changeHandler = (e) => {
    onAddressChange(roadAddress, e.target.value);
  };

  const modalRef = useRef();

  return (
    <LabelWrapper $marginBottom="36px">
      <StyledLabel htmlFor="address">
        <StyledLabelTitle>
          <StyledP>주소</StyledP>
          <StyledBtn type="button" onClick={toggle}>
            주소찾기
          </StyledBtn>
        </StyledLabelTitle>
        <StyledInput 
            $marginBottom="24px"
            value={roadAddress} 
            readOnly 
            placeholder="주소" 
            onChange={changeHandler}
            required
            readonly
        />
        <StyledInput
          type="text"
          onChange={changeHandler}
          value={detailAddress}
          placeholder="상세 주소를 입력해주세요"
        />
      </StyledLabel>
      <div ref={modalRef} onClick={toggle} >
        <Modal
          isOpen={isOpen}
          ariaHideApp={false}
          style={customStyles}
        >
          <button onClick={toggle}>X</button>
          <DaumPostcode onComplete={completeHandler} height="100%" />
        </Modal>
      </div>
    </LabelWrapper>
  );
};

const LabelWrapper = styled.div`
    width: 86%;
    height: 192px;
    display:flex;
    justify-content: center;
    margin-bottom: ${(props) => props.$marginBottom};
`;
const StyledLabel = styled.label`
    width: 100%; 
    height: 48px;
    align-items: center;
`;
const StyledLabelTitle = styled.div`
  width: 100%;
  display:flex;
  margin-bottom: 24px;
`
const StyledP = styled.p`
    height: 48px;
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.$color || '#666666'};;
    margin-right: 10px;
    padding-top: ${(props) => props.$paddingTop};
    display: flex;
    align-items: center;
`;
const StyledBtn = styled.button`
    width: 128px;
    height: 48px;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 17px 13px 17px;
    border: none;
    background-color: #4DA3D5;
    color: white;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
    }
`;
const StyledInput = styled.input`
    width: calc(100% - 34px);
    height: 21px;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 17px 13px 17px;
    border: none;
    background-color: #F6F6F6;
    color: #666666;
    border-radius: 5px;
    margin-bottom: ${(props) => props.$marginBottom};
`;

export default Postcode;
