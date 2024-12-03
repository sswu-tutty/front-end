import EditImg from "../../assets/edit.png";
import "../styles/UnEditing.css";
import Back from "../../assets/back1.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { summaryDetailList } from "../../api/Summary";

const UnEditing = ({ detail, setEditing, status }) => {
    const { id } = useParams();

    //요약 내용 저장 변수
    const [data, setData] = useState([]); 

    //요약 상세 조회
    useEffect(() => {
        const fetchSummaryDetailList = async () => {
            try {
                const result = await summaryDetailList(id); 
                console.log(result);
                setData(result)
            } catch (error) {
                console.error("Failed to fetch summary list:", error);
            }
        };

        fetchSummaryDetailList(); 
    }, []); 

    const navigate = useNavigate(); 

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (    
        <div className="UnEditing">
            <div onClick={handleBackClick} className="back_btn">
                <img src={Back} />
                <text>뒤로가기</text>
            </div>
            <div className="title_part">{data.title}</div>
            <div className="content_part">{data.content}</div>
            <img onClick={() => setEditing(true)} className="img_part" src={EditImg}/>
        </div>
    )
}

export default UnEditing;