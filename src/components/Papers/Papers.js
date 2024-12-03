import { useState, useEffect } from "react";
import NoteItem from "../Summary/NoteItem";

const Papers = () => {
    // 전체 논문 저장 변수
    const [data, setData] = useState([]);

    return (
        <div>
            {data.map((it) => (
                <NoteItem key={it.id} {...it} setData={setData} />
            ))}
        </div>
    )
}

export default Papers;