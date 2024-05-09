import styles from '../rankPage.module.scss';
import { Rank } from '/src/services/ranks';

interface top3usersProps {
  top3users: Rank[];
}
export default function Top3UserRank({ top3users }: top3usersProps) {
  return (
    <div className={styles.top3UserWrapper}>
      <div className={styles.itemWrapper}>
        <div className={styles.userProfileWrapper}>
          <div className={styles.top3userImgWrapper} style={{ borderColor: '#FFE456' }}>
            <img src={`${top3users[0].image}`} className={styles.userImg} />
          </div>
          <div className={styles.userNickname}>{top3users[0].nickname}</div>
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <div className={styles.userProfileWrapper}>
          <div className={styles.top3userImgWrapper} style={{ borderColor: '#BABABA' }}>
            <img src={`${top3users[1].image}`} className={styles.userImg} />
          </div>
          <div className={styles.userNickname}>{top3users[1].nickname}</div>
        </div>
        <div className={styles.userProfileWrapper}>
          <div className={styles.top3userImgWrapper} style={{ borderColor: '#AA9481' }}>
            <img src={`${top3users[2].image}`} className={styles.userImg} />
          </div>
          <div className={styles.userNickname}>{top3users[2].nickname}</div>
        </div>
      </div>
    </div>
  );
}
