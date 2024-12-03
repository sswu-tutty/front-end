import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { paperDetail } from "../../api/Papers";
import EditImg from "../../assets/edit.png";
import Back from "../../assets/back1.png";

const PaperInquiry = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate(); 
    const handleBackClick = () => {
        navigate(-1); 
    };
      //논문 상세 조회
      useEffect(() => {
        const fetchPaperDetail = async () => {
            try {
                const result = await paperDetail(id);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch paper list:", error);
            }
        };

        fetchPaperDetail();
    }, []);
    

    return (
        <div>
            <div className="UnEditing">
            <div onClick={handleBackClick} className="back_btn">
                <img src={Back} />
                <text>뒤로가기</text>
            </div>
            <div className="title_part">{data.paperTitle}</div>
            <div className="content_part">{data.content}</div>
            <img className="img_part" src={EditImg}/>
        </div>

        </div>
    );
}

export default PaperInquiry;