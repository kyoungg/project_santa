import { useQuery } from '@tanstack/react-query';

import styles from './ChallengeList.module.scss';
import { TotalChallenge, getAllChallenge } from '/src/services/challengeApi';
import { useEffect, useState } from 'react';
import ChallengeCard from './ChallengeCard';

const PAGE_SIZE = 4;
export default function ChallengeList() {
  const [page, setPage] = useState(0);
  const [challengeList, setChallengeList] = useState<TotalChallenge[]>([]);
  const {
    data: allChallenge,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['allChallenge', page],
    queryFn: () => getAllChallenge(page, PAGE_SIZE),
    select: (data) => {
      return {
        content: data.data.content,
        totalPage: data.data.totalPages,
      };
    },
  });

  useEffect(() => {
    //진행중인 챌린지 갔다 돌아왔을 때 리스트 초기화
    setChallengeList([]);
  }, []);

  useEffect(() => {
    const isSuccess = isFetched && !isError;
    if (isSuccess && allChallenge) {
      setChallengeList((prevList) => [...prevList, ...allChallenge.content]);
      console.log('mountainList', challengeList);
    }
  }, [isFetched, isError, allChallenge]);

  const isSuccess = !isError && isFetched;
  return (
    <>
      {isSuccess &&
        challengeList?.map((challengeData: TotalChallenge, index: number) => {
          return (
            <div key={`${challengeData.name}-${challengeData.id}`} className={styles.gap}>
              <ChallengeCard
                challengeData={challengeData}
                setPage={setPage}
                isLast={allChallenge && allChallenge?.totalPage >= page && challengeList.length === index + 1}
              />
            </div>
          );
        })}
    </>
  );
}
