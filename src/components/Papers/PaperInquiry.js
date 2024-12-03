import { useState, useEffect } from "react";
import UnEditing from "../Summary/UnEditing";
import { useParams } from "react-router-dom";
import { paperDetail } from "../../api/Papers";

const PaperInquiry = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});

    

    return (
        <div>
            <UnEditing detail={detail} status="논문" />

        </div>
    );
}

export default PaperInquiry;