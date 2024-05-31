import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyMountains } from '/src/services/mountainAPi';

import { PiMedal } from 'react-icons/pi';
import styles from './Achievements.module.scss';
import mountain from '/images/mountain.png';
import { paths } from '/src/utils/path';
import useUserInfo from '/src/hooks/useUserInfo';

export default function AchievementsBox() {
  const userInfo = useUserInfo();
  const navigation = useNavigate();

  const {
    data: myMountains,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['myMountains'],
    queryFn: getMyMountains,
    select: (data) => data.data.content,
  });

  const userMountain = userInfo?.accumulatedHeight;

  const isSuccess = !isError && isFetched;
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
        <p>{isSuccess && userMountain ? Math.floor(userMountain).toLocaleString() : 0} M</p>
        <div className={styles.achievName}>정복한 정상</div>
        <p>{isSuccess ? myMountains.length : 0} 개</p>
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
