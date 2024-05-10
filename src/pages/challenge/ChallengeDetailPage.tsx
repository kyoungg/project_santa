import { useQuery } from '@tanstack/react-query';
import styles from './ChallengeDetailPage.module.scss';
import { getChallengeDetail } from '/src/services/challengeApi';
import logo from '/images/logo.svg';

export default function ChallengeDetailPage() {
  const id = new URL(window.location.href).searchParams.get('id');
  const challengeId = Number(id);

  const {
    data: challenge,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['challengeDetail', id],
    queryFn: () => getChallengeDetail(challengeId),
    select: (data) => data,
    staleTime: Infinity,
  });

  return (
    <>
      {!isError && isFetched && (
        <div className={styles.container}>
          <div className={styles.pageTitle}>챌린지 살펴보기</div>
          <div className={styles.challengeContainer}>
            <div className={styles.top}>
              <div className={styles.imgContainer}>
                <img src={challenge?.image} />
              </div>
              <div className={styles.title}>
                <div>{challenge?.name}</div>
              </div>
            </div>
            <div className={styles.middle}>
              <div className={styles.detailText}>
                <div className={styles.label}>관련 카테고리</div>
                <div className={styles.discription}>{challenge?.categoryName}</div>
              </div>
              <div className={styles.detailText}>
                <div className={styles.label}>챌린지 소개</div>
                <div className={styles.discription}>{challenge?.description}</div>
              </div>
              <div className={styles.detailText}>
                <div className={styles.label}>챌린지 성공 조건</div>
                <span className={styles.discription}>{challenge?.categoryName} 관련 모임</span>
                <span className={styles.discription}> {challenge?.clearStandard}번 참가하기</span>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <img src={logo} />
          </div>
        </div>
      )}
    </>
  );
}
