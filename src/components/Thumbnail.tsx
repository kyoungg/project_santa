import IssueChip from './IssueChip';
import styles from '../styles/components/thumbnail.module.scss';

interface ThumnailProps {
  img: string;
  title: string;
  isHotTopic: boolean;
  isIndexChip: boolean;
}
export default function Thumbnail({ img, title, isHotTopic, isIndexChip }: ThumnailProps) {
  // todo api 연결 후 map으로 출력, img 태그 변경
  return (
    <div className={styles.thumnailContainer}>
      <div className={styles.thumnailItemBox}>
        {isIndexChip ? <div className={styles.indexBadge}>1</div> : ''}
        {isHotTopic ? (
          <div className={styles.chipWrapper}>
            <IssueChip />
          </div>
        ) : (
          ''
        )}
        <div className={styles.img}>{img}</div>
        <p className={styles.thumnailTitle}>{title}</p>
      </div>
      <div className={styles.thumnailItemBox}>
        <div className={styles.indexBadge}>1</div>
        {isHotTopic ? (
          <div className={styles.chipWrapper}>
            <IssueChip />
          </div>
        ) : (
          ''
        )}
        <div className={styles.img}>{img}</div>
        <p className={styles.thumnailTitle}>{title}</p>
      </div>{' '}
      <div className={styles.thumnailItemBox}>
        <div className={styles.indexBadge}>1</div>
        {isHotTopic ? (
          <div className={styles.chipWrapper}>
            <IssueChip />
          </div>
        ) : (
          ''
        )}
        <div className={styles.img}>{img}</div>
        <p className={styles.thumnailTitle}>{title}</p>
      </div>
    </div>
  );
}
