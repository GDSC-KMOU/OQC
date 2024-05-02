import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Postcode from '../components/Postcode';

function ImageUploadComponent() {
    const [image, setImage] = useState(null);
    const [options, setOptions] = useState([]);
    const [resValue, setResValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [addressObj, setAddressObj] = useState({ 
        address: '', 
        detailAddress: '' 
    });
    const token = localStorage.getItem('token');

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);
        
        try {
            const response = await axios.post('http://localhost:8080/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (Object.keys(response.data).length === 0) {
                alert('취급하지 않는 폐기물입니다');
                return;
            }
            const firstKey = Object.keys(response.data)[0];
            if (response.data[firstKey]) {
                setResValue(firstKey);
                const parsedOptions = response.data[firstKey].map(item => {
                    const description = Object.keys(item)[0];
                    const price = item[description];
                    return { description, price };
                });
                setOptions(parsedOptions);
                setStep(2);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('이미지 잘못 올라감');
        }
    };

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
        setStep(3);
    };

    const handleAddressChange = (address, detailAddress) => {
        setAddressObj({
            address: address,
            detailAddress: detailAddress,
        });
    };

    const handleSubmitPost = async () => {
        const formData = new FormData();
        formData.append('address', `${addressObj.address} ${addressObj.detailAddress}`);
        formData.append('image', image);
        formData.append('selectedOption', JSON.parse(selectedOption).price);
        formData.append('resValue', resValue);
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인해라');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/selection', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('포스트 생성 성공');
            navigate('/');
        } catch (error) {
            alert(`포스팅 에러: ${error.response ? error.response.data.message : '에러'}`);
        }
    };

    if(!token){
        return ("로그인이 필요한 서비스입니다.")
    }
    return (
        <div>
            {step === 1 && (
                <>
                    <input type="file" onChange={e => setImage(e.target.files[0])} />
                    {image && <button onClick={handleImageUpload}>이미지 업로드</button>}
                </>
            )}
            {step === 2 && options.length > 0 && (
                <>
                    <p>폐기물 유형: {resValue}</p>
                    <select onChange={handleOptionSelect} value={selectedOption}>
                        <option value="">선택해주세요</option>
                        {options.map((option, index) => (
                            <option key={index} value={JSON.stringify(option)}>{`${option.description}: ${option.price}원`}</option>
                        ))}
                    </select>
                </>
            )}
            {step === 3 && (
                <>
                <form onSubmit={handleSubmitPost}>
                    <Postcode onAddressChange={handleAddressChange} />
                    <button type='submit'>신청</button>
                </form>
                </>
            )}
        </div>
    );
}

export default ImageUploadComponent;
