import React from "react";
import "../styles/QA.css";

const QA = ({ currentQA, answers, selectedAnswer, onAnswerClick }) => {
    return (
        <div className="QA">
            <div className="question_section">
                <div className="question">{currentQA.questionText}</div>
            </div>
            <div className="answer_section">
                {answers.map((it) => (
                    <div
                        key={it.id}
                        className={`answer ${selectedAnswer === it.id ? "active" : ""}`}
                        onClick={() => onAnswerClick(currentQA.questionId, it.id)}
                    >
                        <div className="answer_num">{it.id}.</div>
                        <div className="answer_text">{it.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QA;
