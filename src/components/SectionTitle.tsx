import styles from '../styles/components/sectionTitle.module.scss';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  moreButtonParams?: string;
  isThereToggle?: boolean;
}

export default function SectionTitle({
  title = '챌린지 둘러보기',
  subtitle = '업적을 달설할 수 있는 챌린지를 확인해보세요!',
  moreButtonParams,
}: SectionTitleProps) {
  console.log(moreButtonParams);
  return (
    <div className={styles.sectionTitleWrapper}>
      <p className={styles.title}>{title}</p>
      <div className={styles.subtitleWrapper}>
        <p className={styles.subtitle}>{subtitle}</p>
        {moreButtonParams === undefined ? (
          ''
        ) : (
          <p className={styles.moreButton} id={`${moreButtonParams}`}>
            더보기 &gt;
          </p>
        )}
      </div>
    </div>
  );
}
