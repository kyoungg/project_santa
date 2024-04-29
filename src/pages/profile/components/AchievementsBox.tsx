import { Link, useNavigate } from 'react-router-dom';
import { PiMedal } from 'react-icons/pi';
// import { useQuery } from '@tanstack/react-query';
// import { getMyMountains } from '/src/services/userApi';

import styles from './Achievements.module.scss';
import mountain from '/images/mountain.png';

interface Record {
  name: string;
  height: number;
  location: string;
  climbDate: string;
}

const RECORD: Record[] = [
  {
    name: '1',
    height: 1050.9,
    location: '강원도 홍천군~',
    climbDate: '0417',
  },
  {
    name: '2',
    height: 1050.9,
    location: '강원도 홍천군~',
    climbDate: '0417',
  },
  {
    name: '3',
    height: 1050.9,
    location: '강원도 홍천군~',
    climbDate: '0417',
  },
];

const totalHeight = RECORD.reduce((prev, current) => {
  return prev + current.height;
}, 0);

const totalSummit = RECORD.length;

export default function AchievementsBox() {
  const navigate = useNavigate();
  // const { data: myMountains } = useQuery({
  //   queryKey: ['allChallenge'],
  //   queryFn: getMyMountains,
  //   select: (data) => data.data,
  //   staleTime: Infinity,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });
  // console.log(myMountains);

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
        <p>{totalHeight.toFixed(1)} M</p>
        <div className={styles.achievName}>정복한 정상</div>
        <p>{totalSummit} 개</p>
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
