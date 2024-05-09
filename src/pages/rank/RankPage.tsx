import Top3UserRank from './components/Top3UserRank';
import styles from './rankPage.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRankUsers, getMyRank, getTop3Ranks } from '/src/services/ranks';
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';

import { Rank } from '/src/services/ranks';

// todo infiniteQuery() 적용해보기
export default function RankPage() {
  const [page, setPage] = useState(0);
  const [ranks, setRanks] = useState<Rank[]>([]);

  const { data: top3Rank } = useQuery({ queryKey: ['top3Rank'], queryFn: getTop3Ranks });
  const { data: myRank } = useQuery({ queryKey: ['myrank'], queryFn: getMyRank });

  const {
    data: fetchData,
    isLoading,
    isFetching,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ['rank', page],
    queryFn: () => getRankUsers(page, 10),
    select: (data) => {
      return {
        content: data.content,
        totalPages: data.totalPages,
        last: data.last,
      };
    },
  });

  const handleIntersect = useCallback(() => {
    if (isFetching) return;
    if (isFetched && !isError) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, isFetched, isFetching, isError]);

  const { targetRef } = useIntersectionObserver<HTMLDivElement>(handleIntersect);

  useEffect(() => {
    const isSuccess = isFetched && !isError;
    if (isSuccess && fetchData) {
      setRanks(ranks.concat(fetchData.content));
    }
  }, [isFetched, isError, fetchData]);

  useEffect(() => {
    if (fetchData?.last) {
      targetRef.current = null;
    }
  }, [fetchData]);

  if (!top3Rank) return <>Loading...</>;

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>랭킹🏅</p>
          <div className={styles.subtitleWrapper}>
            <p className={styles.subtitle}>이달의 랭킹을 확인해보세요.</p>
            <p className={styles.subtitle}>랭킹은 매달 1일 초기화됩니다.</p>
          </div>
        </div>
        <Top3UserRank top3users={top3Rank} />
        {myRank ? (
          <div className={styles.myScoreInfo}>
            <div className={styles.userRank}>{myRank?.rank}</div>
            <div className={styles.myprofileImgWrapper}>
              <img src={`${myRank?.image}`} className={styles.userImg} />
            </div>
            <div className={styles.nickname}>{myRank?.nickname}님</div>
            <div className={styles.score}>{myRank?.score}</div>
          </div>
        ) : (
          <div className={styles.myScoreInfo}>로그인을 해주세요.</div>
        )}
        <div className={styles.userRankBoxTitle}>
          <div>순위</div>
          <div>닉네임</div>
          <div>점수</div>
        </div>
        <div className={styles.userRankListWrapper}>
          {ranks ? (
            <div className={styles.li}>
              {ranks?.map((user) => (
                <div className={styles.userRankItem} key={user.id}>
                  <div className={styles.rankWrapper}>
                    <div className={styles.userRank}>{user.rank}</div>
                    <div className={styles.profileImgWrapper}>
                      <img src={`${user.image}`} className={styles.userImg} />
                    </div>
                  </div>
                  <div className={styles.userNickname}>{user.nickname}</div>
                  <div className={styles.userScore}>{user.score}</div>
                </div>
              ))}
            </div>
          ) : (
            <>조회할 유저가 없습니다.</>
          )}
        </div>
      </div>
      <div className={styles.scrollbox} ref={targetRef} />
    </div>
  );
}
