import React from 'react';

const MainRight = () => {
    const ContentTop = () => {
        return(
            <div>
                <div>폐기물 종류</div>
                <ul>
                    <li>밥상</li>
                    <li>서랍장</li>
                    <li>소파</li>
                    <li>의자</li>
                    <li>장롱</li>
                    <li>책상</li>
                </ul>
            </div>
        )
    }
    const ContentBottom = () => {
        return(
            <div>
                <div>고객지원안내</div>
                <div>
                    <div>불편이 생긴 경우 고객센터로 문의해주시길 바랍니다</div>
                    <div>051-000-0000</div>
                </div>
            </div>
        )
    }
    return(
        <div id='MainRight'>
            <ContentTop />
            <ContentBottom />
        </div>
    )
};

export default MainRight;