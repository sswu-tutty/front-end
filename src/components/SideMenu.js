import React from 'react';
import './styles/SideMenu.css';
import prev_btn from '../assets/previous_btn.png'

const SideMenu = ({ isOpen, toggleMenu }) => {
    return (
        <>
            {/* 오버레이 배경 */}
            {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
            
            {/* 사이드 메뉴 */}
            <div className={`side-menu ${isOpen ? 'open' : ''}`}>
                <img src={prev_btn} className="close-btn" onClick={toggleMenu}></img>
                <p className='record'>현재 대화 기록</p>
                <div className="current-chat">
                    <p>자연어 처리에서 인코더 개념</p>
                </div>
                <p className='record'>이전 대화 기록</p>
                <div className="previous-chat">
                    <p>인코더와 디코더의 구조</p>
                    <p>허깅페이스 사용방법</p>
                    <p>GPT 파인튜닝 방법</p>
                </div>
            </div>
        </>
    );
};

export default SideMenu;
