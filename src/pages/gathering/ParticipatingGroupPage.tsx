import styles from '../../styles/gathering/gatheringMain.module.scss';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { GatheringList } from './components/GatheringList';
import { TitleContainer } from './components/TitleContainer';
import { useNavigate } from 'react-router-dom';
import { getMyGatherings } from '/src/services/gatheringApi';
import { useQuery } from '@tanstack/react-query';
import { useUserInfo } from '/src/utils/useUserInfo';
import { compareUserAndLeader } from '/src/utils/compareUserAndLeader';
import { isClosedGathering } from '/src/utils/isClosedGathering';
const PAGE_SIZE = 4;

export function ParticipatingGroupPage() {
  const [showInProgress, setShowInProgress] = useState(false);
  const navigate = useNavigate();
  const [page] = useState(0);


  //내가 참여중인 모임 리스트 불러오괴
  const { data: myGatherings } = useQuery({
    queryKey: ['myGatherings'],
    queryFn: () => getMyGatherings(page, PAGE_SIZE),
    select: (data) => {
      return {
        content: data.data.content,
        totalPage: data.data.totalPages,
      };
    },
  })
  const currentUserId = useUserInfo((data) => data.id);


  //진행중인 모임 
  function clickShowInProgress() {
    setShowInProgress(!showInProgress);
  }

  function returnClassName(leaderId: number, date: string) {
    //작성자의 id와 모임장의 id가 같으면 styles.bgLightYellow

    if (isClosedGathering(date)) {
      //활동 완료된 모임 숨기기 버튼 클릭시 display:none
      if (!showInProgress) {
        //종료된 모임 gray
        return `${styles.width100} ${styles.bgGray} ${styles.borderRadius} ${styles.padding}`
      } else {
        return `${styles.displayNone}`
      }
    } else {
      //작성자 == 모임장 이면 bgLightYellow
      if (compareUserAndLeader(currentUserId, 0, leaderId)) {
        return `${styles.width100} ${styles.bgLightYellow} ${styles.borderRadius} ${styles.padding}`
      } else {
        //작성자 != 모임장이면 bgLightGreen
        return `${styles.width100} ${styles.bgLightGreen} ${styles.borderRadius} ${styles.padding}`
      }

    }
  }
  return (
    <div className={styles.gatheringContainer}>
      <TitleContainer title="참여중인 모임" />
      <div className={`${styles.container} ${styles.gap}`}>
        <div className={`${styles.iconTextContainer} ${styles.pointer}`} onClick={clickShowInProgress}>
          {showInProgress ? <IoCheckmarkCircleSharp color="#498428" /> : <IoCheckmarkCircleOutline color="#498428" />}
          <div className={styles.body1}>활동 완료된 모임 숨기기</div>
        </div>
        {myGatherings?.content.map((item) => (
          <div
            key={item.meetingId}
            className={returnClassName(item.leaderId, item.date)}
          >
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
    </div>
  );
}
