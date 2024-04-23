import styles from '../mainPage.module.scss';

interface UserList {
  userId: string;
  rank: string;
  userProfileImg: string;
  userNickname: string;
  userScore: string;
}

const MOCKUP_USER: UserList[] = [
  { userId: '1', rank: '1', userProfileImg: '', userNickname: '우람찬 바위', userScore: '123214' },
  { userId: '2', rank: '2', userProfileImg: '', userNickname: '설악산 날다람쥐', userScore: '123214' },
  { userId: '3', rank: '3', userProfileImg: '', userNickname: '해맑은 고라니', userScore: '123214' },
  { userId: '4', rank: '4', userProfileImg: '', userNickname: '바다 거북이', userScore: '123214' },
  { userId: '5', rank: '5', userProfileImg: '', userNickname: '토끼와 엘리스', userScore: '123214' },
];
export default function MainRankList() {
  return (
    <div className={styles.rankListBox}>
      {MOCKUP_USER.map((user) => (
        <div key={`${user.userId}`} className={styles.rankItemWrapper}>
          <div className={styles.userRank}>{user.rank}</div>
          <div className={styles.profileImgWrapper}>
            <div className={styles.userProfileImg}>{user.userProfileImg}</div>
          </div>
          <div className={styles.userNickname}>{user.userNickname}</div>
          <div className={styles.userScore}>{user.userScore}</div>
        </div>
      ))}
    </div>
  );
}
