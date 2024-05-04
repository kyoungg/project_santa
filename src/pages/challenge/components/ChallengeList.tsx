import { useRef } from 'react';

import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';

interface Challenge {
  name: string;
  imgUrl: string;
  description: string;
  progress: string;
}

export default function ChallengeBox({ data, color }: { data: Challenge[]; color: 'green1' | 'yellow' }) {
  const progressRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {data.map((item) => {
        return (
          <div className={styles.gap}>
            <Card variant={color}>
              <div className={styles.container}>
                <div className={styles.top}>
                  <img src={item.imgUrl} />
                  <div className={styles.introduce}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.progress} ref={progressRef}>
                    <div
                      className={color == 'green1' ? styles.percentBar_g : styles.percentBar_y}
                      style={{ width: `${item.progress}` }}
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
