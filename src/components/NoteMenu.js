import { useState } from "react";
import "./styles/NoteMenu.css";

const NoteMenu = ({activeTab, setActiveTab}) => {
    
    return (
        <header className="NoteMenu">
            <div 
                className={`tab ${activeTab === "summary" ? "active" : ""}`} 
                onClick={() => setActiveTab("summary")}
            >
                요약본
            </div>
            <div 
                className={`tab ${activeTab === "quiz" ? "active" : ""}`} 
                onClick={() => setActiveTab("quiz")}
            >
                퀴즈
            </div>
        </header>
    );
};

export default NoteMenu;
