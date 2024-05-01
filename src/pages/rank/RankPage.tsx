import Top3UserRank from './components/Top3UserRank';
import styles from './rankPage.module.scss';

// import { useQuery } from '@tanstack/react-query';
// import { getRanks } from '/src/services/ranks';

interface UserRankInfo {
  rankId: string;
  rank: number;
  profileImg: string;
  nickname: string;
  score: number;
}

const MOCKUP_USER: UserRankInfo[] = [
  {
    rankId: '123124',
    rank: 1,
    profileImg: '',
    nickname: '산타대통령',
    score: 13414,
  },
  {
    rankId: '123124',
    rank: 2,
    profileImg: '',
    nickname: '산타대통령',
    score: 13414,
  },
  {
    rankId: '123124',
    rank: 3,
    profileImg: '',
    nickname: '산타대통령',
    score: 13414,
  },
  {
    rankId: '123124',
    rank: 4,
    profileImg: '',
    nickname: '산타대통령',
    score: 13414,
  },
  {
    rankId: '123124',
    rank: 5,
    profileImg: '',
    nickname: '산타대통령',
    score: 13414,
  },
  {
    rankId: '123124',
    rank: 6,
    profileImg: '',
    nickname: '산타대통령',
    score: 13414,
  },
];

export default function RankPage() {
  // const { _data } = useQuery({ queryKey: ['rank'], queryFn: getRanks });
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
            <div className={styles.userRankItem} key={user.rankId}>
              <div className={styles.rankWrapper}>
                <div className={styles.userRank}>{user.rank}</div>
                <div className={styles.profileImgContainer}>{user.profileImg}</div>
              </div>
              <div className={styles.userNickname}>{user.nickname}</div>
              <div className={styles.userScore}>{user.score}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.myScoreInfo}>
        <div className={styles.userRank}>1등</div>
        <div className={styles.profileImg}></div>
        <div className={styles.nickname}>진채영</div>
        <div className={styles.score}>9999</div>
      </div>
    </div>
  );
}
