import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation 임포트
import './styles/FooterBar.css';
import inactiveImg from '../assets/inactive_img.png';
import inactiveNote from '../assets/inactive_note.png';
import inactiveHome from "../assets/inactive_home.png";
import inactiveMypage from "../assets/inactive_mypage.png";

import activeImg from "../assets/active_img.png";
import activeNote from "../assets/active_note.png";
import activeHome from "../assets/active_home.png";
import activeMypage from "../assets/active_mypage.png";

//메뉴 하단바
const FooterBar = () => {
    const location = useLocation(); // 현재 경로 가져오기
    const navigate = useNavigate();

    return (
        <footer className="footer-bar">
            <div className="footer-section" onClick={() => navigate("/imgupload")}>
                <img src={location.pathname === "/imgupload" ? activeImg : inactiveImg} />
            </div>
            <div className="footer-section" onClick={() => navigate("/note")}>
                <img src={location.pathname === "/note" ? activeNote : inactiveNote} />
            </div>
            <div className="footer-section" onClick={() => navigate("/")}>
                <img src={location.pathname === "/" ? activeHome : inactiveHome} />
            </div>
            <div className="footer-section" onClick={() => navigate("/mypage")}>
                <img src={location.pathname === "/mypage" ? activeMypage : inactiveMypage}/>
            </div>
        </footer>
    );
}

export default FooterBar;
