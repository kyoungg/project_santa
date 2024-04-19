import { Link } from 'react-router-dom';
import { SearchInput } from '../../components/common/Input';
import styles from '../../styles/gathering/gatheringSearch.module.scss';
import { IoChevronBack } from 'react-icons/io5';

export function GatheringSearchPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerRow}>
        <Link className={styles.backBtn} to="/gathering">
          <IoChevronBack color="#498428" size={'2rem'} />
        </Link>
        <SearchInput placeholder="모임을 검색해보세요" />
      </div>
    </div>
  );
}
