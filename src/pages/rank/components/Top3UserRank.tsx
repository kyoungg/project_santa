import styles from '../rankPage.module.scss';

export default function Top3UserRank() {
  return (
    <div className={styles.top3UserWrapper}>
      <div className={styles.itemWrapper}>
        <div className={styles.userProfileWrapper}>
          <div className={styles.userProfileImgWrapper}></div>
          <div className={styles.userNickname}>산타대통령</div>
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <div className={styles.userProfileWrapper}>
          <div className={styles.userProfileImgWrapper}></div>
          <div className={styles.userNickname}>산타반장</div>
        </div>
        <div className={styles.userProfileWrapper}>
          <div className={styles.userProfileImgWrapper}></div>
          <div className={styles.userNickname}>산타대장</div>
        </div>
      </div>
    </div>
  );
}
