import React, {useState} from 'react';
import GetAllStts from './GetAllStts';
import GetMyStts from './GetMyStts';

const MainLeft = () => {
    const [selectedItem, setSelectedItem] = useState("전체 배출 신청 현황");
    const clickHandler = (item) => {
        setSelectedItem(item);
    }

    const ContentTop = () => {
        return(
            <nav>
                <button onClick={() => clickHandler("전체 배출 신청 현황")}>전체 배출 신청 현황</button> 
                <button onClick={() => clickHandler("My 신청 현황")}>My 신청 현황</button>
                <button>+더보기</button>
            </nav>
        )
    }
    const ContentMain = () => {
        return(
            <div>
                {selectedItem === "전체 배출 신청 현황" && 
                    (<div>{<GetAllStts />}</div>)
                }
                {selectedItem === "My 신청 현황" && 
                    <div>{<GetMyStts />}</div>
                    }
            </div>
        )
    }
    return(
        <div id='MainLeft'>
            <ContentTop />
            <ContentMain />
        </div>
    )
};

export default MainLeft;