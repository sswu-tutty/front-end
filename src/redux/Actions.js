//action정의 파일
export const FETCH_SUMMARYLIST = "FETCH_SUMMARYLIST"; 
export const FETCH_QUIZLIST = "FETCH_QUIZLIST";

// 요약페이지
//요약 리스트(요약노트 전체 조회시)
export const fetchSummaryList = (summaryList) => ({
    type: FETCH_SUMMARYLIST,
    payload: {summaryList}
})


//퀴즈 리스트(퀴즈본 전체 조회시)
export const fetchQuizList = (quizList) => ({
    type: FETCH_QUIZLIST,
    payload: {quizList}
})