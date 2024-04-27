import { useQuery } from '@tanstack/react-query';
import styles from './UserProfile.module.scss';
import { getUserInfo } from '/src/services/userApi';

//유저 랭킹도 요구
const USERANK = 7777;

export default function UserProfile() {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (data) => data.data,
  });

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userProfile}>
        <img src={userInfo?.image} />
        <div className={styles.rankBox}>
          <p>내 랭킹🏅</p>
          <p>{USERANK}점</p>
        </div>
      </div>
      <div className={styles.textBox}>
        <p>반갑습니다 {userInfo?.nickname}님!</p>
        <p>오늘도 즐거운 등산 되세요😄</p>
      </div>
    </div>
  );
}
