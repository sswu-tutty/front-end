import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MyButton from "../MyButton";
import QA from "./QA";
import { useState } from "react";
import { quizResultDetail } from "../../api/Quiz";

//퀴즈 응시된 상태(결과 확인)
const TrueStatus = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [pages, setPages] = useState(0);
    const [lastPage, setLastPage] = useState(4);

    console.log("data",data);
    // 퀴즈 풀기 결과 저장
    const [result, setResult] = useState({}); 

    const [currentQA, setCurrentQA] = useState(null);

    //퀴즈 결과 상세조회
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

    useEffect(() => {
        if (data.questionResults && data.questionResults.length > 0) {
            setCurrentQA(data.questionResults[pages]);
        }
    }, [pages, data]);

    const onPreviousPage = () => {
        setPages((prev) => Math.max(prev - 1, 0));
    };

    const onNextPage = () => {
        setPages((prev) => Math.min(prev + 1, lastPage));
    };


    const onExit = () => {
        navigate("/note")
    }

    const onOK = () => {
        navigate("/note");
    }

    const answers = currentQA
        ? [
            {
                id: 1,
                answer: currentQA.option1 || null,
                selected: currentQA.selectedOption || null,
                correct: currentQA.correctOption || null
            },
            {
                id: 2,
                answer: currentQA.option2 || null,
                selected: currentQA.selectedOption || null,
                correct: currentQA.correctOption || null
            },
            {
                id: 3,
                answer: currentQA.option3 || null,
                selected: currentQA.selectedOption || null,
                correct: currentQA.correctOption || null
            },
            {
                id: 4,
                answer: currentQA.option4 || null,
                selected: currentQA.selectedOption || null,
                correct: currentQA.correctOption || null
            },
        ]
        : [];

    return (
        <div style={{}}>
            <div className="header">
                <div className="title">
                    
                </div>
                <div className="page_section">
                    문제 확인 <br /> {pages + 1} / {lastPage + 1}
                </div>
            </div>
            <div className="scroll_section">
                <div className="qa_section">
                    {currentQA && (
                        <QA currentQA={currentQA}
                            answers={answers}
                            selectedAnswer={result[currentQA.questionId]}
                            hasAttempted={data.hasAttempted}
                        />
                    )}
                </div>
                <div className="page_btn">
                    <div className="left_btn">
                        {pages > 0 ? (
                            <MyButton onClick={onPreviousPage} type={"off"} text={"이전"} />
                        ) : (
                            <MyButton onClick={onExit} type={"off"} text={"나가기"} />
                        )}
                    </div>
                    <div className="right_btn">
                        {pages < lastPage ? (
                            <MyButton onClick={onNextPage} type={"on"} text={"다음"} />
                        ) : (
                            <MyButton onClick={onOK} type={"on"} text={"확인"} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrueStatus;