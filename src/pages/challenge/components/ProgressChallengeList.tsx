import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';
import { ProgressChallengeData, getUserChallenge } from '/src/services/challengeApi';

export default function ProgressChallengeList() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  const {
    data: progressChallenge,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['userChallenge', false],
    queryFn: () => getUserChallenge(false),
    select: (data) => data.data.content,
    staleTime: Infinity,
  });

  const isSuccess = !isError && isFetched;
  return (
    <>
      {isSuccess && progressChallenge.length !== 0 ? (
        progressChallenge.map((challenge: ProgressChallengeData) => {
          return (
            <div key={challenge.challenge.name} className={styles.gap}>
              <Card variant="green2">
                <div className={styles.container}>
                  <div className={styles.top}>
                    <img src={challenge.challenge.image} />
                    <div className={styles.introduce}>
                      <p className={styles.name}>{challenge.challenge.name}</p>
                      <p className={styles.description}>{challenge.challenge.description}</p>
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.progress} ref={progressRef}>
                      <div
                        className={styles.percentBar}
                        style={{ width: `${(challenge.progress / challenge.challenge.clearStandard) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })
      ) : (
        <div className={styles.noData}>아직 진행중인 챌린지가 없네요!</div>
      )}
    </>
  );
}
