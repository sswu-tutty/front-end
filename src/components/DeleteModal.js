import { useEffect } from "react";
import "./styles/DeleteModal.css";
import { summaryDelete } from "../api/Summary";
import { quizDelete } from "../api/Quiz";

const DeleteModal = ({ isModalOpen, onClose, noteId, onDeleteSuccess, status }) => {
    
    const handleDelete = async () => {
        try {
            if(status == "요약") {
                await summaryDelete(noteId); // 삭제 API 호출
            } else {
                await quizDelete(noteId);
            }
            
            alert("삭제 되었습니다.");
            onClose(); // 모달 닫기
            if (onDeleteSuccess) {
                onDeleteSuccess(); // 부모 컴포넌트에서 리스트 업데이트
            }
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(); // 모달 닫기
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal" onClick={handleBackgroundClick}>
                    <div className="modal_content" onClick={handleDelete}>
                        삭제
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
