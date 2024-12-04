import NoteMenu from "../components/NoteMenu";
import { useState } from "react";
import Summary from "../components/Summary/Summary";
import Quiz from "../components/Quiz/Quiz";
import MyButton from "../components/MyButton";
import Papers from "../components/Papers/Papers";

const Note = () => {
    const [activeTab, setActiveTab] = useState("summary");

    return (
        <div>
            <NoteMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "15px 20px" }}>
                <MyButton type={"off"} text={"최신순"} />
            </div>
            {
                activeTab === "summary" ? (
                    <Summary />
                ) : activeTab === "quiz" ? (
                    <Quiz setActiveTab={setActiveTab} />
                ) : (
                    <Papers setActiveTab={setActiveTab}/>
                )
            }
        </div>
    );
}

export default Note;
