import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { VertifyMountain, getMyMountains } from '/src/services/mountainAPi';

import { PiMedal } from 'react-icons/pi';
import styles from './Achievements.module.scss';
import mountain from '/images/mountain.png';
import { paths } from '/src/utils/path';

const getTotalHeight = (data: VertifyMountain[]) => {
  const totalHeight = data.reduce((prev, current) => {
    return prev + current.mountain.height;
  }, 0);
  return totalHeight.toFixed(1);
};

export default function AchievementsBox() {
  const navigation = useNavigate();

  const {
    data: myMountains,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['myMountains'],
    queryFn: getMyMountains,
    select: (data) => data.data.content,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const SUCCESS = !isError && isFetched;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>나의 기록</p>
        <PiMedal
          className={styles.icon}
          onClick={() => {
            navigation(paths.MOUNTAIN_RECORD);
          }}
        />
      </div>
      <div className={styles.records}>
        <div className={styles.achievName}>총 높이</div>
        <p>{SUCCESS ? getTotalHeight(myMountains) : 0} M</p>
        <div className={styles.achievName}>정복한 정상</div>
        <p>{SUCCESS ? myMountains.length : 0} 개</p>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.certificationBtn}
          onClick={() => {
            navigation(paths.MOUNTAIN_VERTIFY);
          }}
        >
          인증하러 가기
        </button>
        <div className={styles.imgContainer}>
          <img className={styles.mountainImg} src={mountain} />
        </div>
      </div>
    </div>
  );
}
