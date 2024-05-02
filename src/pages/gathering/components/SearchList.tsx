import styles from '../../../styles/gathering/gatheringSearch.module.scss';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import { GatheringList } from './GatheringList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Participant = {
  userId: number; // 예시로 숫자 타입을 사용하였습니다. 실제 타입에 맞게 수정해주세요.
  userImage: string;
  userName: string;
};

type gatheringDataType = {
  categoryName: string;
  date: string;
  description: string;
  headcount: number;
  image: string;
  leaderId: number;
  meetingId: number;
  meetingName: string;
  mountainName: string;
  participants: Participant[];
  tags: string[];
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
        <div key={item.meetingId} className={styles.width100}>
          <GatheringList
            title={item.meetingName}
            content={item.description}
            tag={item.categoryName}
            imageUrl={item.image}
            mountain={item.mountainName}
            capacity={item.headcount}
            attendance={item.participants.length}
            date={item.date}
            onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
          />
        </div>
      ))}
    </div>
  );
}
