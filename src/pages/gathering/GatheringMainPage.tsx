import { GatheringList } from './components/GatheringList';
import SectionTitle from '../../components/SectionTitle';
import { UserProfile_small } from '../../components/common/UserProfile_small';
import { IoSearch } from 'react-icons/io5';
import { Button } from '../../components/common/Button';
import styles from '../../styles/gathering/gatheringMain.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { GatheringCategory } from './components/GatheringCategory';
import { useEffect, useState } from 'react';
import { getGatheringListByCategory } from '/src/services/gatheringApi';
import { useQuery } from '@tanstack/react-query';
import { useCategoryStore } from '/src/store/store';
import { MyGatherings } from './components/MyGatherings';
import { Top3Gatherings } from './components/Top3Gatherings';
import { useUserInfo } from '/src/utils/useUserInfo';
import { Alert } from '/src/components/common/Alert';
import { GatheringListByCategory } from '../../types/gatheringTypes';

const PAGE_SIZE = 10;

function GatheringMainPage() {
  const { category } = useCategoryStore();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [gatheringList, setGatheringList] = useState<GatheringListByCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // const showAlert = () => {
  //   setIsOpen(true);
  // };
  //모임 목록 가져오기
  const {
    data: GatheringListByCategory,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ['gatheringListByCategory', page, category],
    queryFn: () => getGatheringListByCategory(category.name, page, PAGE_SIZE),
    select: (data) => {
      return {
        content: data.data.content,
        totalPage: data.data.totalPages - 1,
      };
    },
  });

  useEffect(() => {
    setGatheringList([]);
    setPage(0);
    // queryClient.invalidateQueries({ queryKey: ['gatheringListByCategory', page, category], });
  }, [category]);

  useEffect(() => {
    const isSuccess = isFetched && !isError;

    if (isSuccess && GatheringListByCategory) {
      if (page === 0) {
        setGatheringList([...GatheringListByCategory?.content]);
      } else {
        setGatheringList((prevList) => [...prevList, ...GatheringListByCategory?.content]);
      }
    }
  }, [isFetched, isError, GatheringListByCategory, category]);
  const currentUserInfo = useUserInfo((data) => data);

  return (
    <div className={styles.gatheringContainer}>
      {/* <button onClick={showAlert}>클릭</button> */}
      <Alert variant="error" setIsOpen={setIsOpen} isOpen={isOpen}>
        오류메세지
      </Alert>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <UserProfile_small name={currentUserInfo?.nickname} imageUrl={currentUserInfo?.image} />
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
      <MyGatherings />
      <Top3Gatherings />
      <div className={`${styles.container} ${styles.gap}`}>
        <SectionTitle title="모임 둘러보기" subtitle="산타의 모임을 둘러보세요!" />
        <GatheringCategory />
        <div className={styles.gatheringList}>
          {gatheringList?.map((item: GatheringListByCategory, index) => (
            <div key={`${item.meetingId}-${item.leaderId}-${index}`}>
              <GatheringList
                gatheringInfo={{
                  title: item.meetingName,
                  content: item.description,
                  tag: item.categoryName,
                  mountain: item.mountainName,
                  imageUrl: item.image,
                  capacity: item.headcount,
                  attendance: item.participants.length,
                  date: item.date,
                }}
                isLast={
                  GatheringListByCategory &&
                  GatheringListByCategory?.totalPage > page &&
                  gatheringList.length === index + 1
                }
                setPage={setPage}
                onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
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
