import React, { useState, useEffect, useRef } from 'react';
import FooterBar from '../components/FooterBar';
import menu from "../assets/menu.png";
import send from "../assets/send.png";
import SideMenu from '../components/SideMenu';
import axios from 'axios';

const Home = () => {
    const URL = 'http://54.180.8.46:8080';
    const token = localStorage.getItem("authToken");

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [chatroomId, setChatroomId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const messagesEndRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 새로운 대화 시작 시 chatroomId 설정
    const startChat = () => {
        const storedChatroomId = localStorage.getItem('chatroomId');
        const newChatroomId = storedChatroomId ? parseInt(storedChatroomId) + 1 : 1;
        setChatroomId(newChatroomId);
        localStorage.setItem('chatroomId', newChatroomId);
        setMessages([]);
    };

    // 과거 대화 선택 시, 기존 chatroomId 유지
    const loadPreviousChat = (chatroomId) => {
        setChatroomId(chatroomId);
        console.log(chatroomId)
        localStorage.setItem('chatroomId', chatroomId);
    };

    const addMessage = () => {
        if (inputText.trim() !== '') {
            // 중복된 질문이 있는지 확인
            const isDuplicate = messages.some((msg) => msg.text === inputText && msg.sent === true);

            if (!isDuplicate) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: inputText, sent: true }
                ]);
                setInputText('');
                callChatbotAPI(inputText);
            }
        }
    };


    const handleInputChange = (e) => {
        setInputText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight - 16}px`;
    };

    useEffect(() => {
        startChat();  // 새로운 대화 시작
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const updateMessagesFromPreviousChat = (chatMessages, chatroomId) => {
        const formattedMessages = chatMessages.map(msg => [
            { text: msg.question, sent: true },
            { text: msg.answer, sent: false }
        ]).flat();

        setMessages(formattedMessages);
        loadPreviousChat(chatMessages[0].chatroomId);
        console.log("roomid:", chatMessages[0].chatroomId)
        localStorage.setItem('chatroomId', chatMessages[0].chatroomId);

    };

    useEffect(() => {
        console.log("Selected chat messages:", messages);
    }, [messages]);

    // 챗봇 대화 api 연결
    const callChatbotAPI = async (question) => {
        try {
            const response = await axios.post(`${URL}/api/ask`, new URLSearchParams({
                'chatroomId': chatroomId.toString(),
                'question': question
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                }
            });

            const { answer } = response.data;
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: answer, sent: false }
            ]);
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    // 챗봇 내용 요약 api 연결
    const addSummary = async () => {
        // 로딩 상태로 전환
        setIsLoading(true);
        try {
            const response = await axios.post(`${URL}/api/notes/summary/${chatroomId}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setTimeout(() => {
                alert("요약노트 생성이 완료되었습니다.");
            }, 100);
        } catch (error) {
            console.error('Summary API 호출 오류:', error);
        }
    };

    // 퀴즈 생성 api 연결
    const addQuiz = async () => {
        // 로딩 상태로 전환
        setIsLoading(true);
        try {
            const response = await axios.post(`${URL}/api/quiz/generate/${chatroomId}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIsLoading(false);
            setTimeout(() => {
                alert("퀴즈 생성이 완료되었습니다.");
            }, 100);
        } catch (error) {
            console.error('Quiz API 호출 오류:', error);
        }
    };

    return (
        <div className="Home_wrap container">
            {isLoading ? (
                <div className="loading-screen">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <header className="header">
                        <img src={menu} className="menu-img" alt="Menu" onClick={toggleMenu} />
                        <div className='buttons'>
                            {messages.length > 0 && (
                                <>
                                    <button className='sum-message' onClick={addSummary}>요약본 생성</button>
                                    <button className='quiz-mesaage' onClick={addQuiz}>퀴즈 생성</button>
                                </>
                            )}
                        </div>
                    </header>

                    <SideMenu
                        isOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                        messages={messages}
                        updateMessages={updateMessagesFromPreviousChat}
                    />

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
                </>
            )}

        </div>
    );
};

export default Home;
