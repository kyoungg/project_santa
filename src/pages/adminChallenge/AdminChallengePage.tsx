import styles from './AdminChallenge.module.scss';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { TitleContainer } from '../gathering/components/TitleContainer';
import ChallengeList from './components/ChallengeList';
import AddChallenge from './components/AddChallenge';
import { getAllChallengList, deleteChallenge } from '/src/services/adminChallengesApi';

export default function AdminChallengePage() {
  const queryClient = useQueryClient();
  const [isItPosting, setIsItPosting] = useState(false);
  const {
    data: challengeList,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['AdminchallengeList'],
    queryFn: getAllChallengList,
  });

  const { mutate } = useMutation({
    mutationFn: deleteChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AdminchallengeList'] });
      alert('삭제 완료되었습니다!');
    },
    onError: () => {
      alert('다시 시도해주세요');
    },
  });

  const handleDelete = (id: number) => {
    mutate(id);
  };
  if (!challengeList) return <>loading...</>;

  const isSuccess = !isError && isFetched;
  return (
    <>
      {isSuccess && (
        <div className={styles.container}>
          <TitleContainer title="챌린지 관리" />
          <div className={styles.selectTabBar}>
            <div
              onClick={() => setIsItPosting(false)}
              className={!isItPosting ? styles.ClickedtabItem : styles.tabItem}
            >
              업로드된 챌린지
            </div>
            <div onClick={() => setIsItPosting(true)} className={isItPosting ? styles.ClickedtabItem : styles.tabItem}>
              챌린지 등록
            </div>
          </div>
          {isItPosting ? <AddChallenge /> : <ChallengeList onDelete={handleDelete} challengeList={challengeList} />}
        </div>
      )}
    </>
  );
}
