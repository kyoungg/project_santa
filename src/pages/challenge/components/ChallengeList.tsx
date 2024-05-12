import { useQuery } from '@tanstack/react-query';

import styles from './ChallengeList.module.scss';
import { TotalChallenge, getAllChallenge } from '/src/services/challengeApi';
import { useEffect, useState } from 'react';
import ChallengeCard from './ChallengeCard';
import { useNavigate } from 'react-router-dom';
import { paths } from '/src/utils/path';

const PAGE_SIZE = 10;
export default function ChallengeList() {
  const navigation = useNavigate();
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
    }
  }, [isFetched, isError, allChallenge]);

  return (
    <>
      {challengeList?.map((challengeData: TotalChallenge, index: number) => {
        return (
          <div
            key={`${challengeData.name}-${challengeData.id}`}
            className={styles.gap}
            onClick={() => {
              navigation(`${paths.CHALLENGE_DETAIL}?id=${challengeData.id}`);
            }}
          >
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
