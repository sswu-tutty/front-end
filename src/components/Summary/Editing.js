import { useState } from "react";
import "../styles/Editing.css";
import Back from "../../assets/back1.png";

const Editing = ({ detail, setEditing }) => {
    const [title, setTitle] = useState(detail.title || "");
    const [content, setContent] = useState(detail.content || "");

    return (
        <div className="Editing">
            <div className="btn_section">
                <div className="back_button" onClick={() => setEditing(false)}>
                    <img src={Back} />
                    <span>뒤로가기</span>
                </div>
                <div className="done_btn" onClick={() => setEditing(false)}>
                    완료
                </div>
            </div>
            <div className="input_section">
                <input
                    className="input_title"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="input_content"
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Editing;
