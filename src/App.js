import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ImgUpload from './pages/ImgUpload';
import Note from './pages/Note';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
  //로그인페이지 사용하고 싶으면 false로 변경후 사용
  const [login, setLogin] = useState(true);

  return (
    <div className='App'>
      <BrowserRouter>
        {!login ? (
          // 로그인 전
          <Login setLogin={setLogin} />
        ) : (
          // 로그인 후
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imgupload" element={<ImgUpload />} />
            <Route path="/note" element={<Note />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
