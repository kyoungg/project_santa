import { useNavigate } from 'react-router-dom';

import styles from './tabBar.module.scss';
import { IoHomeSharp } from 'react-icons/io5';
import { FaMountain } from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';
import { GoPersonFill } from 'react-icons/go';
import { SiClubhouse } from 'react-icons/si';
import { paths } from '/src/utils/path';

export const TABBARLIST = [
  { title: '홈', icon: <IoHomeSharp />, path: paths.HOME },
  { title: '산 목록', icon: <FaMountain />, path: paths.MOUNTAIN },
  { title: '모임', icon: <SiClubhouse />, path: paths.GATHERING },
  { title: '랭킹', icon: <FaRankingStar />, path: paths.RANK },
  { title: '내 정보', icon: <GoPersonFill />, path: paths.PROFILE },
];

export default function TabBar() {
  const navigation = useNavigate();
  return (
    <div className={styles.tabBarContainer}>
      <ul>
        {TABBARLIST.map((tab) => {
          return (
            <li
              className={styles.tabBtn}
              onClick={() => {
                navigation(tab.path);
              }}
              key={tab.path}
            >
              <div className={styles.icon}>{tab.icon}</div>
              <p className={styles.name}>{tab.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
