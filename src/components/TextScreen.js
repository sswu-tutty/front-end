import { React, useState } from 'react';
import './styles/TextScreen.css';
import axios from 'axios';

const TextScreen = ({ text, quizOption, summaryOption }) => {
    const URL = 'http://52.78.72.117:8080';
    const token = localStorage.getItem("authToken");

    const [isLoading, setIsLoading] = useState(false);

    // 논문 요약노트 생성 API 연결
    const addSummary = async () => {
        try {
            const response = await axios.post(`${URL}/api/paper-notes/summarize`, { text }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Summary:', response.data);

            setIsLoading(false);
            setTimeout(() => {
                alert("퀴즈 생성이 완료되었습니다.");
            }, 100);
        } catch (error) {
            setIsLoading(false);
            console.error('Summary API 호출 오류:', error);
        }
    };

    // 퀴즈 생성 API 연결 - 없어서 임시로 만듦
    const addQuiz = async () => {
        try {
            const response = await axios.post(`${URL}/api/paper-notes/quiz`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Quiz:', response.data);

            setIsLoading(false);
            setTimeout(() => {
                alert("퀴즈 생성이 완료되었습니다.");
            }, 100);
        } catch (error) {
            setIsLoading(false);
            console.error('Quiz API 호출 오류:', error);
        }
    };

    // 완료 버튼 클릭 시, 선택된 옵션에 맞는 함수 실행
    const handleComplete = () => {
        console.log('summary:', summaryOption)
        console.log('quiz:', quizOption)

        // 로딩 상태로 전환
        setIsLoading(true);

        if (quizOption) {
            addQuiz();
        }

        if (summaryOption) {
            addSummary();
        }
    };

    return (
        <div className="text-screen">
            {isLoading ? (
                <div className="loading-screen">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <div className="btn-container">
                        <button className="complete-btn" onClick={handleComplete}>완료</button>
                    </div>
                    <div className='text-content'>
                        <p>{text}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default TextScreen;
