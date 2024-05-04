import styles from '../styles/components/sectionTitle.module.scss';
import { Link } from 'react-router-dom';
interface SectionTitleProps {
  title: string;
  subtitle: string;
  goToPage?: string;
  isThereToggle?: boolean;
}

const SectionTitle = ({
  title = '챌린지 둘러보기',
  subtitle = '업적을 달설할 수 있는 챌린지를 확인해보세요!',
  goToPage,
}: SectionTitleProps) => {
  return (
    <div className={styles.sectionTitleWrapper}>
      <p className={styles.title}>{title}</p>
      <div className={styles.subtitleWrapper}>
        <p className={styles.subtitle}>{subtitle}</p>
        {goToPage === undefined ? (
          ''
        ) : (
          <Link to={`${goToPage}`} className={styles.goToPageButton}>
            더보기 &gt;
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
