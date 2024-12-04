import "../styles/QuizItem.css";
import QuizImg from "../../assets/quiz.png";
import Kebab from "../../assets/kebab.png"
import Like from "../../assets/like.png";
import UnLike from "../../assets/unlike.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { quizTotalList, quizBookmark } from "../../api/Quiz";

const QuizItem = ({ quizId, firstQuestionText, totalQuestions, correctAnswers, hasAttempted, liked, setData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    //상세조회 페이지 이동
    const goDetail = () => {
        hasAttempted ? navigate(`/resultcheck/${quizId}`) : navigate(`/quizinquiry/${quizId}`);
    }

    const handleKebab = () => {
        setIsModalOpen(true);
    }

    const onClose = () => {
        setIsModalOpen(false)
    }

    //노트 삭제시 전체 리스트 다시 조회
    const handleDeleteSuccess = async () => {
        setIsModalOpen(false);
        const result = await quizTotalList();
        setData(result);
    };

    const handleBookmark = () => {
        console.log(quizId);
        quizBookmark(quizId);
    }

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
                <img className="on_kebab" onClick={handleBookmark} src={liked ? Like : UnLike} />
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