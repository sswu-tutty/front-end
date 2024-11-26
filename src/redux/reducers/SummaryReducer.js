import { FETCH_SUMMARY_DETAIL_LIST } from "../Actions";

const initialState = {
    data: null,
}

const SummaryReducer = (state = initialState, action) => {
    switch(action.type) {
        //요약본 상세 조회시
        case FETCH_SUMMARY_DETAIL_LIST:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
    }
}

export default SummaryReducer;