import { useRef } from 'react';

import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';
import { ProgressChallengeData } from '/src/services/challengeApi';

export default function ProgressChallengeList({
  Challengedata,
  color,
}: {
  Challengedata: ProgressChallengeData[];
  color: 'green2' | 'yellow';
}) {
  const progressRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {Challengedata.map((challenge) => {
        const progress = (challenge.progress / challenge.challenge.clearStandard) * 100;
        return (
          <div key={challenge.challenge.name} className={styles.gap}>
            <Card variant={color}>
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
                    <div className={styles.percentBar} data-color={color} style={{ width: `${progress}` }} />
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
