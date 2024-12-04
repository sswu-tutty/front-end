import { useState, useEffect } from "react";
import NoteItem from "../Summary/NoteItem";
import { paperTotalList } from "../../api/Papers";

const Papers = () => {
    // 전체 논문 저장 변수
    const [data, setData] = useState([]);

    // 전체 논문 리스트 조회
    useEffect(() => {
        const fetchPaperList = async () => {
            try {
                const result = await paperTotalList();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch quiz list:", error);
            }
        };

        fetchPaperList();
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <div
                style={{
                    overflow: "auto",
                    maxHeight: "76vh",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    width: "100%" // 전체 너비를 채우도록 설정
                }}
            >
                {data.map((it) => (
                    <NoteItem key={it.id} {...it} setData={setData} status="논문" />
                ))}
            </div>
        </div>
    );
    
}

export default Papers;