//loginPage
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { IoMailOutline } from 'react-icons/io5';
import { IoLockOpenOutline } from 'react-icons/io5';
import '../../styles/login/loginStyle.scss';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginData = { email: email, password: password };
  const navigate = useNavigate();

  type LoginForm = {
    email: string;
    password: string;
  };

  const postLogin = useMutation({
    mutationFn: (loginData: LoginForm) => axios.post(`http://43.200.136.37:8080/api/users/sign-in`, loginData),
    onSuccess: (data) => {
      localStorage.setItem('access', data.data.accessToken);
      localStorage.setItem('refresh', data.data.refreshToken);
      navigate('/');
    },
    onError: (data) => {
      console.log('아임 에러!!!!', data);
      alert('로그인 다시 시도해주세유 :(');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postLogin.mutate(loginData);
  };

  return (
    <div className="login-container">
      <div className="login-text-container">
        <div className="login-text">LOGIN</div>
        <div className="login-description">로그인 하시면 더 다양한 기능을 이용하실 수 있습니다</div>
      </div>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <div className="email input-container">
            <IoMailOutline className="mail-icon" />
            <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div className="password input-container">
            <IoLockOpenOutline />
            <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <button type="submit" className="login-btn">
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
