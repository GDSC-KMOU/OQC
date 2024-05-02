import React from 'react';
import RightImg from '../assets/RightImg.png';
import YDImg from '../assets/영도구 이미지.png';
 
const LeftText = () => {
    return(
        <div id='LeftText'>
            <div>Youngdo-gu Waste Disposal System</div>
            <div>영도구 폐기물 처리 시스템</div>
        </div>
    )
}

const RightImgComponent = () => {
    return(
        <img src={RightImg} alt="" />
    )
}


const Top = () => {
    return(
        <div id='wrapper'>
            <img src={YDImg} alt="영도구 이미지" />
            <LeftText />
            <RightImgComponent />
        </div>
    )
};

export default Top;