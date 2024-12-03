import "../styles/QuizItem.css";
import QuizImg from "../../assets/quiz.png";
import Kebab from "../../assets/kebab.png"
import Like from "../../assets/like.png";
import UnLike from "../../assets/unlike.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { quizTotalList } from "../../api/Quiz";

const QuizItem = ({ quizId, firstQuestionText, totalQuestions, correctAnswers, hasAttempted, liked, setData }) => {
    const [like, setLike] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const navigate = useNavigate();

    //여기 변경
    const goDetail = () => {
        hasAttempted ? navigate(`/resultcheck/${quizId}`) : navigate(`/quizinquiry/${quizId}`);
    }

    const handleKebab = () => {
        setIsModalOpen(true);
    }

    const onClose = () => {
        setIsModalOpen(false)
    }

    const handleDeleteSuccess = async () => {
        setIsModalOpen(false);
        const result = await quizTotalList();
        setData(result);

    };

    return (
        <div className="QuizItem">
            <img onClick={goDetail} className="quiz_section" src={QuizImg} />
            <div onClick={goDetail} className="title_section">
                <div className="main_title">
                    {firstQuestionText == null ? "제목" : firstQuestionText}
                </div>
                <div className={hasAttempted ? "sub_title_true" : "sub_title_false"}>
                    {hasAttempted === false ? "미응시" : (correctAnswers / totalQuestions)*100 + "점"}
                </div>
            </div>
            <div className="etc_section">
                <img className="on_heart" onClick={handleKebab} src={Kebab} />
                <img className="on_kebab" onClick={() => setLike(!like)} src={like ? Like : UnLike} />
            </div>
            <DeleteModal
                isModalOpen={isModalOpen}
                onClose={onClose}
                noteId={quizId}
                onDeleteSuccess={handleDeleteSuccess}
                status="퀴즈"
            />
        </div>
    )
}

export default QuizItem;