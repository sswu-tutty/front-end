import FooterBar from "../components/FooterBar";
import NoteMenu from "../components/NoteMenu";
import { useState } from "react";
import Summary from "../components/Summary/Summary";
import Quiz from "../components/Quiz/Quiz";
import MyButton from "../components/MyButton";

const mockData = [
    {
        id: 1,
        title: "인코더와 디코더의 개념",
        content: "트랜스포머 모델은 인코더, 디코더 기반",
        like: false
    },
    {
        id: 2,
        title: "Token Classification",
        content: "트랜스포머 모델은 인코더, 디코더 기반",
        like: false
    },
    {
        id: 3,
        title: "Sequence Classification",
        content: "트랜스포머 모델은 인코더, 디코더 기반",
        like: true
    },
    {
        id: 4,
        title: "GPT4o API 사용방법",
        content: "트랜스포머 모델은 인코더, 디코더 기반",
        like: false
    },
    {
        id: 5,
        title: "토크나이징이란?",
        content: "트랜스포머 모델은 인코더, 디코더 기반",
        like: true
    },
    {
        id: 6,
        title: "인코더와 디코더의 개념",
        content: "트랜스포머 모델은 인코더, 디코더 기반",
        like: false
    },
]

const Note = () => {
    const [activeTab, setActiveTab] = useState("summary");

    return (
        <div>
            <NoteMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "15px 20px" }}>
                <MyButton type={"off"} text={"최신순"} />
            </div>
            {activeTab === "summary" ? <Summary mockData={mockData} /> : <Quiz setActiveTab={setActiveTab}/>}
        </div>
    );
}

export default Note;
