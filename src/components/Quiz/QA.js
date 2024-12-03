import React from "react";
import "../styles/QA.css";

const QA = ({ currentQA, answers, selectedAnswer, onAnswerClick, correct, hasAttempted }) => {

    console.log("hasAttempted", hasAttempted)
    // Helper function to calculate the classes for each answer
    const getAnswerClass = (it) => {
        if (!correct) {
            if (it.id === it.selected) {
                return "answer active"
            } else if (it.id === it.correct) {
                return "answer false"
            }
        } else {
            if (it.id === it.selected) {
                return "answer active"
            }
        }
        return "answer"
    };

    const handleClick = (questionId, answerId) => {
        onAnswerClick(questionId, answerId);
    };

    return (
        <div className="QA">
            <div className="question_section">
                <div className="question">
                    {currentQA && currentQA.questionText ? currentQA.questionText : "질문이 없습니다"}
                </div>
            </div>
            <div className="answer_section">
                {answers.map((it) => (
                    <div
                        key={it.id}
                        className={getAnswerClass(it)} // Apply the class based on the helper function
                        onClick={() => handleClick(currentQA.questionId, it.id)}
                    >
                        <div className="answer_num">{it.id}.</div>
                        <div className="answer_text">
                            {it.answer ? it.answer : "답변이 없습니다"}
                        </div>
                    </div>
                ))}
            </div>
            <div className="correct-answer-section">
                {!hasAttempted ? null : `정답: ${currentQA.correctOption}`}
            </div>
        </div>
    );
};

export default QA;
