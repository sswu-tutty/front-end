import React, { useState } from 'react';
import FooterBar from '../components/FooterBar';
import menu from "../assets/menu.png";
import send from "../assets/send.png";
import SideMenu from '../components/SideMenu';

const Home = () => {
    // 메시지 없을 때
    // const [messages, setMessages] = useState([]);
    // 메시지 전송시
    const [messages, setMessages] = useState([
        {
            text:
                "자연어 처리(NLP)에서 인코더(Encoder)는 입력 데이터를 특정한 형식의 벡터로 변환하는 역할을 하는 신경망의 한 부분입니다. 주로 Transformer 모델이나 seq2seq(시퀀스- 투 - 시퀀스) 구조에서 사용되며,텍스트를 숫자로 이루어진 벡터로 변환해모델이 이해할 수 있게 합니다.", sent: false
        },
        { text: "안녕하세요!", sent: true },
        {
            text:
                "자연어 처리(NLP)에서 인코더(Encoder)는 입력 데이터를 특정한 형식의 벡터로 변환하는 역할을 하는 신경망의 한 부분입니다. 주로 Transformer 모델이나 seq2seq(시퀀스- 투 - 시퀀스) 구조에서 사용되며,텍스트를 숫자로 이루어진 벡터로 변환해모델이 이해할 수 있게 합니다.", sent: false
        },
        { text: "안녕하세요!", sent: true },
        {
            text:
                "자연어 처리(NLP)에서 인코더(Encoder)는 입력 데이터를 특정한 형식의 벡터로 변환하는 역할을 하는 신경망의 한 부분입니다. 주로 Transformer 모델이나 seq2seq(시퀀스- 투 - 시퀀스) 구조에서 사용되며,텍스트를 숫자로 이루어진 벡터로 변환해모델이 이해할 수 있게 합니다.", sent: false
        },
        { text: "안녕하세요!", sent: true }

    ]);

    const [inputText, setInputText] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const addMessage = () => {
        if (inputText.trim() !== '') {
            setMessages([...messages, { text: inputText, sent: true }]);
            setInputText('');
        }
    };

    // 요약본 생성 메시지 추가
    const addSummaryMessage = () => {
        setShowSummary(!showSummary);
        setMessages([
            ...messages,
            { text: "요약본이 생성되었습니다.", sent: false } // 요약 메시지 추가
        ]);
    };

    // 퀴즈 생성 메시지 추가
    const addQuizMessage = () => {
        setShowQuiz(!showQuiz);
        setMessages([
            ...messages,
            { text: "퀴즈가 생성되었습니다.", sent: false } // 퀴즈 메시지 추가
        ]);
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        e.target.style.height = 'auto'; // 높이를 초기화하여 스크롤 높이를 계산
        e.target.style.height = `${e.target.scrollHeight - 16}px`; // 내용에 맞게 높이 조정
    };

    return (
        <div className="Home_wrap container">
            <header className="header">
                <img src={menu} className="menu-img" alt="Menu" onClick={toggleMenu} />
                <div className='buttons'>
                    {messages.length > 0 && (
                        <>
                            <button className='sum-message' onClick={addSummaryMessage}>요약본 생성</button>
                            <button className='quiz-mesaage' onClick={addQuizMessage}>퀴즈 생성</button>
                        </>
                    )}
                </div>
            </header>

            <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />


            <div className="chat-container">
                {messages.length === 0 ? (
                    <p className="no-messages">Tutty와 대화를 시작하세요.</p>
                ) : (
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sent ? 'sent' : 'received'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="input-container">
                <textarea
                    value={inputText}
                    onChange={handleInputChange}
                    rows="1"
                    placeholder="메시지 보내기"
                    style={{ resize: "none", overflow: "hidden" }} // 크기 조절 비활성화 및 스크롤 숨김
                />
                <img src={send} onClick={addMessage} alt="Send" />
            </div>


            <FooterBar />
        </div>
    );
};

export default Home;
