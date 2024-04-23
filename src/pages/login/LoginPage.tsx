//loginPage
import { IoMailOutline } from 'react-icons/io5';
import { IoLockOpenOutline } from 'react-icons/io5';
import '../../styles/login/loginStyle.scss';

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-text-container">
        <div className="login-text">LOGIN</div>
        <div className="login-description">로그인 하시면 더 다양한 기능을 이용하실 수 있습니다</div>
      </div>
      <div className="input-container">
        <form>
          <div className="email input-container">
            <IoMailOutline className="mail-icon" />
            <input type="email"></input>
          </div>
          <div className="password input-container">
            <IoLockOpenOutline />
            <input type="password"></input>
          </div>
          <button type="submit" className="login-btn" onClick={(e) => e.preventDefault()}>
            로그인
          </button>
        </form>
        <div className="login-menu-container">
          <div>아이디 찾기</div>
          <div className="vertical-line"></div>
          <div>비밀번호 찾기</div>
          <div className="vertical-line"></div>
          <div>회원가입</div>
        </div>
      </div>
      <div className="social-login-container">
        <div>소셜 계정으로 로그인</div>
        <div className="social-login-icon">
          <div>kakao</div>
          <div>google</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
