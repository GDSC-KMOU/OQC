import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

function DaumPost({ setAddressObj }) {
    const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        let localAddress = data.sido + ' ' + data.sigungu;
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress = fullAddress.replace(localAddress, '');
            setAddressObj({
                areaAddress: localAddress,
                townAddress: fullAddress + (extraAddress !== '' ? ` (${extraAddress})` : '')
            });
        }
    };

    return (
        <button type="button" onClick={() => open({ onComplete: handleComplete })}>
            주소찾기
        </button>
    );
}

export default DaumPost;
