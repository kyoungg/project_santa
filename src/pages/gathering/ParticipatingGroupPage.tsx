import styles from '../../styles/gathering/gatheringMain.module.scss';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { GatheringList } from './components/GatheringList';
import { TitleContainer } from './components/TitleContainer';
import { useNavigate } from 'react-router-dom';

export function ParticipatingGroupPage() {
  const [showInProgress, setShowInProgress] = useState(false);
  const navigate = useNavigate();
  const data = [
    {
      leaderId: '23333',
      meetingId: 1123,
      title: '한라산 등반 모임',
      content: '한라산에서 함께 등산하실 분',
      tag: '힐링',
      mountain: '한라산',
      imageUrl: './',
      capacity: 16,
      attendance: 4,
      date: '2023.08.14',
    },
    {
      leaderId: '2333411',
      meetingId: 1234,
      title: '한라산 등반 모임',
      content: '한라산에서 함께 등산하실 분',
      tag: '힐링',
      mountain: '한라산',
      imageUrl: './',
      capacity: 16,
      attendance: 4,
      date: '2023.08.14',
    },
  ];
  function clickShowInProgress() {
    setShowInProgress(!showInProgress);
  }
  return (
    <div className={styles.gatheringContainer}>
      <TitleContainer title="참여중인 모임" />
      <div className={`${styles.container} ${styles.gap}`}>
        <div className={`${styles.iconTextContainer} ${styles.pointer}`} onClick={clickShowInProgress}>
          {showInProgress ? <IoCheckmarkCircleSharp color="#498428" /> : <IoCheckmarkCircleOutline color="#498428" />}
          <div className={styles.body1}>활동 완료된 모임 숨기기</div>
        </div>
        {data.map((item) => (
          <div
            key={item.meetingId}
            className={`${styles.width100} ${styles.bgLightYellow} ${styles.borderRadius} ${styles.padding}`}
          >
            <GatheringList
              gatheringInfo={{
                title: item.title,
                content: item.content,
                tag: item.tag,
                imageUrl: item.imageUrl,
                mountain: item.mountain,
                capacity: item.capacity,
                attendance: item.attendance,
                date: item.date,
              }}

              onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
