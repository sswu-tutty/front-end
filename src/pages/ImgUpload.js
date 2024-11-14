import FooterBar from "../components/FooterBar";

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


    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                // 이미지 파일이면 미리보기로 표시
                setImageSrc(URL.createObjectURL(file));
                setFileName(''); // 파일 이름 초기화
            } else {
                // 이미지가 아닌 파일이면 파일 이름만 표시
                setImageSrc(null);
                setFileName(file.name);
            }
        }
    };


    // 모달 열기/닫기 함수
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 확인 버튼 클릭 시 선택된 옵션 처리
    const handleConfirm = () => {

        // 선택된 옵션에 따라 텍스트 데이터를 생성
        const data = `
            ${quizOption ? "퀴즈 생성 옵션이 선택되었습니다.\n" : ""}
            ${summaryOption ? "요약본 생성 옵션이 선택되었습니다.\n" : ""}
        `;

        // 텍스트 데이터를 설정하고 로딩 상태로 전환
        setTextData(data);
        setIsLoading(true);

        // 2초 후 로딩 해제 및 텍스트 화면으로 전환
        setTimeout(() => {
            setIsLoading(false);
            setShowTextScreen(true);
        }, 2000);
    };

    return (
        <div className="Image_wrap container">

            {isLoading ? (
                // 로딩 화면
                <div className="loading-screen">
                    <div className="spinner"></div>
                </div>
            ) : showTextScreen ? (
                <TextScreen text={textData} />
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
                            {/* 이미지 파일일 때만 미리보기 표시 */}
                            {imageSrc ? (
                                <img src={imageSrc} alt="Uploaded" className="uploaded-icon" />
                            ) : (
                                // 이미지가 아닌 파일일 경우 기본 아이콘은 숨기고 파일 이름만 표시
                                !fileName && <img src={uploadIcon} alt="Upload Icon" className="upload-icon default-icon" />
                            )}
                        </div>
                        {/* 파일 이름이 있으면 파일 이름만 표시 */}
                        {fileName ? (
                            <p className="file-name">{fileName}</p>
                        ) : (
                            // 파일 이름이 없고 기본 아이콘만 있을 경우 텍스트 표시
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
