import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';
import { TotalChallenge } from '/src/services/challengeApi';
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';

interface Props {
  challengeData: TotalChallenge;
  isLast?: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChallengeCard({ challengeData, setPage, isLast }: Props) {
  const { targetRef } = useIntersectionObserver<HTMLDivElement>(() => {
    if (isLast && setPage) {
      setPage((prev) => prev + 1);
    }
  });

  return (
    <>
      <div
        ref={(_ref) => {
          if (isLast) {
            targetRef.current = _ref;
          } else {
            _ref = null;
          }
        }}
      >
        <Card variant="yellow">
          <div className={styles.container}>
            <div className={styles.top}>
              <img src={challengeData.image} />
              <div className={styles.introduce}>
                <p className={styles.name}>{challengeData.name}</p>
                <p className={styles.description}>{challengeData.description}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
