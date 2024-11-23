import { useState, useEffect } from "react";
import { summaryBookmark } from "../../api/Summary";
import NoteItem from "../Summary/NoteItem";

const SummaryBookmark = () => {
    //좋아요 저장 변수
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSummaryBookmarkList = async () => {
            try {
                const result = await summaryBookmark(); 
                setData(result); 
            } catch (error) {
                console.error("Failed to fetch summary bookmark list:", error);
            }
        };

        fetchSummaryBookmarkList(); 
    }, []);

    return (
        <div>
            요약본 좋아요
            {data.map((it) => (
                <NoteItem key={it.id} {...it} />
            ))}
        </div>
    )
}

export default SummaryBookmark;