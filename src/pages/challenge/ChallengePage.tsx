import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import styles from './ChallengePage.module.scss';
import { UserProfile_small } from '/src/components/common/UserProfile_small';
import ChallengeList from './components/ChallengeList';
import ProgressChallengeList from './components/ProgressChallengeList';
import { paths } from '/src/utils/path';
import useUserInfo from '/src/hooks/useUserInfo';

export default function ChallengePage() {
  const [openTab, setOpenTab] = useState('progress');
  const navigation = useNavigate();
  const userInfo = useUserInfo();

  const onClickTabBtn = () => {
    openTab == 'all' ? setOpenTab('progress') : setOpenTab('all');
  };

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
      <div className={styles.middle}>
        <button className={openTab == 'progress' ? styles.clickedBtn : styles.nomalBtn} onClick={onClickTabBtn}>
          진행중인 챌린지
        </button>
        <button className={openTab == 'all' ? styles.clickedBtn : styles.nomalBtn} onClick={onClickTabBtn}>
          전체 챌린지
        </button>
      </div>
      <div className={styles.bottom}>
        {openTab == 'all' && <ChallengeList />}
        {openTab == 'progress' && <ProgressChallengeList />}
      </div>
    </div>
  );
}
