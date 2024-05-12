import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';
import { TrophyType, getUserChallenge } from '/src/services/challengeApi';

export default function ProgressChallengeList() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  const { data: progressChallenge } = useQuery({
    queryKey: ['userChallenge', false],
    queryFn: () => getUserChallenge(false),
    select: (data) => data.data.content,
    staleTime: Infinity,
  });

  return (
    <>
      {progressChallenge && progressChallenge.length !== 0 ? (
        progressChallenge.map((challenge: TrophyType) => {
          return (
            <div key={`${challenge.challengeClearStandard}-${challenge.completionDate}`} className={styles.gap}>
              <Card variant="green2">
                <div className={styles.container}>
                  <div className={styles.top}>
                    <img src={challenge.challengeImage} />
                    <div className={styles.introduce}>
                      <p className={styles.name}>{challenge.challengeName}</p>
                      <p className={styles.description}>{challenge.challengeDescription}</p>
                    </div>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.progress} ref={progressRef}>
                      <div className={styles.progressNumber}>
                        {challenge.progress} / {challenge.challengeClearStandard}
                      </div>
                      <div
                        className={styles.percentBar}
                        style={{ width: `${(challenge.progress / challenge.challengeClearStandard) * 100}%` }}
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
