import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import styles from './ChallengePage.module.scss';
import { UserProfile_small } from '/src/components/common/UserProfile_small';
import ChallengeList from './components/ChallengeList';
import ProgressChallengeList from './components/ProgressChallengeList';
import { paths } from '/src/utils/path';
import { getAllChallenge, getUserChallenge } from '/src/services/challengeApi';
import { getUserInfo } from '/src/services/userApi';

export default function ChallengePage() {
  const navigation = useNavigate();
  const {
    data: allChallenge,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['allChallenge'],
    queryFn: getAllChallenge,
    select: (data) => data.data.content,
    staleTime: Infinity,
  });

  const { data: progressChallenge } = useQuery({
    queryKey: ['userChallenge', false],
    queryFn: () => getUserChallenge(false),
    select: (data) => data.data.content,
  });

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (data) => data.data,
    staleTime: Infinity,
  });

  const [openTab, setOpenTab] = useState(0);

  const SUCCESS = !isError && isFetched;

  const tabData = [
    { button: '진행중인 챌린지', data: progressChallenge, color: 'green1', progress: true },
    { button: '전체 챌린지', data: allChallenge, color: 'yellow', progress: false },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {userInfo && <UserProfile_small name={userInfo.nickname} imageUrl={userInfo.image} />}
        <button
          className={styles.myTrophyBtn}
          onClick={() => {
            navigation(paths.TROPHY);
          }}
        >
          나의 트로피 보러 가기
        </button>
      </div>
      {SUCCESS && (
        <>
          <div className={styles.middle}>
            {tabData.map((tab, index) => {
              return (
                <button
                  className={openTab == index ? styles.clickedBtn : styles.nomalBtn}
                  onClick={() => {
                    setOpenTab(index);
                  }}
                  key={tab.button}
                >
                  {tab.button}
                </button>
              );
            })}
          </div>
          <div className={styles.bottom}>
            {tabData[openTab].progress ? (
              <ProgressChallengeList Challengedata={tabData[openTab].data} color={'green2'} />
            ) : (
              <ChallengeList Challengedata={tabData[openTab].data} color={'yellow'} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
