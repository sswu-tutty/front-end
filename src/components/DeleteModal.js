import { useEffect } from "react";
import "./styles/DeleteModal.css";
import { summaryDelete } from "../api/Summary";

const DeleteModal = ({ isModalOpen, onClose, noteId }) => {

    
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        } else {
            //삭제 api연동
            summaryDelete(noteId);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal" onClick={handleBackgroundClick}>
                    <div className="modal_content">
                        삭제
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
