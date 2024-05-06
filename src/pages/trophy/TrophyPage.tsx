import { useQuery } from '@tanstack/react-query';

import styles from './TrophyPage.module.scss';
import trophyImg from '/images/trophyImg.png';
import { ProgressChallengeData, getUserChallenge } from '/src/services/challengeApi';
import useUserInfo from '/src/hooks/useUserInfo';

export default function TrophyPage() {
  const userInfo = useUserInfo();

  const {
    data: sucessChallenge,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['userChallenge', true],
    queryFn: () => getUserChallenge(true),
    select: (data) => data.data.content,
  });

  console.log('sucessChallenge', sucessChallenge);

  const SUCCESS = !isError && isFetched;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={trophyImg} className={styles.mainImg} />
        <div className={styles.title}>{userInfo?.nickname}님의 트로피 리스트 🏅</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.trophyList}>
          {SUCCESS &&
            sucessChallenge.map((trophy: ProgressChallengeData) => {
              return (
                <div className={styles.trophyContainer}>
                  <img className={styles.trophyImg} src={trophy.challenge.image} />
                  <p className={styles.trophyName}>{trophy.challenge.name}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
