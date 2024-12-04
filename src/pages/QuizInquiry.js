import { useParams } from "react-router-dom";
import FalseStatus from "../components/Quiz/FalseStatus";

const QuizInquiry = () => {
    const { id } = useParams();

    return (
        <div>
        <FalseStatus />
        </div>
    );
}

export default QuizInquiry;
