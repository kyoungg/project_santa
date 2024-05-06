import styles from './RecordList.module.scss';
import { Card } from '/src/components/common/Card';
import { VertifyMountain } from '/src/services/mountainAPi';

export default function RecordList({ myMountains }: { myMountains: VertifyMountain[] }) {
  return (
    <>
      {myMountains.map((mountain, index) => {
        return (
          <div className={styles.container} key={mountain.id}>
            <Card variant={index % 2 == 0 ? 'green2' : 'yellow'}>
              <div className={styles.textContainer}>
                <div className={styles.top}>
                  <div className={styles.title}>{mountain.mountain.name}</div>
                  <div className={styles.mountainHeight}>{mountain.mountain.height} M</div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.climbDate}>{mountain.climbDate}</div>
                  <div className={styles.mountainLocation}>{mountain.mountain.location}</div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
}
