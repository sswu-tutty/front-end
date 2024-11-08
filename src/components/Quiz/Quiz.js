import QuizItem from "./QuizItem";

const mockData1 = [
    {
        id: 1,
        title: "인코더와 디코더의 개념",
        status: true,
        correct: "10/10"
    },
    {
        id: 2,
        title: "Token Classification",
        status: false,
        correct: null
    },
    {
        id: 3,
        title: "Sequence Classification",
        status: true,
        correct: "7/10"
    },
    {
        id: 4,
        title: "GPT4o API 사용방법",
        status: true,
        correct: "9/10"
    },
    {
        id: 5,
        title: "토크나이징이란?",
        status: true,
        correct: "10/10"
    },
    {
        id: 6,
        title: "인코더와 디코더의 개념",
        status: false,
        correct: null
    },
]

const Quiz = () => {
    return (
        <div>
            {mockData1.map((it) => (
                <QuizItem key={it.id} {...it} />
            ))}
        </div>
    )
}

export default Quiz;