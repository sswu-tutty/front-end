import FooterBar from "../components/FooterBar";

import React, { useState } from 'react';
import uploadIcon from '../assets/upload_img.png';
import Modal from '../components/ImgModal';

const ImgUpload = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizOption, setQuizOption] = useState(false);
    const [summaryOption, setSummaryOption] = useState(false);

    // 모달 열기/닫기 함수
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // 확인 버튼 클릭 시 선택된 옵션 처리
    const handleConfirm = () => {
        // 선택된 옵션을 처리
        console.log("퀴즈 생성:", quizOption);
        console.log("요약본 생성:", summaryOption);
        // 모달 닫기
        setIsModalOpen(false);
    };

    return (
        <div className="Image_wrap container">
            <div className="upload-area">
                <img src={uploadIcon} alt="Upload" className="upload-icon" />
                <p>이미지 파일을 업로드하세요!</p>
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

            <FooterBar />

        </div>
    );
};

export default ImgUpload;
