import "../styles/NoteItem.css";
import BookImg from "../../assets/book.png";
import Kebab from "../../assets/kebab.png";
import Like from "../../assets/like.png";
import UnLike from "../../assets/unlike.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { summaryTotalList, summaryBookmark } from "../../api/Summary";


// correct: false
// correctOption: 2
// option1: "도메인 이름을 구매하는 것"\
// option2: "도메인 이름을 IP 주소로 변환하는 것"
// option3: "웹사이트의 보안을 강화하는 것"
// option4: "인터넷 속도를 향상시키는 것"
// questionId: 26
// questionText: "도메인 이름 시스템(DNS)의 역할은 무엇인가요?"
// selectedOption: null

const NoteItem = ({ id, title, content, liked, setData, handleLike }) => {
    const [like, setLike] = useState(liked); // 초기 liked 값으로 설정
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/summaryinquiry/${id}`);
    };

    const handleKebab = () => {
        setIsModalOpen(true);
    };

    
    
    const handleDeleteSuccess = async () => {
        setIsModalOpen(false);
        const result = await summaryTotalList();
        setData(result);

    };

    return (
        <div className="NoteItem">
            <img onClick={goDetail} className="book_section" src={BookImg} alt="Book" />
            <div onClick={goDetail} className="title_section">
                <div className="main_title">{title}</div>
                <div className="sub_title">{content.slice(0, 35)}</div>
            </div>
            <div className="etc_section">
                <img className="on_kebab" onClick={handleKebab} src={Kebab} alt="Options" />
                <img
                    className="on_heart"
                    onClick={handleLike}
                    src={like ? Like : UnLike}
                    alt="Like"
                />
            </div>
            <DeleteModal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                noteId={id}
                onDeleteSuccess={handleDeleteSuccess} 
                status="요약"
            />
        </div>
    );
};

export default NoteItem;
