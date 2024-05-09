import { useQuery } from '@tanstack/react-query';

import styles from './TrophyPage.module.scss';
import trophyImg from '/images/trophyImg.png';
import { TrophyType, getUserChallenge } from '/src/services/challengeApi';
import useUserInfo from '/src/hooks/useUserInfo';
//_ProgressChallengeData,

export default function TrophyPage() {
  const userInfo = useUserInfo();

  const { data: sucessChallenge } = useQuery({
    queryKey: ['sucessChallenge', true],
    queryFn: () => getUserChallenge(true),
    select: (data) => data.data.content,
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={trophyImg} className={styles.mainImg} />
        <div className={styles.title}>{userInfo?.nickname}님의 트로피 리스트 🏅</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.trophyList}>
          {sucessChallenge && sucessChallenge?.length !== 0 ? (
            sucessChallenge.map((trophy: TrophyType) => {
              return (
                <div className={styles.trophyContainer}>
                  <img className={styles.trophyImg} src={trophy.challengeImage} />
                  <p className={styles.trophyName}>{trophy.challengeName}</p>
                </div>
              );
            })
          ) : (
            <div className={styles.textContainer}>
              <div className={styles.nothingData}>아직 획득한 트로피가 없네요!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
