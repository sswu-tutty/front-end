import "./styles/DeleteModal.css";

const DeleteModal = ({ isModalOpen, onClose }) => {
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        } else (
            alert("삭제 하시겠습니까?")
        )
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
