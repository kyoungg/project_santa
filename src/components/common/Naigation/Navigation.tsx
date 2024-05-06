import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';

import logo from '/images/logo.svg';
import styles from '/src/styles/components/common/navigation.module.scss';
import UserProfile from './UserProfile';
import { NAVLIST, paths } from '/src/utils/path';
import logout from '/src/utils/logout';
import { getRefreshToken } from '/src/services/auth';

export default function Navigation({ back }: { back: boolean }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const isLogin = getRefreshToken();

  const hideNav = useCallback((e: MouseEvent) => {
    if (navRef.current === null) {
      return;
    }
    if (!navRef.current.contains(e.target as HTMLElement)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', hideNav, true);
    return () => {
      document.removeEventListener('click', hideNav, true);
    };
  }, [hideNav]);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const HambergerBtn = () => {
    return (
      <button onClick={onClick} className={styles.btn}>
        <GiHamburgerMenu size="30" color="white" />
      </button>
    );
  };

  const BackBtn = () => {
    return (
      <button
        onClick={() => {
          navigate(-1);
        }}
        className={styles.btn}
      >
        <IoIosArrowBack size="30" color="white" />
      </button>
    );
  };

  const handleAuth = () => {
    if (isLogin) {
      return logout();
    } else {
      return navigate(paths.LOGIN);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={isOpen ? styles.darkBg : ''}>
        {back ? <BackBtn /> : <HambergerBtn />}
        <div className={isOpen ? styles.navOpen : styles.navClose} ref={navRef}>
          <Link to="/" onClick={onClick}>
            <img src={logo} className={styles.logo} />
          </Link>
          <div className={styles.navContainer}>
            <div className={styles.userBox}>{!back && <UserProfile />}</div>
            <div className={styles.linkBox}>
              <ul>
                {NAVLIST.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} onClick={onClick}>
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li className={styles.logoutBtn} onClick={handleAuth}>
                  {!isLogin ? '로그인' : '로그아웃'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
