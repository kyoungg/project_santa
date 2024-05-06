import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../../components/common/Input';
import styles from '../../styles/gathering/gatheringSearch.module.scss';
import { IoChevronBack } from 'react-icons/io5';
import { ChangeEvent } from 'react';
import { useSearchValueStore } from '/src/store/store';
import { SearchKeyword } from './components/SearchKeyword';
export function GatheringSearchPage() {
  const { searchValue, setSearchValue } = useSearchValueStore();
  const navigate = useNavigate();
  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }


  function handleClickSearchBtn() {
    navigate(`/gathering/search/result?keyword=${searchValue}`)
    console.log('검색어', searchValue);
  }



  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerRow}>
        <IoChevronBack color="#498428" size={'2rem'} onClick={() => navigate(-1)} />
        <SearchInput
          placeholder="모임을 검색해보세요"
          onChange={handleSearchInput}
          value={searchValue}
          onClick={handleClickSearchBtn}
        />
      </div>
      <SearchKeyword />
    </div>
  );
}
