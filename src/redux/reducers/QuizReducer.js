import { FETCH_QUIZLIST } from "../Actions";

const initialState = {

}

const QuizReducer = (state = initialState, action) => {
    switch(action.type) {
        //퀴즈 전체 내역 조회할 때
        case FETCH_QUIZLIST:
            return ;
    }
}

export default QuizReducer;