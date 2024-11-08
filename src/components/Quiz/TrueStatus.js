import { useNavigate } from "react-router-dom";
import MyButton from "../MyButton";
import QA from "./QA";
import { useState } from "react";
import { qamockdata } from "../../pages/QuizInquiry";

const resultCheck = [
    {
        id: 1,
        correct: 1,
        answers: 1
    },
    {
        id: 2,
        correct: 1,
        answers: 2
    },
    {
        id: 3,
        correct: 4,
        answers: 2
    },
    {
        id: 4,
        correct: 1,
        answers: 1
    },
]


const TrueStatus =() => {
    const [pages, setPages] = useState(1); //현재 페이지수 & 문제 갯수

    const lastPage = qamockdata.length;

    const navigate = useNavigate();

    const currentQA = qamockdata.find((qa) => qa.question.id === pages);

    const checking = resultCheck.find((it) => it.id === pages);

    const onPreviousPage = () => {
        if (pages > 1) {
            setPages(pages - 1);
        }
    }

    const onNextPage = () => {
        if (pages < lastPage) {
            setPages(pages + 1);
        }
    }

    const onExit = () => {
        navigate("/note")
    }

    const onOK = () => {
        navigate("/note");
    }

    return (
        <div style={{}}>
            <div className="header">
                <div className="title">
                    인코더와 디코더의 개념
                </div>
                <div className="page_section">
                 문제 확인 <br/> {pages} / {qamockdata.length}
                </div>
            </div>
            <div className="scroll_section">
                <div className="qa_section">
                    {currentQA && (
                        <QA checking={checking} question={currentQA.question} answers={currentQA.answers} />
                    )}
                </div>
                <div className="page_btn">
                    <div className="left_btn">
                        {pages > 1 ? (
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