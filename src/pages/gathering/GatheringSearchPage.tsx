import { Link } from 'react-router-dom';
import { SearchInput } from '../../components/common/Input';
import styles from '../../styles/gathering/gatheringSearch.module.scss';
import { IoChevronBack } from 'react-icons/io5';
// import { SearchKeyword } from './components/SearchKeyword';
// import { SearchList } from './components/SearchList';
import { SearchNoResult } from './components/SearchNoResults';
import { ChangeEvent, useEffect, useState } from 'react';
import { getGatheringSearchResult } from '/src/services/gatheringApi';
import { useQuery } from '@tanstack/react-query';
import { useSearchValueStore } from '/src/store/store';
import { SearchList } from './components/SearchList';
import { SearchKeyword } from './components/SearchKeyword';
export function GatheringSearchPage() {
  const { searchValue, setSearchValue } = useSearchValueStore();
  const [searchResult, setSearchResult] = useState();
  const [isNoResult, setIsNoResult] = useState(false);

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['getSearchList', searchValue],
    queryFn: () => getGatheringSearchResult(searchValue),
  });

  function handleClickSearchBtn() {
    console.log('검색어', searchValue);
    if (isSuccess) {
      console.log('search data ', data.data.content);
      if (data.data.content.length === 0) {
        setIsNoResult(true);
      } else {
        setIsNoResult(false);
      }
      setSearchResult(data.data.content);
    } else if (isError) {
      console.log('error');
    }
  }

  useEffect(() => {
    if (searchValue === '') {
      setIsNoResult(false);
    }
  }, [searchValue]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerRow}>
        <Link className={styles.backBtn} to="/gathering">
          <IoChevronBack color="#498428" size={'2rem'} />
        </Link>
        <SearchInput
          placeholder="모임을 검색해보세요"
          onChange={handleSearchInput}
          value={searchValue}
          onClick={handleClickSearchBtn}
        />
      </div>
      {!searchResult && <SearchKeyword />}
      {searchResult && <SearchList gatheringData={searchResult} />}
      {searchResult && isNoResult && <SearchNoResult keyword={searchValue} />}
    </div>
  );
}
