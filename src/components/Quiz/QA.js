import { useEffect, useState } from "react";
import "../styles/QA.css";

const AnswerComponent = ({ text, id, checking }) => {
    const [active, setActive] = useState(false);

    console.log("checking: " + JSON.stringify(checking, null, 2));
    console.log("checking" + (checking?.correct || "undefined"));

    useEffect(() => {
        setActive(false);
    }, [text]);

    // 조건에 따라 클래스 이름을 설정
    const getAnswerClass = () => {
        if (checking === undefined) {
            return active ? "answer active" : "answer"; // checking이 undefined일 때 클릭으로 active 토글
        }

        // checking이 정의되어 있고, correct가 있는지 확인
        if (checking.correct === id && checking.answer === id) {
            return "answer active"; // 답이 맞는 경우(답에 해당하는 answer을 answer active로 설정)
        } else if (checking.correct === id) {
            return "answer active"; // 정답인 경우
        } else if (checking.answers === id) {
            console.log("사용자가 답한 id" + id);
            return "answer false"; // 사용자가 선택한 답이 틀린 경우
        }
        return "answer"; // 기본 스타일
    };

    const handleClick = () => {
        if (checking === undefined) {
            setActive(!active); // checking이 undefined일 때만 active 상태 토글
        }
    };

    return (
        <div className={getAnswerClass()} onClick={handleClick}>
            <div className="answer_num">
                {id}.
            </div>
            <div className="answer_text">
                {text}
            </div>
        </div>
    );
};

const QA = ({ question, answers, checking }) => {
    return (
        <div className="QA">
            <div className="question_section">
                <div className="question">
                    {question.text}
                </div>
            </div>

            <div className="answer_section">
                {answers.map((it) => (
                    <AnswerComponent key={it.id} {...it} checking={checking} />
                ))}
            </div>
        </div>
    );
};

export default QA;
