import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';

import logo from '/images/logo.svg';
import styles from '/src/styles/components/common/navigation.module.scss';
import UserProfile from './UserProfile';

const NAVLIST = [
  { title: '내 프로필', path: '/profile' },
  { title: '랭킹', path: '/rank' },
  { title: '진행중인 챌린지', path: '/challenge' },
  { title: '내 모임 바로가기', path: '/gathering' },
  { title: '실시간 채팅', path: '/livechat' },
  { title: '모임 만들기', path: '/createclub' },
  { title: '회원가입', path: '/join' },
];

export default function Navigation({ back }: { back: boolean }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className={styles.header}>
      <nav className={isOpen ? styles.darkBg : ''}>
        {back ? <BackBtn /> : <HambergerBtn />}
        <div className={isOpen ? styles.navOpen : styles.navClose} ref={navRef}>
          <Link to="/" onClick={onClick}>
            <img src={logo} className={styles.logo} />
          </Link>
          <div className={styles.navContainer}>
            <div className={styles.userBox}>
              <UserProfile />
            </div>
            <div className={styles.linkBox}>
              <ul>
                {NAVLIST.map((item) => (
                  <li>
                    <Link to={item.path} onClick={onClick}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
