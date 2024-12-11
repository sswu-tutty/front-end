import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.png";
import Start from "../components/Start";
import axios from 'axios';

const Login = ({ setLogin }) => {
    // const URL = 'http://54.180.8.46:8080';
    // Netlify 배포와 로컬 환경에 따라 동적으로 URL 설정
    const URL =
        window.location.hostname === "localhost"
            ? 'http://54.180.8.46:8080'
            : '/api'; // Netlify에서는 "/api"를 사용
            
    const [email, setEmain] = useState('')
    const [inputValue, setInputValue] = useState('');
    const [full, setFull] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState('존재하지 않는 정보입니다')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const [pwType, setpwType] = useState({
        type: "password",
        visible: false,
    })

    // input값 변경 핸들러
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlePwState = () => {
        setpwType(() => {
            if (!pwType.visible) {
                return { type: "text", visible: true }
            } else {
                return { type: "password", visible: false }
            }
        })
    }

    const isButtonActive = inputValue.length > 0;

    const joinClick = () => {
        navigate('/Signup');
    }

    useEffect(() => {
        localStorage.setItem('login', false);
    }, [])

    // 시작 화면 로딩 상태를 2초 후에 해제
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // 2초 후 로딩 해제

        return () => clearTimeout(timer);
    }, []);

    // 로딩 화면을 표시할 때
    if (loading) {
        return <Start />;
    }

    // 로그인 API 연결
    const handleLogin = async () => {
        const userData = {
            userId: email,
            password: inputValue,
        };

        try {
            const response = await axios.post(`${URL}/api/users/login`, userData);
            console.log('로그인 성공:', response.data);
            setLogin(true);
            localStorage.setItem('login', 'true'); // 로그인 상태를 로컬스토리지에 저장

            // 토큰이 응답에 포함되어 있을 때
            if (response.data.token) {
                // 토큰 로컬스토리지에 저장
                localStorage.setItem('authToken', response.data.token);
                console.log('토큰 저장됨:', response.data.token);

            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('로그인 정보가 올바르지 않습니다.');
                alert('로그인 정보가 올바르지 않습니다.');
            } else {
                setError('로그인 중 오류가 발생했습니다.');
            }
        }
    };


    return (
        <div>
            <div className='Login_wrap container'>
                <img src={Logo} className="logo_img" />

                <div className='main'>

                    <div className='email'>
                        <p>아이디</p>
                        <div>
                            <input
                                value={email}
                                onChange={(e) => { setEmain(e.target.value) }}
                                type='text'
                                className='id' />
                        </div>
                    </div>
                    <div className='password'>
                        <p>비밀번호</p>
                        <div>
                            <input
                                type={pwType.type}
                                className='pw'
                                placeholder='영문, 숫자 포함 8자 이상'
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button
                        className={`submit-button ${full ? 'active' : ''}`}
                        disabled={!isButtonActive}
                        onClick={handleLogin}
                    >
                        로그인
                    </button>

                    <div className='option'>
                        <p>계정이 없으신가요?</p>
                        <p className='join' onClick={joinClick}>가입하기</p>
                    </div>
                </div>

                {popup ? (
                    <div className="popup_wrap">
                        <div className="pop">
                            <img src={Error} alt="error img" />
                            <h3>{popupMsg}</h3>
                            <button onClick={() => { setPopup(false) }}>확인</button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Login;