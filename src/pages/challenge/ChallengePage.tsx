// import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import styles from './ChallengePage.module.scss';
import { UserProfile_small } from '/src/components/common/UserProfile_small';
// import ChallengeList from './components/ChallengeList';
import { paths } from '/src/utils/path';
// import { getAllChallenge } from '/src/services/challengeApi';

const CHALLENGE = [
  {
    name: '11111',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '영차! 올라가봅시다!!',
    progress: '20%',
  },
  {
    name: '22222',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '영차! 올라가봅시다!!',
    progress: '50%',
  },
  {
    name: '3333',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '영차! 올라가봅시다!!',
    progress: '90%',
  },
];

export default function ChallengePage() {
  // const { data: allchallenge } = useQuery({
  //   queryKey: ['allChallenge'],
  //   queryFn: getAllChallenge,
  //   select: (data) => data.data,
  //   staleTime: Infinity,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  const tabData = [
    { button: '진행중인 챌린지', data: CHALLENGE, color: 'green1' },
    { button: '시작 전 챌린지', data: CHALLENGE, color: 'yellow' },
  ];

  const [openTab, setOpenTab] = useState(0);
  const navigate = useNavigate();

  // const challengeList = allchallenge.content;
  // console.log(challengeList);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserProfile_small name={'산악대'} />
        <button
          className={styles.myTrophyBtn}
          onClick={() => {
            navigate(paths.TROPHY);
          }}
        >
          나의 트로피 보러 가기
        </button>
      </div>
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
        {/* <ChallengeList data={tabData[openTab].data} color={tabData[openTab].color} /> */}
      </div>
    </div>
  );
}
