import { BrowserRouter, Navigate, Route, Routes, Router } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ImgUpload from './pages/ImgUpload';
import Note from './pages/Note';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState, useEffect } from 'react';
import SummaryInquiry from './pages/SummaryInquiry';
import FooterBar from './components/FooterBar';
import QuizInquiry from './pages/QuizInquiry';
import ScorePage from './pages/ScorePage';
import ResultCheck from './pages/ResultCheck';
import Bookmark from './pages/Bookmark';
import PaperInquiry from './components/Papers/PaperInquiry';

function App() {
  // 로컬스토리지에서 초기 로그인 상태 확인
  const [login, setLogin] = useState(() => {
    const storedLogin = localStorage.getItem('login');
    return storedLogin === 'true'; // 문자열 "true"를 불린값 true로 변환
  });

  useEffect(() => {
    console.log('login 상태:', login);
    localStorage.setItem('login', login); // login 상태 변경 시 로컬스토리지에 저장
  }, [login]);


  return (
    <div className='App'>
      <BrowserRouter>
        {!login ? (
          // 로그인 전
          <Routes>
            <Route path="/login" element={<Login setLogin={setLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          // 로그인 후
          <div id="root" >
            <div className='app-container'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/imgupload" element={<ImgUpload />} />
                <Route path="/note" element={<Note />} />
                <Route path="/mypage" element={<MyPage setLogin={setLogin} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/summaryinquiry/:id" element={<SummaryInquiry />} />
                <Route path="/quizinquiry/:id" element={<QuizInquiry />} />
                <Route path="/scorepage/:id" element={<ScorePage />} />
                <Route path="/resultcheck/:id" element={<ResultCheck />} />
                <Route path="/bookmark" element={<Bookmark />} />
                <Route path="/paperinquiry/:id" element={<PaperInquiry />} />
              </Routes>
              <FooterBar />
            </div>
          </div>

        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
