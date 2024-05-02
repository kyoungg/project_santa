import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

import styles from '/src/styles/login/loginPage.module.scss';
import googleIcon from '/images/google.svg';
import kakaoIcon from '/images/kakao.png';
import { IoMailOutline } from 'react-icons/io5';
import { IoLockOpenOutline } from 'react-icons/io5';
import { LoginResponse, postUserLogin } from '../../services/userApi';
// import { paths } from '/src/utils/path';
// import { loginSchema } from './loginSchema';
import { LoginData } from '../../services/userApi';

function LoginPage() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(loginSchema),
  // });

  const navigate = useNavigate();

  // const onSubmit = (loginData: LoginData) => {
  //   mutate(loginData);
  //   console.log(loginData);
  // };

  // const { mutate, isError } = useMutation<LoginResponse, Error, LoginData>({
  const { isError } = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: (loginData) => postUserLogin(loginData),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      navigate('/');
    },
    onError: (error) => {
      console.log('login error', error);
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.textContainer}>
          <div className={styles.text}>LOGIN</div>
          <div className={styles.description}>로그인 하시면 더 다양한 기능을 이용하실 수 있습니다</div>
        </div>
        <div className={styles.middleContainer}>
          {/* <form onSubmit={handleLoginSubmit}> */}
          <form >
            <div className={styles.inputContainer}>
              <IoMailOutline />
              {/* <input type="text" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} /> */}
            </div>
            <div className={styles.inputContainer}>
              <IoLockOpenOutline />
              {/* <input type="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} /> */}
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
