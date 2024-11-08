import "../styles/QuizItem.css";
import QuizImg from "../../assets/quiz.png";
import Kebab from "../../assets/kebab.png"
import Like from "../../assets/like.png";
import UnLike from "../../assets/unlike.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";

const QuizItem = ({ id, title, status, correct }) => {
    const [like, setLike] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const navigate = useNavigate();

    //여기 변경
    const goDetail = () => {
        status ? navigate(`/resultcheck/${id}`) : navigate(`/quizinquiry/${id}`);
    }

    const handleKebab = () => {
        setIsModalOpen(true);
    }

    const onClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="QuizItem">
            <img onClick={goDetail} className="quiz_section" src={QuizImg} />
            <div onClick={goDetail} className="title_section">
                <div className="main_title">
                    {title}
                </div>
                <div className={status ? "sub_title_true" : "sub_title_false"}>
                    {correct === null ? "미응시" : correct}
                </div>
            </div>
            <div className="etc_section">
                <img className="on_heart" onClick={handleKebab} src={Kebab} />
                <img className="on_kebab" onClick={() => setLike(!like)} src={like ? Like : UnLike} />
            </div>
            <DeleteModal isModalOpen={isModalOpen} onClose={onClose} />
        </div>
    )
}

export default QuizItem;