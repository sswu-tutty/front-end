//action정의 파일
export const FETCH_SUMMARY_DETAIL_LIST = "FETCH_SUMMARY_DETAIL_LIST"; 
export const FETCH_QUIZLIST = "FETCH_QUIZLIST";

// 요약페이지
//요약 상세 조회
export const fetchSumDetailList = (summaryDetail) => ({
    type: FETCH_SUMMARY_DETAIL_LIST,
    payload: {summaryDetail}
})


//퀴즈 리스트(퀴즈본 전체 조회시)
export const fetchQuizList = (quizList) => ({
    type: FETCH_QUIZLIST,
    payload: {quizList}
})