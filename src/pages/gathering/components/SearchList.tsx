import styles from '../../../styles/gathering/gatheringSearch.module.scss';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import { GatheringList } from './GatheringList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isClosedGathering } from '/src/utils/isClosedGathering';

type participants = {
  userId: number;
  userImage: string;
  userName: string;
};

type gatheringDataType = {
  leaderId: number;
  meetingId: number;
  meetingName: string;
  categoryName: string;
  mountainName: string;
  description: string;
  headcount: number;
  date: string;
  tags: string;
  image: string;
  participants: participants[];
};
export function SearchList({ gatheringData }: { gatheringData: gatheringDataType[] }) {
  const [showInProgress, setShowInProgress] = useState(false);
  const [sortByLatest, setSortByLatest] = useState(true);
  const navigate = useNavigate();
  function clickShowInProgress() {
    setShowInProgress(!showInProgress);
  }
  function clickFilter(filter: string) {
    if (filter === '최신순') {
      setSortByLatest(true);
    } else if (filter === '인기순') {
      setSortByLatest(false);
    }
  }

  function returnClassName(date: string) {
    //작성자의 id와 모임장의 id가 같으면 styles.bgLightYellow

    if (isClosedGathering(date)) {
      //활동 완료된 모임 숨기기 버튼 클릭시 display:none
      if (!showInProgress) {
        return `${styles.width100}`
      } else {
        return `${styles.width100} ${styles.displayNone}`
      }
    } else {
      return `${styles.width100}`
    }

  }


  return (
    <div className={styles.containerCol}>
      <div className={styles.containerRow}>
        <div className={`${styles.iconTextContainer} ${styles.pointer}`} onClick={clickShowInProgress}>
          {showInProgress ? <IoCheckmarkCircleSharp color="#498428" /> : <IoCheckmarkCircleOutline color="#498428" />}
          <div className={styles.body1}>모집중인 모임만 보기</div>
        </div>
        <div className={`${styles.filterContainer} ${styles.subtitle2}`}>
          <div
            className={`${styles.pointer} ${sortByLatest ? styles.green3Font : ''}`}
            onClick={() => clickFilter('최신순')}
          >
            최신순
          </div>
          <div
            className={`${styles.pointer} ${sortByLatest ? '' : styles.green3Font}`}
            onClick={() => clickFilter('인기순')}
          >
            인기순
          </div>
        </div>
      </div>
      {gatheringData.map((item) => (
        <div key={item.meetingId} className={returnClassName(item.date)}>
          <GatheringList
            gatheringInfo={{
              title: item.meetingName,
              content: item.description,
              tag: item.categoryName,
              imageUrl: item.image,
              mountain: item.mountainName,
              capacity: item.headcount,
              attendance: item.participants.length,
              date: item.date,
            }}
            onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
          />
        </div>
      ))}
    </div>
  );
}
