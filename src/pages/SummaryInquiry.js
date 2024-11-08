import { useState } from "react";
import { useParams } from "react-router-dom";
import UnEditing from "../components/Summary/UnEditing";
import Editing from "../components/Summary/Editing"; // Editing 컴포넌트 추가

const SummaryInquiry = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({
        title: "인코더와 디코더의 개념",
        content: "자연어 처리(NLP)에서 **인코더(Encoder)**와 **디코더(Decoder)**는 시퀀스 데이터를 처리하고 변환하는 중요한 역할을 하는 구조입니다. 주로 번역, 텍스트 생성 등의 작업에 많이 사용되며, Transformer와 같은 모델에서 핵심적으로 쓰입니다. 인코더는 입력 데이터를 받아 이를 벡터로 변환하는 역할을 합니다. 자연어 처리에서는 텍스트를 숫자 벡터로 바꿔야 계산이 가능하므로, 인코더는 이 과정에서 입력 문장의 모든 중요한 정보를 요약하여 고정된 크기의 벡터로 변환합니다. 이 벡터는 텍스트의 의미나 문맥을 담고 있어야 합니다. 디코더 디코더는 인코더가 만들어낸 벡터를 받아, 이를 출력 데이터로 변환하는 역할을 합니다. 번역의 경우, 인코더가 입력 문장을 벡터로 바꾼 후, 디코더는 이 벡터를 바탕으로 번역된 문장을 생성합니다. 디코더는 문장을 하나씩 생성하며, 이전에 생성된 단어와 인코더로부터 받은 정보를 바탕으로 다음 단어를 예측합니다."
    });
    
    const [editing, setEditing] = useState(false);
   

    return (
        <div>
            {editing ? <Editing detail={detail}  setEditing={setEditing}/> : <UnEditing detail={detail} setEditing={setEditing} />}
            
        </div>
    );
}

export default SummaryInquiry;
