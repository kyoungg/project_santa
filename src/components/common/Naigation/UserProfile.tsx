import { useQuery } from '@tanstack/react-query';
import styles from './UserProfile.module.scss';

import defaultImage from '/images/defaultProfile.png';
import useUserInfo from '/src/hooks/useUserInfo';
import { getUserRank } from '/src/services/userApi';

export const onErrorImg: React.ReactEventHandler<HTMLImageElement> = (e) => {
  const target = e.target as HTMLImageElement;
  target.src = defaultImage;
};

export default function UserProfile() {
  const { data: userRank } = useQuery({ queryKey: ['userRank'], queryFn: getUserRank });
  const userInfo = useUserInfo();

  const ROLE = localStorage.getItem('role');

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userProfile}>
        {ROLE ? <img src={userInfo?.image} /> : <img src={defaultImage} />}
        <div className={styles.rankBox}>
          <p>내 점수🏅</p>
          <p>{userRank?.score}</p>
        </div>
      </div>
      <div className={styles.textBox}>
        <p>반갑습니다 {!ROLE ? '비회원' : ROLE === 'GUEST' ? '게스트' : userInfo?.nickname}님!</p>
        <p>오늘도 즐거운 등산 되세요😄</p>
      </div>
    </div>
  );
}
