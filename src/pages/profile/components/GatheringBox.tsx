import { FaUsers } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import styles from './GatheringBox.module.scss';

export default function GatheringBox() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>참여중인 모임</p>
        <Link to="/나의모임페이지">
          <FaUsers className={styles.icon} />
        </Link>
      </div>
      <div className={styles.recentGathering}></div>
    </div>
  );
}
