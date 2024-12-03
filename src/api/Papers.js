import instance from "./Axios";

//논문 요약 리스트 조회
export const paperTotalList = async () => {
    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken)

    try {
        const response = await instance.get(
            `/api/paper-notes`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("논문 요약 리스트 조회 결과: ", response.data)
        return response.data;
    } catch (error) {
        console.log("논문 요약 리스트 조회 오류: ", error)
        throw error;
    }
}

//논문 요약 상세 조회
export const paperDetail = async (id) => {
    const jwtToken = localStorage.getItem("authToken");
    console.log("jwtToken", jwtToken)

    try {
        const response = await instance.get(
            `/api/paper-notes/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            },
        );
        console.log("논문 상세 조회 결과: ", response.data)
        return response.data;
    } catch (error) {
        console.log("논문 상세 조회 오류: ", error)
        throw error;
    }
}