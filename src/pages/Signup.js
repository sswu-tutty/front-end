import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [inputName, setInputName] = useState('');
    const [confirmValue, setConfirmValue] = useState(''); // 비밀번호 확인 입력값
    const [full, setFull] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState('존재하지 않는 정보입니다');
    const [passwordMatch, setPasswordMatch] = useState(null); // 비밀번호 일치 상태
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [pwType, setPwType] = useState({
        type: "password",
        visible: false,
    });

    useEffect(() => {
        if (inputValue !== '' && email !== '' && inputName !== '') {
            setFull(true);
        } else {
            setFull(false);
        }
    }, [inputValue, email, inputName]);

    // 비밀번호 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setPasswordMatch(value === confirmValue); // 비밀번호와 비밀번호 확인 값 비교
    };

    // 비밀번호 확인 입력값 변경 핸들러
    const handleConfirmChange = (e) => {
        const value = e.target.value;
        setConfirmValue(value);
        setPasswordMatch(inputValue === value); // 비밀번호와 비밀번호 확인 값 비교
    };

    const handlePwState = () => {
        setPwType((prev) => ({
            type: prev.visible ? "password" : "text",
            visible: !prev.visible,
        }));
    };

    const isButtonActive = inputValue.length > 0;

    return (
        <div>
            <div className='Signup_wrap container'>
                <div className='main'>
                    <p className='signup-text'>회원가입</p>

                    <div className='name'>
                        <p>이름</p>
                        <div>
                            <input
                                value={inputName}
                                type='text'
                                className='name-input'
                                onChange={(e) => setInputName(e.target.value)} // 이름 필드 onChange 추가
                            />
                        </div>
                    </div>

                    <div className='email'>
                        <p>아이디</p>
                        <div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // 이메일 필드 onChange
                                type='text'
                                className='id'
                            />
                        </div>
                    </div>

                    <div className='password'>
                        <p>비밀번호</p>
                        <div>
                            <input
                                value={inputValue}
                                type={pwType.type}
                                className='pw'
                                placeholder='영문, 숫자 포함 8자 이상'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='password'>
                        <p>비밀번호확인</p>
                        <div>
                            <input
                                type={pwType.type}
                                className='pw'
                                placeholder='영문, 숫자 포함 8자 이상'
                                onChange={handleConfirmChange}
                            />
                        </div>
                    </div>

                    <div className='option'>
                        {passwordMatch === null ? (
                            <p>비밀번호를 입력하세요</p>
                        ) : passwordMatch ? (
                            <p style={{ color: 'black' }}>비밀번호가 일치합니다.</p>
                        ) : (
                            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
                        )}
                    </div>

                    <button
                        className={`submit-button ${full ? 'active' : ''}`}
                        disabled={!isButtonActive}
                    >
                        완료
                    </button>
                </div>

                {popup ? (
                    <div className="popup_wrap">
                        <div className="pop">
                            <img src={Error} alt="error img" />
                            <h3>{popupMsg}</h3>
                            <button onClick={() => { setPopup(false); }}>확인</button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Signup;
