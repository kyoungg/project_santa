import Top3UserRank from './components/Top3UserRank';

import styles from './rankPage.module.scss';

interface UserRankInfo {
  userId: string;
  rank: number;
  userProfileImg: string;
  userNickname: string;
  userScore: number;
}

const MOCKUP_USER: UserRankInfo[] = [
  {
    userId: '123124',
    rank: 1,
    userProfileImg: '',
    userNickname: '산타대통령',
    userScore: 13414,
  },
  {
    userId: '1231f24',
    rank: 2,
    userProfileImg: '',
    userNickname: '산타대통령',
    userScore: 13414,
  },
  {
    userId: '1231d24',
    rank: 4,
    userProfileImg: '',
    userNickname: '산타대통령',
    userScore: 13414,
  },
  {
    userId: '123g124',
    rank: 5,
    userProfileImg: '',
    userNickname: '산타대통령',
    userScore: 13414,
  },
  {
    userId: '12312a4',
    rank: 6,
    userProfileImg: '',
    userNickname: '산타대통령',
    userScore: 13414,
  },
  {
    userId: '1231a24',
    rank: 7,
    userProfileImg: '',
    userNickname: '산타대통령',
    userScore: 13414,
  },
];

export default function RankPage() {
  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>랭킹🏅</p>
          <div className={styles.subtitleWrapper}>
            <p className={styles.subtitle}>이달의 랭킹을 확인해보세요. &nbsp 랭킹은 매달 1일 초기화됩니다.</p>
          </div>
        </div>
        <Top3UserRank />
        <div className={styles.userRankBoxTitle}>
          <div>순위</div>
          <div>닉네임</div>
          <div>점수</div>
        </div>
        <div className={styles.userRankListWrapper}>
          {MOCKUP_USER.map((user) => (
            <div className={styles.userRankItem} key={user.userId}>
              <div className={styles.rankWrapper}>
                <div className={styles.userRank}>{user.rank}</div>
                <div className={styles.userProfileImgContainer}>{user.userProfileImg}</div>
              </div>
              <div className={styles.userNickname}>{user.userNickname}</div>
              <div className={styles.userScore}>{user.userScore}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.myScoreInfo}>
        <div className={styles.userRank}>1등</div>
        <div className={styles.userProfileImg}></div>
        <div className={styles.userNickname}>진채영</div>
        <div className={styles.userScore}>9999</div>
      </div>
    </div>
  );
}
