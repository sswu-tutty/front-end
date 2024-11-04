import EditImg from "../assets/edit.png";
import "./styles/UnEditing.css";
import Back from "../assets/back1.png";
import { useNavigate } from "react-router-dom";



const UnEditing = ({ detail, setEditing }) => {
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
            <div className="title_part">{detail.title}</div>
            <div className="content_part">{detail.content}</div>
            <img onClick={() => setEditing(true)} className="img_part" src={EditImg}/>
        </div>
    )
}

export default UnEditing;