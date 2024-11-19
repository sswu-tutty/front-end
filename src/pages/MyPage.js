import React, { useEffect, useState } from 'react';
import FooterBar from "../components/FooterBar";
import { FaHeart, FaCog, FaKey, FaUserEdit, FaSignOutAlt, FaRunning } from 'react-icons/fa';
import profile from "../assets/profile.png"
import axios from 'axios';

const MyPage = () => {
    const URL = 'http://52.78.72.117:8080';
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");

    // 사용자 이름 조회 API 연결
    useEffect(() => {
        // 토큰 가져오기
        const token = localStorage.getItem("authToken");

        if (token) {
            // 사용자 정보 조회 API 호출
            const fetchUserName = async () => {
                try {
                    const response = await axios.get(`${URL}/api/users/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setUserName(response.data.name);
                } catch (error) {
                    console.error("사용자 정보 조회 실패:", error);
                    setError("사용자 정보를 불러오는 데 실패했습니다.");
                }
            };

            fetchUserName();
        } else {
            setError("로그인 정보가 없습니다.");
        }
    }, []);


    return (
        <div className="Mypage_wrap container">
            <div className="profile-card">
                <div className="profile-icon">
                    <img className="profile" src={profile}></img>
                </div>
                <h3>{userName || "사용자 이름"}</h3>
            </div>


            <div className="menu-section">
                <div className="menu-1">
                    <div className="menu-item">
                        <FaHeart className="menu-icon heart" />
                        <span>즐겨찾기</span>
                    </div>
                    <div className="menu-item">
                        <FaCog className="menu-icon settings" />
                        <span>환경설정</span>
                    </div>
                    <div className="menu-item">
                        <FaKey className="menu-icon key" />
                        <span>비밀번호 변경</span>
                    </div>
                </div>


                <div className="menu-2">
                    <div className="menu-item">
                        <FaUserEdit className="menu-icon user-edit" />
                        <span>회원정보 수정</span>
                    </div>
                    <div className="menu-item">
                        <FaSignOutAlt className="menu-icon logout" />
                        <span>로그아웃</span>
                    </div>
                    <div className="menu-item">
                        <FaRunning className="menu-icon withdraw" />
                        <span>회원탈퇴</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;