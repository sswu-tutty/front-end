import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Editing.css";
import Back from "../../assets/back1.png";
import { summaryEdit } from "../../api/Summary";
import { summaryDetailList } from "../../api/Summary";

const Editing = ({ detail, setEditing }) => {
    const { id } = useParams();

    // 제목과 내용 상태 초기화
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    // 데이터 로드
    useEffect(() => {
        const fetchSummaryDetailList = async () => {
            try {
                const result = await summaryDetailList(id);
                console.log(result);
                setEditedTitle(result.title || ""); // 초기값 설정
                setEditedContent(result.content || ""); // 초기값 설정
            } catch (error) {
                console.error("Failed to fetch summary list:", error);
            }
        };

        fetchSummaryDetailList();
    }, [id]);

    // 수정 저장
    const handleEdit = async () => {
        try {
            await summaryEdit(id, editedTitle, editedContent);
            setEditing(false);
            alert("수정이 완료되었습니다.");
        } catch (error) {
            console.error("Failed to edit summary:", error);
            alert("수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="Editing">
            <div className="btn_section">
                <div className="back_button" onClick={() => setEditing(false)}>
                    <img src={Back} alt="뒤로가기" />
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
                    value={editedTitle} // 수정된 제목 상태
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                    className="input_content"
                    placeholder="내용"
                    value={editedContent} // 수정된 내용 상태
                    onChange={(e) => setEditedContent(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Editing;
