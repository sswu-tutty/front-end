import QuizItem from "./QuizItem";
import { useEffect, useState } from "react";
import { quizTotalList } from "../../api/Quiz";

const Quiz = () => {
    const [data, setData] = useState([]);

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

    if (!Array.isArray(data)) {
        return <div>Loading...</div>;  // 데이터가 배열이 아닐 경우 로딩 상태 표시
    }

    return (
        <div>
            {data.length > 0 ? (
                data.map((it) => (
                    <QuizItem key={it.quizId} {...it} setData={setData}/>
                ))
            ) : (
                <div>No quizzes available.</div>  // 퀴즈 데이터가 없을 경우
            )}
        </div>
    );
};

export default Quiz;
