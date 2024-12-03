import { useState, useEffect, useCallback } from "react";
import "../styles/FalseStatus.css";
import QA from "./QA";
import MyButton from "../MyButton";
import { useNavigate, useParams } from "react-router-dom";
import { quizResultDetail, quizResult } from "../../api/Quiz";

//퀴즈 미응시된 상태(퀴즈 풀기기)
const FalseStatus = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [pages, setPages] = useState(0);
    const [lastPage, setLastPage] = useState(4);
    // 퀴즈 풀기 결과 저장
    const [result, setResult] = useState({});
    console.log("문제 풀이 답안 확인", result)


    const [currentQA, setCurrentQA] = useState(null);

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

    // 답변 선택 핸들러
    const onAnswerClick = useCallback((questionId, answerId) => {
        setResult((prev) => {
            if (prev[questionId] === answerId) {
                const { [questionId]: _, ...rest } = prev; // 동일한 답을 다시 클릭하면 제거
                return rest;
            }
            return {
                ...prev,
                [questionId]: answerId,
            };
        });
    }, []);

    const onPreviousPage = () => {
        setPages((prev) => Math.max(prev - 1, 0));
    };

    const onNextPage = () => {
        setPages((prev) => Math.min(prev + 1, lastPage));
    };

    const onExit = () => {
        navigate("/note");
    };

    const onSubmit = async () => {
        if (Object.keys(result).length < 5) { // 답안 개수 확인
            alert("답안이 모두 선택되지 않았습니다.");
            return;
        }
    
        try {
            console.log("최종 선택 결과:", result);
    
            // quizResult 비동기 호출
            const quiz_result = await quizResult(id, result);
    
            // 결과를 state로 전달
            navigate("/scorepage", { state: { quiz_result } });
        } catch (error) {
            console.error("Failed to submit quiz result:", error);
            alert("결과를 제출하는 중 오류가 발생했습니다.");
        }
    };
    

    const answers = currentQA
        ? [
            {
                id: 1,
                answer: currentQA.option1 || null,
                selected: currentQA.selectedOption || null,
                correct: currentQA.selectedOption || null
            },
            {
                id: 2,
                answer: currentQA.option2 || null,
                selected: currentQA.selectedOption || null,
                correct: currentQA.selectedOption || null
            },
            {
                id: 3,
                answer: currentQA.option3 || null,
                selected: currentQA.selectedOption || null,
                correct: currentQA.selectedOption || null
            },
            {
                id: 4,
                answer: currentQA.option4 || null,
                selected: currentQA.selectedOption || null,
                correct: currentQA.selectedOption || null
            },
        ]
        : [];

    return (
        <div className="FalseStatus">
            <div className="header">
                <div className="title">
                    {currentQA ? currentQA.questionText : "Loading..."}
                </div>
                <div className="page_section">
                    퀴즈 풀기 <br /> {pages + 1} / {lastPage + 1}
                </div>
            </div>
            <div className="scroll_section">
                <div className="qa_section">
                    {currentQA && (
                        <QA
                            currentQA={currentQA}
                            answers={answers}
                            selectedAnswer={result[currentQA.questionId]}
                            onAnswerClick={onAnswerClick}
                            status={true}
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
                            <MyButton onClick={onSubmit} type={"on"} text={"제출"} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FalseStatus;
