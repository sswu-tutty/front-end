import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import { summaryTotalList, summaryBookmark } from "../../api/Summary";

const Summary = () => {
    // 전체 요약본 저장 변수
    const [data, setData] = useState([]);
    // 모달 메시지 상태
    const [modalMessage, setModalMessage] = useState("");
    // 모달 표시 상태
    const [showModal, setShowModal] = useState(false);

    const handleLike = (id) => {
        summaryBookmark(id);
        if (data.id === id) {
            const isLiked = !data.liked;
            setModalMessage(isLiked ? "북마크가 설정되었습니다." : "북마크가 해제되었습니다.")
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
        }
    };

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

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ overflow: "auto", maxHeight: "76vh", scrollbarWidth: "none", msOverflowStyle: "none", width: "100%" }}>
                {data.map((it) => (
                    <NoteItem key={it.id} {...it} setData={setData} handleLike={() => handleLike(it.id)} status="요약" />
                ))}
                {showModal && (
                    <div className="modal">
                        {modalMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Summary;
