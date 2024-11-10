import React from 'react';
import './styles/TextScreen.css';

const TextScreen = ({text}) => {
    return (
        <div className="text-screen">
            <div className="btn-container">
                <button className="complete-btn">완료</button>
            </div>
            <div>
                <p>{text}</p> 
            </div>
        </div>
    );
};

export default TextScreen;
