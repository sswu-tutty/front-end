import "./styles/DeleteModal.css";

const DeleteModal = ({ isModalOpen, onClose }) => {
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
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
