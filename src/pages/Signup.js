import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const URL = 'http://54.180.8.46:8080';
    const [email, setEmail] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [inputName, setInputName] = useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const [full, setFull] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const [pwType, setPwType] = useState({
        type: "password",
        visible: false,
    });

    useEffect(() => {
        if (inputValue !== '' && email !== '' && inputName !== '' && confirmValue !== '') {
            setFull(true);
        } else {
            setFull(false);
        }
    }, [inputValue, email, inputName, confirmValue]);

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

    const isButtonActive = full && passwordMatch;

    // 회원가입 api 연결
    const handleSignup = async () => {
        const userData = {
            userId: email,
            password: inputValue,
            name: inputName,
        };

        try {
            const response = await axios.post(`${URL}/api/users/register`, userData);
            console.log('회원가입 성공:', response.data);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('이미 존재하는 아이디입니다.');
                alert('이미 존재하는 아이디입니다.')
            } else {
                setError('회원가입 중 오류가 발생했습니다.');
            }
        }
    };

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
                                value={confirmValue}
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
                        className={`submit-button ${full && passwordMatch ? 'active' : ''}`}
                        disabled={!isButtonActive}
                        onClick={handleSignup}
                    >
                        완료
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Signup;
