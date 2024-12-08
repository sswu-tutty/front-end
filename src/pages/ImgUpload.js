import FooterBar from "../components/FooterBar";
import axios from 'axios';
import React, { useState, useRef } from 'react';
import uploadIcon from '../assets/upload_img.png';
import Modal from '../components/ImgModal';
import TextScreen from '../components/TextScreen';

const ImgUpload = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizOption, setQuizOption] = useState(false);
    const [summaryOption, setSummaryOption] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showTextScreen, setShowTextScreen] = useState(false);
    const [textData, setTextData] = useState("");
    const fileInputRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);  // 선택된 파일 상태 추가

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleConfirm = async () => {

        // 로딩 상태로 전환
        setIsLoading(true);

        if (selectedFile) {
            const base64Image = await convertFileToBase64(selectedFile);
            await callOCRApi(base64Image);
        }

        // 2초 후 로딩 해제 및 텍스트 화면으로 전환
        setTimeout(() => {
            setIsLoading(false);
            setShowTextScreen(true);
        }, 2000);
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const callOCRApi = async (base64Image) => {
        const apiUrl = 'https://s9uo8hlhlf.apigw.ntruss.com/custom/v1/36012/f9e520a521f592693af176d36451426be6d8385580b367ef22bb63e6f3297dd8/general';
        const secretKey = 'VFZKdnByanlUZFJsa0tVR1JsUUhwS0daYnFrTkF5WkY=';

        try {
            const response = await axios.post(
                apiUrl,
                {
                    images: [
                        {
                            format: 'jpg',
                            name: 'upload',
                            data: base64Image,
                            url: null
                        }
                    ],
                    lang: 'ko',
                    requestId: 'string',
                    resultType: 'string',
                    timestamp: new Date().getTime(),
                    version: 'V1'
                },
                {
                    headers: {
                        'X-OCR-SECRET': secretKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data && response.data.images) {
                const inferText = response.data.images
                    .flatMap(image => image.fields || [])
                    .map(field => field.inferText)
                    .join('\n');

                setTextData(inferText);
                setShowTextScreen(true);
                console.log(inferText)
            } else {
                throw new Error('OCR 결과가 유효하지 않습니다.');
            }
        } catch (error) {
            console.error('OCR 요청 실패:', error.response?.data || error.message);
            alert('OCR 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                // 이미지 파일인 경우
                setImageSrc(URL.createObjectURL(file));
                setFileName('');
                setSelectedFile(file);  // 선택된 파일을 상태로 저장
            } else {
                // 이미지가 아닌 다른 파일일 경우
                setImageSrc(null);
                setFileName(file.name);
                setSelectedFile(file);  // 선택된 파일을 상태로 저장
            }
        }
    };

    return (
        <div className="Image_wrap container">
            {isLoading ? (
                <div className="loading-screen">
                    <div className="spinner"></div>
                </div>
            ) : showTextScreen ? (
                <TextScreen
                    text={textData}
                    quizOption={quizOption}
                    summaryOption={summaryOption}
                />
            ) : (
                <>
                    <div className="upload-area" onClick={handleUploadClick} style={{ cursor: 'pointer' }}>
                        <input
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            type="file"
                            onChange={handleFileChange}
                        />
                        <div className="image-preview">
                            {imageSrc ? (
                                <img src={imageSrc} alt="Uploaded" className="uploaded-icon" />
                            ) : (
                                !fileName && <img src={uploadIcon} alt="Upload Icon" className="upload-icon default-icon" />
                            )}
                        </div>
                        {fileName ? (
                            <p className="file-name">{fileName}</p>
                        ) : (
                            !imageSrc && !fileName && <p>이미지 파일을 업로드하세요!</p>
                        )}
                    </div>

                    <button className="upload-button" onClick={toggleModal}>이미지 업로드하기</button>

                    <Modal
                        isOpen={isModalOpen}
                        toggleModal={toggleModal}
                        quizOption={quizOption}
                        setQuizOption={setQuizOption}
                        summaryOption={summaryOption}
                        setSummaryOption={setSummaryOption}
                        handleConfirm={handleConfirm}
                    />
                </>
            )}
            <FooterBar />
        </div>
    );
};

export default ImgUpload;
