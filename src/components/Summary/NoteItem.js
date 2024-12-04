import "../styles/NoteItem.css";
import BookImg from "../../assets/book.png";
import Kebab from "../../assets/kebab.png";
import Like from "../../assets/like.png";
import UnLike from "../../assets/unlike.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { summaryTotalList, summaryBookmark } from "../../api/Summary";


const NoteItem = ({ id, title, content, liked, setData, handleLike, status, paperTitle }) => {
    const [like, setLike] = useState(liked); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const goDetail = () => {
        if(status === "요약") {
            navigate(`/summaryinquiry/${id}`);
        } else {
            console.log("논문")
            navigate(`/paperinquiry/${id}`);
        }
        
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
                <div className="main_title">{status === "요약" ? title : paperTitle}</div>
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
