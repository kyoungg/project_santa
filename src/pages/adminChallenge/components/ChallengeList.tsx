import { Link } from 'react-router-dom';
import styles from '../AdminChallenge.module.scss';
import { paths } from '/src/utils/path';
interface ChallengeListProps {
  challengeList: ChallengeProps[];
  onDelete: (id: number) => void;
}
interface ChallengeProps {
  id: number;
  name: string;
  description: string;
  image: string;
  category: {
    name: string;
  };
  clearStandard: number;
}

export default function ChallengeList({ challengeList, onDelete }: ChallengeListProps) {
  return (
    <div className={styles.listContainer}>
      {challengeList.map((challenge: ChallengeProps) => {
        return (
          <div key={challenge.id} className={styles.challengeCard}>
            <div className={styles.imgWrapper}>
              <img src={challenge.image} className={styles.listImg} />
            </div>
            <div className={styles.textContainer}>
              <div className={styles.titleWrapper}>
                <p>{challenge.name}</p>
              </div>
              <div className={styles.textWrapper}>
                <p>{challenge.description}</p>
              </div>
            </div>
            <div className={styles.btnWrapper}>
              <Link to={`${paths.ADMIN_CHALLENGE_DETAIL_EDIT}/${challenge.id}`} className={styles.listBtn}>
                <p>수정</p>
              </Link>
              <div onClick={() => onDelete(challenge.id)} className={styles.delBtn}>
                <p>삭제</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
