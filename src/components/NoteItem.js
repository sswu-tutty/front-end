import "./styles/NoteItem.css";
import BookImg from "../assets/book.png";
import Kebab from "../assets/kebab.png"
import Like from "../assets/like.png";
import UnLike from "../assets/unlike.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteItem = ({id}) => {
    const [like, setLike] = useState(true);
    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`summaryinquiry/${id}`);
    }

    return (
        <div className="NoteItem"> 
            <img onClick={goDetail} className="book_section" src={BookImg} />
            <div onClick={goDetail} className="title_section">
                <div className="main_title">
                    인코더와 디코더의 개념
                </div>
                <div className="sub_title">
                    트랜스포머 모델은 인코더, 디코더 기반
                </div>
            </div>
            <div className="etc_section">
                <img src={Kebab} />
                <img onClick={() => setLike(!like)} src={ like ? Like : UnLike} />
            </div>
        </div>
    )
}

export default NoteItem;