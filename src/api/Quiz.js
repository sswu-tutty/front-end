import instance from "./Axios";

//퀴즈 결과(결과 전달)
export const quizResult = async (quizId, result) => {
    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken)

    try {
        const response = await instance.post(
            `/api/quiz/${quizId}/submit`,
            result,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("퀴즈 풀기 결과: ", response.data)
        return response.data;
    } catch (error) {
        console.log("퀴즈 풀기 오류: ", error)
        throw error;
    }
}

//퀴즈 결과조회(응시 & 미응시시 둘다)
export const quizResultDetail = async (quizId) => {
    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken)

    try {
        const response = await instance.get(
            `/api/quiz/${quizId}/result`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("퀴즈 결과조회 결과: ", response.data)
        return response.data;
    } catch (error) {
        console.log("퀴즈 결과조회 오류: ", error)
        throw error;
    }
}

//퀴즈 목록 전체 조회
export const quizTotalList = async () => {
    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken)

    try {
        const response = await instance.get(
            '/api/quiz',
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("퀴즈목록 전체조회 결과: ", response.data)
        return response.data;
    } catch (error) {
        console.log("퀴즈목록 전체조회 오류: ", error)
        throw error;
    }
}

//퀴즈 삭제
export const quizDelete = async (quizId) => {
    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken)

    try {
        const response = await instance.delete(
            `/api/quiz/${quizId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("퀴즈 삭제 결과: ", response.data)
    } catch (error) {
        console.log("퀴즈 삭제 오류: ", error)
        throw error;
    }
}

//퀴즈 북마크
export const quizBookmark = async (quizId) => {
    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken)

    try {
        const response = await instance.patch(
            `/api/quiz/${quizId}/bookmark`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("퀴즈 북마크 결과: ", response.data)
        return response.data;
    } catch (error) {
        console.log("퀴즈 북마크 오류: ", error)
        throw error;
    }
}