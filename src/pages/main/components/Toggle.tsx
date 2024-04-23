import styles from '../mainPage.module.scss';

export default function Toggle() {
  return (
    <div className={styles.toggle}>
      <div className={styles.toggleHandler}>인기</div>
    </div>
  );
}
