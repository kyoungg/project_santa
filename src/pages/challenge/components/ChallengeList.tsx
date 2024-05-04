import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';
import { TotalChallenge } from '/src/services/challengeApi';

export default function ChallengeList({
  Challengedata,
  color,
}: {
  Challengedata: TotalChallenge[];
  color: 'green2' | 'yellow';
}) {
  return (
    <>
      {Challengedata.map((challenge) => {
        return (
          <div key={challenge.name} className={styles.gap}>
            <Card variant={color}>
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
