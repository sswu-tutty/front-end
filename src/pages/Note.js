import FooterBar from "../components/FooterBar";
import NoteMenu from "../components/NoteMenu";
import { useState } from "react";
import Summary from "../components/Summary";
import Quiz from "../components/Quiz";
import Button from "../components/Button";

const Note = () => {
    const [activeTab, setActiveTab] = useState("summary");

    return (
        <div>
            <NoteMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            <Button type={"off"} text={"최신순"}/>
            {activeTab === "summary" ? <Summary /> : <Quiz />}
            
        </div>
    );
}

export default Note;
