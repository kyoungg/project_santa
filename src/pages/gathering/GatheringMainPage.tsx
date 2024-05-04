import { GatheringList } from './components/GatheringList';
import SectionTitle from '../../components/SectionTitle';
import { UserProfile_small } from '../../components/common/UserProfile_small';
import { IoSearch } from 'react-icons/io5';
import { Button } from '../../components/common/Button';
import styles from '../../styles/gathering/gatheringMain.module.scss';
import Thumbnail from '../../components/Thumbnail';
import { Link } from 'react-router-dom';
import { GatheringCategory } from './components/GatheringCategory';
import { api } from '/src/services/api';
import { useEffect } from 'react';
function GatheringMainPage() {
  const data = [
    {
      leaderId: 1,
      meetingName: '산악회',
      categoryName: '등산',
      mountainName: '북한산',
      description: '북한산 등산 후 식사',
      headcount: 15,
      date: '2024-05-20',
      tags: ['산행', '등산모임'],
      image: 'image',
    },
    {
      leaderId: 2,
      meetingName: '산악회2',
      categoryName: '등산2',
      mountainName: '북한산2',
      description: '북한산 등산 후 식사2',
      headcount: 15,
      date: '2024-05-20',
      tags: ['산행', '등산모임'],
      image: 'image',
    },
  ];

  async function fetchData() {
    const response = await api.get('meetings');
    console.log(response);
  }

  useEffect(() => {
    fetchData();
  }, []);
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
          {data.map((item) => (
            <div key={item.leaderId}>
              <GatheringList
                title={item.meetingName}
                content={item.description}
                tag={item.categoryName}
                mountain={item.mountainName}
                imageUrl={item.image}
                capacity={item.headcount}
                attendance={item.headcount}
                date={item.date}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GatheringMainPage;
