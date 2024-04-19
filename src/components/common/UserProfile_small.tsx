import styles from '../../styles/components/common/userProfile.module.scss';
type Props = {
  name: string;
  imageUrl?: string;
};

export const UserProfile_small = ({ imageUrl = '/images/defaultProfile.png', name }: Props) => {
  return (
    <div className={styles.container}>
      <img src={imageUrl} className={styles.image}></img>
      <div className={styles.font}>{name}님</div>
    </div>
  );
};
