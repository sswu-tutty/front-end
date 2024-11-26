import { useState, useEffect } from "react";
import { summaryTotalList } from "../../api/Summary";
import NoteItem from "../Summary/NoteItem";

const SummaryBookmark = () => {
    //좋아요 저장 변수
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSummaryList = async () => {
            try {
                const result = await summaryTotalList();
                console.log(result);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch summary list:", error);
            }
        };

        fetchSummaryList();
    }, []);

    // liked 값이 true인 항목만 필터링
    const filteredData = data.filter((item) => item.liked);

    return (
        <div>
            {filteredData.map((it) => (
                <NoteItem key={it.id} {...it} setData={setData} />
            ))}
        </div>
    );
}

export default SummaryBookmark;