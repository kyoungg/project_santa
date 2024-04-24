import { SearchKeyword } from './SearchKeyword';
import styles from '../../../styles/gathering/gatheringSearch.module.scss';

export interface SearchNoResultProps {
  keyword: string;
}

export function SearchNoResult(props: SearchNoResultProps) {
  return (
    <div className={styles.containerCol}>
      <div className={styles.noResultText}>{props.keyword} 태그 검색결과가 존재하지 않습니다.</div>
      <SearchKeyword />
    </div>
  );
}
