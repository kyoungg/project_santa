import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import styles from './MountainPage.module.scss';
import { MountainDetail, getAllMountains } from '/src/services/mountainAPi';
import MountainList from './component/MountainList';

const PAGE_SIZE = 10;
export default function MountainPage() {
  const [page, setPage] = useState(0);
  const [mountainList, setMountainList] = useState<MountainDetail[]>([]);
  const {
    data: allMountain,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['allMountain', page],
    queryFn: () => getAllMountains(page, PAGE_SIZE),
    select: (data) => {
      return {
        content: data.data.content,
        totalPage: data.data.totalPages,
      };
    },
  });

  useEffect(() => {
    //디테일 페이지 갔다 돌아왔을 때 리스트 초기화
    setMountainList([]);
  }, []);

  useEffect(() => {
    const isSuccess = isFetched && !isError;
    if (isSuccess && allMountain) {
      setMountainList((prevList) => [...prevList, ...allMountain.content]);
    }
  }, [isFetched, isError, allMountain]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>전체 산 목록</div>
      {mountainList?.map((mountainData, index) => {
        return (
          <div key={`${mountainData.name}-${mountainData.latitude}`}>
            <MountainList
              mountainData={mountainData}
              setPage={setPage}
              isLast={allMountain && allMountain?.totalPage >= page && mountainList.length === index + 1}
            />
          </div>
        );
      })}
    </div>
  );
}
