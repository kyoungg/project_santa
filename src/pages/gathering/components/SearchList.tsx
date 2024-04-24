import styles from '../../../styles/gathering/gatheringSearch.module.scss';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import { GatheringList } from './GatheringList';
import { useState } from 'react';

export function SearchList() {
  const [showInProgress, setShowInProgress] = useState(false);
  const [sortByLatest, setSortByLatest] = useState(true);
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
  const gatheringData = [
    {
      leaderId: '12334',
      title: '한라산에서 모일사람',
      content: '안녕하세요',
      tag: '힐링',
      imageUrl: 'iiii',
      mountain: '한라산',
      capacity: 2,
      attendance: 1,
      date: '2023.03.23',
    },
    {
      leaderId: '123222',
      title: '222한라산에서 모일사람',
      content: '22안녕하세요',
      tag: '2힐링',
      imageUrl: '2iiii',
      mountain: '2한라산',
      capacity: 5,
      attendance: 4,
      date: '2024.03.23',
    },
  ];
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
        <div key={item.leaderId} className={styles.width100}>
          <GatheringList
            title={item.title}
            content={item.content}
            tag={item.tag}
            imageUrl={item.imageUrl}
            mountain={item.mountain}
            capacity={item.capacity}
            attendance={item.attendance}
            date={item.date}
          />
        </div>
      ))}
    </div>
  );
}
