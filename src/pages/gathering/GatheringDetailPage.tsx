import { TitleContainer } from './components/TitleContainer';
import styles from '../../styles/gathering/gatheringDetailPage.module.scss';
import { FaMountain } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Chips } from '../../components/common/Chips';
import { VerticalProfile } from './components/VerticalProfile';
import { Button } from '../../components/common/Button';
// import { api } from '/src/services/api';

export function GatheringDetailPage() {
  const data = {
    meetingId: 17,
    leaderId: 1,
    meetingName: '등산 모임',
    categoryName: 'test',
    mountainName: '관악산',
    description: '관악산 등산 합시다',
    headcount: 15,
    date: '2024-05-20',
    tags: ['등산모임', '산행', '운동'],
    image: 'image',
    participants: [
      {
        userId: 1,
        userName: 'string',
      },
      {
        userId: 2,
        userName: 'string',
      },
      {
        userId: 3,
        userName: 'string',
      },
    ],
  };

  // async function fetchData() {}
  return (
    <div className={styles.gatheringDetailContainer}>
      <TitleContainer title="모임 상세보기" />
      <div className={styles.infoContainer}>
        <div className={styles.containerRow}>
          <img src="/defaultProfile.png" className={styles.imageContainer}></img>
          <div className={styles.topInfoContainer}>
            <div className={styles.iconTextContainer}>
              <FaMountain />
              <div>{data.mountainName}</div>
            </div>
            <div className={styles.iconTextContainer}>
              <IoPersonOutline />
              <div>{data.headcount}명</div>
            </div>
            <div className={styles.iconTextContainer}>
              <IoCalendarClearOutline />
              <div>{data.date}</div>
            </div>
          </div>
        </div>
        <div className={styles.containerCol}>
          <div className={styles.textarea}>
            <div>{data.description}</div>
          </div>
          <div className={styles.tagContainer}>
            {data.tags.map((item, index) => (
              <div key={`${data.leaderId}-${index}`}>
                <Chips variant="outline-green3">{item}</Chips>
              </div>
            ))}
          </div>
          <div className={styles.memberContainer}>
            <div className={styles.subtitle1}>참여인원</div>
            <div className={styles.profileListContainer}>
              {data.participants.map((item) => (
                <div key={item.userId}>
                  <VerticalProfile name={item.userName} imageUrl="/images/defaultProfile.png" />
                </div>
              ))}
            </div>
          </div>
          <Button variant="green3">참가신청하기</Button>
        </div>
      </div>
    </div>
  );
}
