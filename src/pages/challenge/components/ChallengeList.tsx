import { useRef } from 'react';

import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';

interface Category {
  name: string;
}
interface Challenge {
  id: number;
  name: string;
  description: string;
  imag: string;
  clearStandard: number;
  category: Category;
}
//: { data: Challenge[]; color: string }

export default function ChallengeList({ data, color }) {
  const progressRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {data.map((challenge) => {
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
                <div className={styles.bottom}>
                  <div className={styles.progress} ref={progressRef}>
                    <div
                      className={styles.percentBar}
                      data-color={color}
                      style={{ width: `${challenge.clearStandard}%` }}
                    />
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
