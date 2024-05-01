import { GatheringList } from './components/GatheringList';
import SectionTitle from '../../components/SectionTitle';
import { UserProfile_small } from '../../components/common/UserProfile_small';
import { IoSearch } from 'react-icons/io5';
import { Button } from '../../components/common/Button';
import styles from '../../styles/gathering/gatheringMain.module.scss';
import Thumbnail from '../../components/Thumbnail';
import { Link } from 'react-router-dom';
import { GatheringCategory } from './components/GatheringCategory';
import { useEffect, useState } from 'react';
import { getGatheringListByCategory, GatheringListByCategory } from '/src/services/gatheringApi';
import { useQuery } from '@tanstack/react-query';
import { useCategoryStore } from '/src/store/store';

const PAGE_SIZE = 4;

function GatheringMainPage() {
  const { category } = useCategoryStore();

  const [page, setPage] = useState(0);

  const [gatheringList, setGatheringList] = useState<GatheringListByCategory[]>([]);
  const {
    data: GatheringListByCategory,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ['gatheringListByCategory', page, category],
    queryFn: () => getGatheringListByCategory(category, page, PAGE_SIZE),
    select: (data) => {
      return {
        content: data.data.content,
        totalPage: data.data.totalPages,
      };
    },
  });

  useEffect(() => {
    setGatheringList([]);
    setPage(0);
  }, [category]);

  useEffect(() => {
    const isSuccess = isFetched && !isError;
    if (isSuccess && GatheringListByCategory) {
      console.log('total page', GatheringListByCategory.totalPage);
      setGatheringList((prevList) => [...prevList, ...GatheringListByCategory.content]);
    }
  }, [isFetched, isError, GatheringListByCategory]);

  return (
    <div className={styles.gatheringContainer}>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <UserProfile_small name="윤혜원" imageUrl="/images/profile.png" />
          <Link to={'/gathering/search'}>
            <div className={styles.searchBtn}>
              <IoSearch color="#498428" />
              <div>모임을 검색해보세요</div>
            </div>
          </Link>
        </div>
        <Link to={'/gathering/post'} className={styles.width100}>
          <Button variant="green3">모임 만들기</Button>
        </Link>
      </div>
      <div className={styles.container}>
        <SectionTitle title="인기 모임" subtitle="현재 진행중인 챌린지/모임을 확인해보세요!" isThereToggle={false} />
        <Thumbnail img="/images/profile.png" title="한라산 등반" isHotTopic={false} isIndexChip={false} />
      </div>
      <div className={styles.container}>
        <Link to={'/gathering/participate'} className={styles.width100}>
          <SectionTitle title="나의 모임" subtitle="참여중인 모임을 확인해보세요" isThereToggle={false} />
        </Link>
        <Thumbnail img="" title="맛있는 김밥 먹는 모임" isHotTopic={false} isIndexChip={false} />
      </div>
      <div className={`${styles.container} ${styles.gap}`}>
        <SectionTitle title="모임 둘러보기" subtitle="산타의 모임을 둘러보세요!" />
        <GatheringCategory />
        <div className={styles.gatheringList}>
          {gatheringList?.map((item: GatheringListByCategory, index) => (
            <div key={`${item.meetingId}-${item.leaderId}`}>
              <GatheringList
                title={item.meetingName}
                content={item.description}
                tag={item.categoryName}
                mountain={item.mountainName}
                imageUrl={item.image}
                capacity={item.headcount}
                attendance={item.participants.length}
                date={item.date}
                isLast={
                  GatheringListByCategory &&
                  GatheringListByCategory?.totalPage >= page &&
                  gatheringList.length === index + 1
                }
                setPage={setPage}
              />
            </div>
          ))}
          {gatheringList?.length === 0 && <div>데이터가 없습니다.</div>}
        </div>
      </div>
    </div>
  );
}

export default GatheringMainPage;
