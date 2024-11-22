import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/SideMenu.css';
import prev_btn from '../assets/previous_btn.png';

const SideMenu = ({ isOpen, toggleMenu, messages, updateMessages }) => {
    const URL = 'http://52.78.72.117:8080';
    const token = localStorage.getItem("authToken");

    const [previousChats, setPreviousChats] = useState([]);
    const [currentTitles, setCurrentTitles] = useState([]);

    // 대화 리스트 api 연결
    const fetchPreviousConversations = async () => {
        try {
            const response = await axios.get(`${URL}/api/conversations`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPreviousChats(response.data);
        } catch (error) {
            console.error('이전 대화 목록 가져오기 오류:', error);
        }
    };

    // 채팅방별 조회 api 연결
    const fetchChatMessages = async (chatroomId) => {
        try {
            const response = await axios.get(`${URL}/api/conversations/${chatroomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            updateMessages(response.data);
            console.log("side:", response.data);

            const titles = response.data.map((msg) => msg.question);
            setCurrentTitles(titles);
        } catch (error) {
            console.error('대화 메시지 가져오기 오류:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchPreviousConversations();
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
            <div className={`side-menu ${isOpen ? 'open' : ''}`}>
                <img src={prev_btn} className="close-btn" onClick={toggleMenu} alt="닫기 버튼" />

                <p className="record">현재 대화 기록</p>
                <div className="current-chat">
                    {currentTitles.length > 0 ? (
                        <p>{currentTitles[0]}</p>

                    ) : (
                        <p>현재 대화가 없습니다.</p>
                    )}
                </div>

                <p className="record">이전 대화 기록</p>
                <div className="previous-chat">
                    {previousChats.length > 0 ? (
                        previousChats.map((chat, index) => (
                            <p 
                                key={index} 
                                onClick={() => fetchChatMessages(chat.chatroomId)} 
                                style={{ cursor: 'pointer', marginBottom: '10px' }}
                            >
                                {chat.question}
                            </p>
                        ))
                    ) : (
                        <p>이전 대화가 없습니다.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SideMenu;
