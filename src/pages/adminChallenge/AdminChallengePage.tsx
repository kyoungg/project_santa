import styles from './AdminChallenge.module.scss';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { TitleContainer } from '../gathering/components/TitleContainer';
import ChallengeList from './components/ChallengeList';
import AddChallenge from './components/AddChallenge';
import { getAllChallengList, deleteChallenge } from '/src/services/adminChallengesApi';

export default function AdminChallengePage() {
  const [isItPosting, setIsItPosting] = useState(false);
  const { data: challengeList } = useQuery({ queryKey: ['AdminchallengeList'], queryFn: getAllChallengList });

  const { mutate } = useMutation({ mutationFn: deleteChallenge });

  const handleDelete = (id: number) => {
    mutate(id);
  };
  if (!challengeList) return <>loading...</>;
  useEffect(() => {}, [challengeList]);
  return (
    <div className={styles.container}>
      <TitleContainer title="챌린지 관리" />
      <div className={styles.selectTabBar}>
        <div onClick={() => setIsItPosting(false)} className={styles.ClickedtabItem}>
          업로드된 챌린지
        </div>
        <div onClick={() => setIsItPosting(true)} className={styles.tabItem}>
          챌린지 등록
        </div>
      </div>
      {isItPosting ? <AddChallenge /> : <ChallengeList onDelete={handleDelete} challengeList={challengeList} />}
    </div>
  );
}
