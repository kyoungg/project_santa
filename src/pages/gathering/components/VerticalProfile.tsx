import styles from '../../../styles/gathering/verticalProfile.module.scss';
type ProfileProps = {
  name: string;
  imageUrl: string;
};
export function VerticalProfile(props: ProfileProps) {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.imgContainer}>
        <img src={props.imageUrl}></img>
      </div>
      <div className={styles.userName}>{props.name}</div>
    </div>
  );
}
