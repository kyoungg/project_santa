import styles from './UserProfile.module.scss';
import useUserInfo from '/src/hooks/useUserInfo';

//유저 랭킹도 요구
const USERANK = 7777;

export default function UserProfile() {
  const userInfo = useUserInfo();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userProfile}>
        <img src={userInfo?.image} alt="유저 이미지" />
        <div className={styles.rankBox}>
          <p>내 랭킹🏅</p>
          <p>{USERANK}</p>
        </div>
      </div>
      <div className={styles.textBox}>
        <p>반갑습니다 {userInfo ? userInfo?.nickname : '비회원'}님!</p>
        <p>오늘도 즐거운 등산 되세요😄</p>
      </div>
    </div>
  );
}
