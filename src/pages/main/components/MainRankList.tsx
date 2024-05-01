import styles from '../mainPage.module.scss';
import { Rank } from '/src/services/ranks';

interface Ranks {
  ranks: Rank[];
}

export default function MainRankList({ ranks }: Ranks) {
  return (
    <div className={styles.rankListBox}>
      {ranks.map((rank: Rank) => (
        <div key={`${rank.id}`} className={styles.rankItemWrapper}>
          <div className={styles.userRank}>{rank.rank}</div>
          <div className={styles.profileImgWrapper}>
            <div className={styles.userProfileImg}>img넣기</div>
          </div>
          <div className={styles.userNickname}>{rank.nickname}</div>
          <div className={styles.userScore}>{rank.score}</div>
        </div>
      ))}
    </div>
  );
}
