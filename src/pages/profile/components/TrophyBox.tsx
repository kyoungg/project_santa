import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { GoTrophy } from 'react-icons/go';
import styles from './TrophyBox.module.scss';
import { paths } from '/src/utils/path';
import { ProgressChallengeData, getUserChallenge } from '/src/services/challengeApi';

export default function () {
  const { data: sucessChallenge, isSuccess } = useQuery({
    queryKey: ['userChallenge', true],
    queryFn: () => getUserChallenge(true),
    select: (data) => data.data.content,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>획득한 트로피</p>
        <Link to={paths.CHALLENGE}>
          <GoTrophy className={styles.icon} />
        </Link>
      </div>
      <div className={styles.trophyList}>
        {isSuccess && sucessChallenge.length !== 0 ? (
          sucessChallenge.map((trophy: ProgressChallengeData) => {
            return <img key={trophy.challenge.name} className={styles.trophyImg} src={trophy.challenge.image} />;
          })
        ) : (
          <div className={styles.textContainer}>
            <div className={styles.nothingData}>획득한 트로피가 없어요</div>
          </div>
        )}
      </div>
    </div>
  );
}
