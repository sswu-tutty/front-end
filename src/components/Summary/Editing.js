import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Editing.css";
import Back from "../../assets/back1.png";
import { summaryEdit } from "../../api/Summary";

const Editing = ({ detail, setEditing }) => {
    const { id } = useParams();
    const [title, setTitle] = useState(detail.title || "");
    const [content, setContent] = useState(detail.content || "");

    //요약본 편집 api
    const handleEdit = () => {
        summaryEdit(id, title, content); //인자: id, 수정제목, 수정내용
        setEditing(false);
    }

    return (
        <div className="Editing">
            <div className="btn_section">
                <div className="back_button" onClick={() => setEditing(false)}>
                    <img src={Back} />
                    <span>뒤로가기</span>
                </div>
                <div className="done_btn" onClick={handleEdit}>
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
