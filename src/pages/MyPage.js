import FooterBar from "../components/FooterBar";
import { FaHeart, FaCog, FaKey, FaUserEdit, FaSignOutAlt, FaRunning } from 'react-icons/fa';
import profile from "../assets/profile.png"

const MyPage = () => {
    return (
        <div className="Mypage_wrap container">
            <div className="profile-card">
                <div className="profile-icon">
                    <img className="profile" src={profile}></img>
                </div>
                <h3>김수정</h3>
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