import IssueChip from './IssueChip';
import styles from '../styles/components/thumbnail.module.scss';
import { ThumbnailChallenge } from '../services/challengeApi';

interface ThumbnailItems extends ThumbnailChallenge {}
interface ThumbnailProps {
  data: ThumbnailItems[];
  isHotTopic: boolean;
  isIndexChip: boolean;
}
export default function Thumbnail({ data, isHotTopic, isIndexChip }: ThumbnailProps) {
  return (
    <div className={styles.thumnailContainer}>
      {data.map((item) => (
        <div className={styles.thumnailItemBox} key={item.id}>
          {isIndexChip && <div className={styles.indexBadge}>1</div>}
          {isHotTopic && (
            <div className={styles.chipWrapper}>
              <IssueChip />
            </div>
          )}
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={item.image} />
          </div>
          <p className={styles.thumnailTitle}>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
