import React, { useState, useRef } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";

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
    },
    content: {
      left: "0",
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
    setDetailAddress(e.target.value);
    onAddressChange(roadAddress, e.target.value);
  };

  const modalRef = useRef();

  return (
    <div>
      <label htmlFor="address">
        주소
        <button type="button" onClick={toggle}>
          주소찾기
        </button>
        <input 
            value={roadAddress} 
            readOnly 
            placeholder="주소" 
            required 
            onChange={changeHandler}
        />
        <input
          type="text"
          onChange={changeHandler}
          value={detailAddress}
          placeholder="상세 주소를 입력해주세요"
        />
      </label>
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
    </div>
  );
};

export default Postcode;
