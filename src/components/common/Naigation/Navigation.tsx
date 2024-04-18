import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import logo from '../../../../public/images/logo.svg';
import styles from '../../../styles/components/common/navigation.module.scss';
import UserProfile from './UserProfile';

const NAVLIST = [
  { title: '내 프로필', path: '/porfile' },
  { title: '랭킹', path: '/rank' },
  { title: '진행중인 챌린지', path: '/challenge' },
  { title: '내 모임 바로가기', path: '/myclub' },
  { title: '실시간 채팅', path: '/livechat' },
  { title: '모임 만들기', path: '/createclub' },
  { title: '설정', path: '/setting' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const outside = useRef<any>();

  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsie);
    return () => {
      document.removeEventListener('mousedown', handlerOutsie);
    };
  });
  const handlerOutsie = (e: MouseEvent) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={isOpen ? styles.darkBg : ''}>
          <button onClick={onClick} className={styles.hambergerBtn}>
            <GiHamburgerMenu size="30" color="white" />
          </button>
          <div className={isOpen ? styles.navOpen : styles.navClose} ref={outside}>
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
    </div>
  );
}
