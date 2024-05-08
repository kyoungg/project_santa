import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import styles from './GatheringBox.module.scss';
import { paths } from '/src/utils/path';
import { FaUsers } from 'react-icons/fa6';
import { getUserGathering } from '/src/services/gatheringApi';

export default function GatheringBox() {
  const navigation = useNavigate();
  const { data: myGethering, isSuccess } = useQuery({
    queryKey: ['userGethering'],
    queryFn: getUserGathering,
    select: (data) => data.data.content,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>참여중인 모임</p>
        <FaUsers
          className={styles.icon}
          onClick={() => {
            navigation(paths.GATHERING);
          }}
        />
      </div>
      <div className={styles.recentGathering}>
        {isSuccess && myGethering.length !== 0 ? (
          <div
            className={styles.thumnailContainer}
            onClick={() => {
              navigation(`/gathering/detail?meetingid=${myGethering[0].meetingId}`);
            }}
          >
            <div className={styles.thumnailItemBox} key={myGethering[0].meetingId}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={myGethering[0].image} />
              </div>
              <p className={styles.thumnailTitle}>{myGethering[0].meetingName}</p>
            </div>
          </div>
        ) : (
          <div className={styles.textContainer}>
            <div className={styles.nothingData}>모임이 없습니다</div>
          </div>
        )}
      </div>
    </div>
  );
}
