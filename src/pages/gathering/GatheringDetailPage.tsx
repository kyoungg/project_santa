import { TitleContainer } from './components/TitleContainer';
import styles from '../../styles/gathering/gatheringDetailPage.module.scss';
import { FaMountain } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Chips } from '../../components/common/Chips';
import { VerticalProfile } from './components/VerticalProfile';
import { Button } from '../../components/common/Button';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGatheringDetailById } from '/src/services/gatheringApi';
// import { api } from '/src/services/api';

export function GatheringDetailPage() {
  const [searchParams] = useSearchParams();
  const [meetingId, setMeetingId] = useState<string | null>('');
  useEffect(() => {

    setMeetingId(searchParams.get('meetingid'));


  }, [])
  /**
   * @tanstack_react-query.js?v=da488e68:825 Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ["gatheringDetail",null]
   * 이건 어떻게 ?????
   */
  const { data: gatheringDetail, isLoading, error } = useQuery({
    queryKey: ['gatheringDetail', meetingId],
    queryFn: () => {
      if (meetingId) {
        return getGatheringDetailById(meetingId);
      }
    },
    select: (data) => data?.data,
  })

  useEffect(() => {
    console.log(gatheringDetail)
  }, [gatheringDetail])
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.gatheringDetailContainer}>
      <TitleContainer title={gatheringDetail?.meetingName} />
      <div className={styles.infoContainer}>
        <div className={styles.containerRow}>
          <img src="/defaultProfile.png" className={styles.imageContainer}></img>
          <div className={styles.topInfoContainer}>
            <div className={styles.iconTextContainer}>
              <FaMountain />
              <div>{gatheringDetail?.mountainName}</div>
            </div>
            <div className={styles.iconTextContainer}>
              <IoPersonOutline />
              <div>{gatheringDetail?.headcount}명</div>
            </div>
            <div className={styles.iconTextContainer}>
              <IoCalendarClearOutline />
              <div>{gatheringDetail?.date}</div>
            </div>
          </div>
        </div>
        <div className={styles.containerCol}>
          <div className={styles.textarea}>
            <div>{gatheringDetail?.description}</div>
          </div>
          <div className={styles.tagContainer}>
            {gatheringDetail?.tags.map((item: string, index: number) => (
              <div key={`${gatheringDetail?.meetingId}-${index}`}>
                <Chips variant="outline-green3">{item}</Chips>
              </div>
            ))}
          </div>
          <div className={styles.memberContainer}>
            <div className={styles.subtitle1}>참여인원</div>
            <div className={styles.profileListContainer}>
              {gatheringDetail?.participants.map((item) => (
                <div key={`${item.userId} ${item.userName}`}>
                  <VerticalProfile name={item.userName} imageUrl="/images/defaultProfile.png" />
                </div>
              ))}
            </div>
          </div>
          <Button variant="green3">참가신청하기</Button>
        </div>
      </div>
    </div >
  );
}
