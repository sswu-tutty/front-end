import React, { useState, useEffect, useRef } from 'react';
import FooterBar from '../components/FooterBar';
import menu from "../assets/menu.png";
import send from "../assets/send.png";
import SideMenu from '../components/SideMenu';
import axios from 'axios';

const Home = () => {
    const URL = 'http://52.78.72.117:8080';
    const token = localStorage.getItem("authToken");

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [chatroomId, setChatroomId] = useState(null);

    // 메시지 컨테이너의 끝을 참조할 수 있도록 useRef 사용
    const messagesEndRef = useRef(null);

    // 메뉴 토글
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 채팅방 시작 시 순차적으로 chatroomId 설정
    const startChat = () => {
        const storedChatroomId = localStorage.getItem('chatroomId');
        const newChatroomId = storedChatroomId ? parseInt(storedChatroomId) + 1 : 1; // 첫 채팅은 1부터 시작
        setChatroomId(newChatroomId);
        localStorage.setItem('chatroomId', newChatroomId);
        setMessages([]);
    };

    // 챗봇 API 호출
    const callChatbotAPI = async (question) => {
        if (!chatroomId) return;

        try {
            // API 호출
            const response = await axios.post(`${URL}/api/ask`, new URLSearchParams({
                'chatroomId': chatroomId.toString(),
                'question': question
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                }
            });

            // 서버 응답 처리
            const { answer } = response.data;
            setMessages([
                ...messages,
                { text: question, sent: true }, // 사용자가 보낸 메시지 추가
                { text: answer, sent: false }   // 챗봇의 응답 추가
            ]);
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    // 메시지 추가
    const addMessage = () => {
        if (inputText.trim() !== '') {
            setMessages([...messages, { text: inputText, sent: true }]); // 사용자 메시지 추가
            setInputText(''); // 입력 필드 초기화

            // 챗봇 API 호출
            callChatbotAPI(inputText);
        }
    };

    // 입력값 변경 시 처리
    const handleInputChange = (e) => {
        setInputText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight - 16}px`;
    };

    // 페이지 로드 시 채팅방 시작
    useEffect(() => {
        startChat();
    }, []);

    // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="Home_wrap container">
            <header className="header">
                <img src={menu} className="menu-img" alt="Menu" onClick={toggleMenu} />
                <div className='buttons'>
                    {messages.length > 0 && (
                        <>
                            <button className='sum-message'>요약본 생성</button>
                            <button className='quiz-mesaage'>퀴즈 생성</button>
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
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <div className="input-container">
                <textarea
                    value={inputText}
                    onChange={handleInputChange}
                    rows="1"
                    placeholder="메시지 보내기"
                    style={{ resize: "none", overflow: "hidden" }}
                />
                <img src={send} onClick={addMessage} alt="Send" />
            </div>

            <FooterBar />
        </div>
    );
};

export default Home;
