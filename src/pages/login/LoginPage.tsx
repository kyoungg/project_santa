import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '/src/styles/login/loginPage.module.scss';
import kakao_login from '/images/kakao_login_large_wide.png';
import logo from '/images/logo.svg';
import { IoMailOutline } from 'react-icons/io5';
import { IoLockOpenOutline } from 'react-icons/io5';
import { postUserLogin } from '../../services/userApi';
import { paths } from '/src/utils/path';
import { loginSchema } from './loginSchema';
import { LoginData } from '../../services/userApi';
import { KAKAO_AUTH_URL } from '/src/utils/oauth';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (loginData: LoginData) => {
    mutate(loginData);
    console.log(loginData);
  };

  const { mutate, isError } = useMutation({
    mutationFn: postUserLogin,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      if (data.role === 'ADMIN') {
        localStorage.setItem('role', 'ADMIN');
      }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className={styles.inputContainer}>
                <IoMailOutline />
                <input type="text" {...register('email')} />
              </div>
              {errors.email && <p className={styles.inputErrorMessage}>{errors.email?.message}</p>}
            </div>
            <div>
              <div className={styles.inputContainer}>
                <IoLockOpenOutline />
                <input type="password" {...register('password')} />
              </div>
              {errors.password && <p className={styles.inputErrorMessage}>{errors.password?.message}</p>}
            </div>
            <div>
              <p className={styles.errorMessage}>{isError && '아이디 또는 비밀번호를 다시 확인 해 주세요.'}</p>
            </div>
            <button type="submit" className={styles.loginBtn}>
              로그인
            </button>
          </form>
          <div className={styles.loginMenuContainer}>
            <div
              onClick={() => {
                navigate(paths.FIND_PASSWORD);
              }}
            >
              비밀번호 찾기
            </div>
            <div className={styles.verticalLine}></div>
            <div
              className={styles.siginText}
              onClick={() => {
                navigate(paths.JOIN);
              }}
            >
              회원가입
            </div>
          </div>
          <div className={styles.socialLoginContainer}>
            <div className={styles.socialTop}>
              <div className={styles.line}></div>
              <div>소셜 로그인</div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.socialLoginIcon}>
              <Link to={KAKAO_AUTH_URL}>
                <img src={kakao_login} />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <img className={styles.logo} src={logo} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
