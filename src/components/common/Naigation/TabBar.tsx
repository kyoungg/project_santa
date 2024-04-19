import { Link } from 'react-router-dom';

import styles from './tabBar.module.scss';

const NAVLIST = [
  { title: '홈', icon: '🏠', path: '/' },
  { title: '실시간 채팅', icon: '💬', path: '/livechat' },
  { title: '내 모임', icon: '📋', path: '/gathering' },
  { title: '랭킹', icon: '🏅', path: '/rank' },
  { title: '내 정보', icon: '👥', path: '/profile' },
];

export default function TabBar() {
  return (
    <div className={styles.tabBarContainer}>
      <ul>
        {NAVLIST.map((item) => {
          return (
            <li className={styles.tabBtn}>
              <Link to={item.path}>
                <p className={styles.icon}>{item.icon}</p>
                <p>{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
