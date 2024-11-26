import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import { summaryTotalList } from "../../api/Summary";

const Summary = () => {
    //전체일기 저장변수
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSummaryList = async () => {
            try {
                const result = await summaryTotalList();
                console.log(result);
                setData(result)
            } catch (error) {
                console.error("Failed to fetch summary list:", error);
            }
        };

        fetchSummaryList();
    }, []);

    return (
        <div>
            {data.map((it) => (
                <NoteItem key={it.id} {...it} setData={setData} />
            ))}
        </div>

    );
};

export default Summary;
