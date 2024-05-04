import styles from '../styles/components/sectionTitle.module.scss';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  goToListPageParams?: string;
  isThereToggle?: boolean;
}

export default function SectionTitle({
  title = '챌린지 둘러보기',
  subtitle = '업적을 달설할 수 있는 챌린지를 확인해보세요!',
  goToListPageParams,
}: SectionTitleProps) {
  return (
    <div className={styles.sectionTitleWrapper}>
      <p className={styles.title}>{title}</p>
      <div className={styles.subtitleWrapper}>
        <p className={styles.subtitle}>{subtitle}</p>
        {goToListPageParams === undefined ? (
          ''
        ) : (
          <p className={styles.moreButton} id={`${goToListPageParams}`}>
            더보기 &gt;
          </p>
        )}
      </div>
    </div>
  );
}
