import React from 'react';
import './styles/ImgModal.css';

const Modal = ({ isOpen, toggleModal, quizOption, setQuizOption, summaryOption, setSummaryOption, handleConfirm }) => {
    if (!isOpen) return null; // 모달이 열려 있지 않으면 null을 반환하여 렌더링하지 않음

    return (
        <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>노트 생성 옵션</h3>
                <div className='cb'>
                    <label>
                        <input
                            type="checkbox"
                            checked={quizOption}
                            onChange={() => setQuizOption(!quizOption)}
                        />
                        퀴즈 생성
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={summaryOption}
                            onChange={() => setSummaryOption(!summaryOption)}
                        />
                        요약본 생성
                    </label>
                </div>

                <button className="confirm-button" onClick={handleConfirm}>확인</button>
            </div>
        </div>
    );
};

export default Modal;
