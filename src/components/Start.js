import React from 'react';
import './styles/Start.css';
import Logo from "../assets/logo.png";

const Start = () => {
    return (
        <div className="splash-screen">
            <img src={Logo} alt="Splash Logo" className="splash-logo" />
            <div className='text'>
                <p>대화를 더 의미 있게,<br />지식을 더 쉽게!</p>
            </div>
        </div>
    );
};

export default Start;