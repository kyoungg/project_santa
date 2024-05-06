import { useQuery } from '@tanstack/react-query';

import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';
import { TotalChallenge, getAllChallenge } from '/src/services/challengeApi';

export default function ChallengeList() {
  const {
    data: allChallenge,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['allChallenge'],
    queryFn: getAllChallenge,
    select: (data) => data.data.content,
    staleTime: Infinity,
  });

  const isSuccess = !isError && isFetched;
  return (
    <>
      {isSuccess &&
        allChallenge.map((challenge: TotalChallenge) => {
          return (
            <div key={challenge.name} className={styles.gap}>
              <Card variant="yellow">
                <div className={styles.container}>
                  <div className={styles.top}>
                    <img src={challenge.image} />
                    <div className={styles.introduce}>
                      <p className={styles.name}>{challenge.name}</p>
                      <p className={styles.description}>{challenge.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
    </>
  );
}
