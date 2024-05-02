import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyMountains } from '/src/services/challengeApi';

import { PiMedal } from 'react-icons/pi';
import styles from './Achievements.module.scss';
import mountain from '/images/mountain.png';

// interface Record {
//   name: string;
//   height: number;
//   location: string;
//   climbDate: string;
// }

// const totalHeight = RECORD.reduce((prev, current) => {
//   return prev + current.height;
// }, 0);

// const totalSummit = RECORD.length;

export default function AchievementsBox() {
  const navigate = useNavigate();

  const { data: myMountains } = useQuery({
    queryKey: ['allChallenge'],
    queryFn: getMyMountains,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log('myMountains', myMountains?.data);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>나의 기록</p>
        <Link to="/나의업적페이지">
          <PiMedal className={styles.icon} />
        </Link>
      </div>
      <div className={styles.records}>
        <div className={styles.achievName}>총 높이</div>
        {/* <p>{totalHeight.toFixed(1)} M</p> */}
        <div className={styles.achievName}>정복한 정상</div>
        {/* <p>{totalSummit} 개</p> */}
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.certificationBtn}
          onClick={() => {
            navigate('/산인증페이지');
          }}
        >
          인증하기
        </button>
        <div className={styles.imgContainer}>
          <img className={styles.mountainImg} src={mountain} />
        </div>
      </div>
    </div>
  );
}
