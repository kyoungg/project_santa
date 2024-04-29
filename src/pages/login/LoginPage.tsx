import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import styles from '/src/styles/login/loginPage.module.scss';
import googleIcon from '/images/google.svg';
import kakaoIcon from '/images/kakao.png';
import { IoMailOutline } from 'react-icons/io5';
import { IoLockOpenOutline } from 'react-icons/io5';
import { postUserLogin, getUserInfo } from '../../services/userApi';

function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { mutate, isError } = useMutation({
    mutationFn: () => postUserLogin(loginData),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      // refetch();
      navigate('/');
    },
    onError: (error) => {
      console.log('login error', error);
    },
  });

  // const { refetch } = useQuery({
  //   queryKey: ['userInfo'],
  //   queryFn: getUserInfo,
  //   select: (data) => data.data,
  //   staleTime: Infinity,
  //   enabled: false,
  // });

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //유효성 검사 필요
    mutate(loginData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.textContainer}>
          <div className={styles.text}>LOGIN</div>
          <div className={styles.description}>로그인 하시면 더 다양한 기능을 이용하실 수 있습니다</div>
        </div>
        <div className={styles.middleContainer}>
          <form onSubmit={handleLoginSubmit}>
            <div className={styles.inputContainer}>
              <IoMailOutline />
              <input type="text" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            </div>
            <div className={styles.inputContainer}>
              <IoLockOpenOutline />
              <input type="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            </div>
            <div className={styles.errorMessage}>
              <p>{isError && '아이디 또는 비밀번호를 다시 확인 해 주세요.'}</p>
            </div>
            <button type="submit" className={styles.loginBtn}>
              로그인
            </button>
          </form>
          <div className={styles.loginMenuContainer}>
            <div>아이디 찾기</div>
            <div className={styles.verticalLine}></div>
            <div>비밀번호 찾기</div>
            <div className={styles.verticalLine}></div>
            <div className={styles.siginText}>회원가입</div>
          </div>
        </div>
        <div className={styles.socialLoginContainer}>
          <div>소셜 계정으로 로그인</div>
          <div className={styles.socialLoginIcon}>
            <img src={kakaoIcon} />
            <img src={googleIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
