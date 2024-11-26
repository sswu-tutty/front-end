import instance from "./Axios";

//요약본 전체 결과조회
export const summaryTotalList = async () => {

    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken)
    try {
        const response = await instance.get(
            '/api/notes',
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("요약본 전체 결과조회 결과: ", response.data)
        return response.data;
    } catch (error) {
        console.log("요약본 전체 결과조회 오류: ", error)
        throw error;
    }
}


//요약 노트 상세 조회
export const summaryDetailList = async (noteId) => {
    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken);
    console.log("요약상세조회 id", noteId)

    try {
        const response = await instance.get(
            `/api/notes/${noteId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("요약본 상세조회 결과: ", response.data)
        return response.data;
    } catch (error) {
        console.log("요약본 상세조회 오류: ", error)
        throw error;
    }
}

//요약 노트 삭제
export const summaryDelete = async (noteId) => {
    const jwtToken = localStorage.getItem("authToken");

    try {
        const response = await instance.delete(
            `/api/notes/${noteId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("요약본 삭제 결과: ", response.data)
    } catch (error) {
        console.log("요약본 삭제 오류: ", error)
        throw error;
    }
}


//요약 노트 수정
export const summaryEdit = async (noteId, editedTitle, editedContent) => {
    const jwtToken = localStorage.getItem("authToken");

    try {
        const response = await instance.put(
            `/api/notes/${noteId}`,
            {
                title: editedTitle,
                content: editedContent,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("요약본 수정 결과: ", response.data)
    } catch (error) {
        console.log("요약본 수정 오류: ", error)
        throw error;
    }
}


//요약 노트 북마크
export const summaryBookmark = async (noteId) => {
    const jwtToken = localStorage.getItem("authToken");

    if (!jwtToken) {
        console.error("JWT 토큰이 없습니다.");
        throw new Error("로그인이 필요합니다.");
    }

    try {
        const response = await instance.patch(
            `/api/notes/${noteId}/bookmark`,
            {}, // 요청 본문이 없을 경우 빈 객체 전달
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
        console.log("요약본 북마크 결과: ", response.data);
    } catch (error) {
        console.error("요약본 북마크 오류: ", error.response?.status, error.response?.data || error.message);
        throw error;
    }
};

