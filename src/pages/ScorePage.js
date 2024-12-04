import MyButton from "../components/MyButton";
import LogoImg from "../assets/logo_img.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../components/styles/ScorePage.css";
import { quizResultDetail } from "../api/Quiz";

const ScorePage = () => {
    const[data, setData] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const CheckResult = () => {
        navigate(`/resultcheck/${id}`)
    }

    useEffect(() => {
        const fetchQuizResultDetail = async () => {
            try {
                const result = await quizResultDetail(id);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch quiz list:", error);
            }
        };

        fetchQuizResultDetail();
    }, [id]);

    return (
        <div className="ScorePage">
            <div className="header_title">
                <div className="score_title">
                    채점결과
                </div>
            </div>
            <div className="result_section">
                <img className="logo_img" src={LogoImg} alt="logo" />
                <div className="concept_title">인코더와 디코더의 개념 <br /> 채점 결과</div>
                <div className="score">{(data.correctCount / data.totalQuestions)*100 +"점"|| ""}</div>
                <div onClick={CheckResult} className="quiz_check">
                    <span>문제 확인하기</span>
                </div>
                <div onClick={() => { navigate("/note") }}>
                    <MyButton type={"on"} text={"확인"} />
                </div>
            </div>
        </div>
    );
};

export default ScorePage;
