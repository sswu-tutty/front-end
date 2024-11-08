import { useState } from "react";
import "../styles/FalseStatus.css";
import QA from "./QA";
import MyButton from "../MyButton";
import { useNavigate } from "react-router-dom";



const FalseStatus = ({qamockdata}) => {
    const [pages, setPages] = useState(1); //현재 페이지수 & 문제 갯수

    const lastPage = qamockdata.length;

    const navigate = useNavigate();

    const currentQA = qamockdata.find((qa) => qa.question.id === pages);

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

    const onSubmit = () => {
        const ids = qamockdata.map((item) => item.id);
        navigate("/scorepage", { state: { ids } });
    };

    return (
        <div className="FalseStatus">
            <div className="header">
                <div className="title">
                    인코더와 디코더의 개념
                </div>
                <div className="page_section">
                   퀴즈 풀기 <br/> {pages} / {qamockdata.length}
                </div>
            </div>
            <div className="scroll_section">
                <div className="qa_section">
                    {currentQA && (
                        <QA question={currentQA.question} answers={currentQA.answers} />
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
                            <MyButton onClick={onSubmit} type={"on"} text={"제출"} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FalseStatus;
