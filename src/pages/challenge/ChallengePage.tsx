import styles from './ChallengePage.module.scss';
import { UserProfile_small } from '/src/components/common/UserProfile_small';
import ChallengeList from './components/ChallengeList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CHALLENGE1 = [
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

const CHALLENGE2 = [
  {
    name: '4444',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '잉차! 올라가봅시다!!',
    progress: '50%',
  },
  {
    name: '5555',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '잉차! 올라가봅시다!!',
    progress: '70%',
  },
  {
    name: '66666',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '잉차! 올라가봅시다!!',
    progress: '90%',
  },
];

const tabData = [
  { button: '진행중인 챌린지', data: CHALLENGE1 },
  { button: '시작 전 챌린지', data: CHALLENGE2 },
];

export default function ChallengePage() {
  const [openTab, setOpenTab] = useState(0);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserProfile_small name={'산악대'} />
        <button
          className={styles.myTrophyBtn}
          onClick={() => {
            navigate('/trophy');
          }}
        >
          나의 트로피 보러 가기
        </button>
      </div>
      <div className={styles.middle}>
        {tabData.map((item, index) => {
          return (
            <button
              className={openTab == index ? styles.clickedBtn : styles.nomalBtn}
              onClick={() => {
                setOpenTab(index);
              }}
            >
              {item.button}
            </button>
          );
        })}
      </div>

      <div className={styles.bottom}>
        <ChallengeList data={tabData[openTab].data} color={openTab == 0 ? 'green1' : 'yellow'} />
      </div>
    </div>
  );
}
