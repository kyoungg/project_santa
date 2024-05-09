import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { GoTrophy } from 'react-icons/go';
import styles from './TrophyBox.module.scss';
import { paths } from '/src/utils/path';
import { getUserChallenge, TrophyType } from '/src/services/challengeApi';

export default function () {
  const { data: sucessChallenge } = useQuery({
    queryKey: ['userChallenge', true],
    queryFn: () => getUserChallenge(true),
    select: (data) => data.data.content,
  });

  const trophyData = sucessChallenge?.slice(0, 4);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>획득한 트로피</p>
        <Link to={paths.CHALLENGE}>
          <GoTrophy className={styles.icon} />
        </Link>
      </div>
      <div className={styles.trophyList}>
        {trophyData && trophyData.length !== 0 ? (
          trophyData.map((trophy: TrophyType) => {
            return (
              <img
                key={`${trophy.challengeName}-${trophy.completionDate}`}
                className={styles.trophyImg}
                src={trophy.challengeImage}
              />
            );
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
