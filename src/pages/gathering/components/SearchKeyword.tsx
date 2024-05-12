import { Chips } from '../../../components/common/Chips';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styles from '../../../styles/gathering/gatheringSearch.module.scss';
// import { useQuery } from '@tanstack/react-query';
// import { GatheringDetailType, getPopularGatherings } from '/src/services/gatheringApi';

export function SearchKeyword() {
  const [searchKeywords, setSearchKeywords] = useState<string[]>(['하이']);
  const [isDeleted, setIsDeleted] = useState(false);
  // const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([]);
  function deleteSearchKeyword(index: number) {
    const newArr = [...searchKeywords.slice(0, index), ...searchKeywords.slice(index + 1)];
    setSearchKeywords(newArr);
  }

  //인기 모임의 태그를 기반으로 검색어 추천
  // const { data: popularKeywords, isSuccess } = useQuery({
  //   queryKey: ['popularKeywords'],
  //   queryFn: () => getPopularGatherings(0, 10),
  //   select: (data) => data?.data.content

  // })

  // useEffect(() => {
  //   console.log('인기키워드', recommendedKeywords);
  //   getRecommendedKeyword()
  // }, [recommendedKeywords])

  // function getRecommendedKeyword() {
  //   const tags = popularKeywords?.flatMap((keyword: GatheringDetailType) => (
  //     keyword.tags
  //   )) ?? [];
  //   console.log(tags);
  // }

  return (
    <div>
      <div className={styles.containerCol}>
        <div className={styles.containerRow}>
          <div className={styles.subtitle1}>최근검색어</div>
          <div
            className={`${styles.subtitle2} ${styles.pointer}`}
            onClick={() => {
              setIsDeleted(!isDeleted);
            }}
          >
            {isDeleted ? '돌아가기' : '삭제하기'}
          </div>
        </div>
        <div className={`${styles.containerRow} ${styles.wrap}`}>
          {searchKeywords.length !== 0 &&
            searchKeywords.map((item, index) => (
              <div className={styles.chipContainer}>
                <Chips variant="green1">
                  <div className={styles.chipContainer}>
                    {item}
                    {isDeleted && (
                      <IoCloseOutline className={styles.closeBtn} onClick={() => deleteSearchKeyword(index)} />
                    )}
                  </div>
                </Chips>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.containerCol}>
        <div className={styles.containerRow}>
          <div className={styles.subtitle1}>추천검색어</div>
        </div>
        <div className={`${styles.containerRow} ${styles.wrap}`}>
          <Chips variant="green2">인왕산</Chips>
          <Chips variant="green2">지리산</Chips>
          <Chips variant="green2">관악산</Chips>
          <Chips variant="green2">두무산</Chips>
          <Chips variant="green2">하설산</Chips>
          <Chips variant="green2">적상산</Chips>
          <Chips variant="green2">곤천산</Chips>
          <Chips variant="green2">한라산</Chips>
          <Chips variant="green2">태백산</Chips>
          <Chips variant="green2">백두산</Chips>
          <Chips variant="green2">소백산</Chips>
          <Chips variant="green2">북한산</Chips>
        </div>
      </div>
    </div>
  );
}
