import "../styles/NoteItem.css";
import BookImg from "../../assets/book.png";
import Kebab from "../../assets/kebab.png"
import Like from "../../assets/like.png";
import UnLike from "../../assets/unlike.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";

const NoteItem = ({ id, title, content }) => {
    const [like, setLike] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/summaryinquiry/${id}`);
    }

    const handleKebab = () => {
        setIsModalOpen(true);
    }

    const handleLike = () => {
        setLike(!like);
    }

    const onClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="NoteItem">
            <img onClick={goDetail} className="book_section" src={BookImg} />
            <div onClick={goDetail} className="title_section">
                <div className="main_title">
                    {title}
                </div>
                <div className="sub_title">
                    {content}
                </div>
            </div>
            <div className="etc_section">
                <img className="on_kebab" onClick={handleKebab} src={Kebab} />
                <img className="on_heart" onClick={handleLike} src={like ? Like : UnLike} />
            </div>
            <DeleteModal isModalOpen={isModalOpen} onClose={onClose} />
        </div>
    )
}

export default NoteItem;