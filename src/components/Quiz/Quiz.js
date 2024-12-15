import QuizItem from "./QuizItem";
import { useEffect, useState } from "react";
import { quizTotalList } from "../../api/Quiz";

const Quiz = () => {
    //퀴즈 전체 조회 결과 저장
    const [data, setData] = useState([]);

    //퀴즈 전체 리스트 조회
    useEffect(() => {
        const fetchQuizList = async () => {
            try {
                const result = await quizTotalList();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch quiz list:", error);
            }
        };

        fetchQuizList();
    }, []);

    //로딩 애니메이션 적용하기
    if (!Array.isArray(data)) {
        return <div>Loading...</div>;  // 데이터가 배열이 아닐 경우 로딩 상태 표시
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{width: "100%",overflow: "auto", maxHeight: "76vh", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {data.length > 0 ? (
                    data.map((it) => (
                        <QuizItem key={it.quizId} {...it} setData={setData} />
                    ))
                ) : (
                    <div>퀴즈가 존재하지 않습니다.</div>  // 퀴즈 데이터가 없을 경우
                )}
            </div>
        </div>
    );
};

export default Quiz;
