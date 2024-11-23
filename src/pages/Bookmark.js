import NoteMenu from "../components/NoteMenu";
import { useState } from "react";
import MyButton from "../components/MyButton";
import SummaryBookmark from "../components/Bookmark/SummaryBookmark";
import QuizBookmark from "../components/Bookmark/QuizBookmark";

const Bookmark = () => {
    const [activeTab, setActiveTab] = useState("summary");

    return (
        <div className="Bookmark">
            <NoteMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "15px 20px" }}>
                <MyButton type={"off"} text={"최신순"} />
            </div>
            {activeTab === "summary" ? <SummaryBookmark /> : <QuizBookmark />}
        </div>
    )
}

export default Bookmark;