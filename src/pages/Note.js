import FooterBar from "../components/FooterBar";
import NoteMenu from "../components/NoteMenu";
import { useState } from "react";
import Summary from "../components/Summary";
import Quiz from "../components/Quiz";
import Button from "../components/Button";

const mockData =  [
    {
        id: 1,
        title: "인코더와 디코더의 개념",
        content: "트랜스포머 모델은 인코더, 디코더 기반"
    },
    {
        id: 2,
        title: "Token Classification",
        content: "트랜스포머 모델은 인코더, 디코더 기반"
    },
    {
        id: 3,
        title: "Sequence Classification",
        content: "트랜스포머 모델은 인코더, 디코더 기반"
    },
    {
        id: 4,
        title: "GPT4o API 사용방법",
        content: "트랜스포머 모델은 인코더, 디코더 기반"
    },
    {
        id: 5,
        title: "토크나이징이란?",
        content: "트랜스포머 모델은 인코더, 디코더 기반"
    },
    {
        id: 6,
        title: "인코더와 디코더의 개념",
        content: "트랜스포머 모델은 인코더, 디코더 기반"
    },
]

const Note = () => {
    const [activeTab, setActiveTab] = useState("summary");

    return (
        <div>
            <NoteMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            <Button type={"off"} text={"최신순"}/>
            {activeTab === "summary" ? <Summary mockData={mockData}/> : <Quiz />}
            
        </div>
    );
}

export default Note;
