import { Button } from '../../components/common/Button';
import { useQuery } from '@tanstack/react-query';

import AchievementsBox from './components/AchievementsBox';
import CategoryBox from './components/CategoryBox';
import GatheringBox from './components/GatheringBox';
import TrophyBox from './components/TrophyBox';
import styles from './profile.module.scss';
import LoginBtn from './components/LoginBtn';
import kakaoLogo from '/images/kakao.png';
import googleLogo from '/images/google.svg';
import { getUserInfo } from '/src/services/userApi';
import { useNavigate } from 'react-router-dom';
import { paths } from '/src/utils/path';

export default function ProfilePage() {
  const navigation = useNavigate();
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (data) => data.data,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img className={styles.userImg} src={userInfo?.image} />
        <div className={styles.userName}>{userInfo?.nickname}</div>
        <div className={styles.btn}>
          <Button
            variant={'rounded-outline'}
            children={'프로필 수정'}
            onClick={() => {
              navigation(paths.PROFILE_EDIT);
            }}
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <TrophyBox />
        <div className={styles.middle}>
          <div className={styles.left}>
            <CategoryBox />
            <GatheringBox />
          </div>
          <div className={styles.right}>
            <AchievementsBox />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <LoginBtn loginType={'kakao'} imgUrl={kakaoLogo} />
        <LoginBtn loginType={'google'} imgUrl={googleLogo} state={'연동하기'} />
        <button className={styles.withdrawalBtn}>회원 탈퇴</button>
      </div>
    </div>
  );
}
