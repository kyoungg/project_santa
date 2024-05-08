import { TotalMountain } from '/src/services/mountainAPi';
import styles from './MountainList.module.scss';
import { Card } from '/src/components/common/Card';
import logo from '/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';

interface Props {
  mountainData: TotalMountain;
  isLast?: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function MountainList({ mountainData, setPage, isLast }: Props) {
  const navigation = useNavigate();
  const { targetRef } = useIntersectionObserver<HTMLDivElement>(() => {
    if (isLast && setPage) {
      setPage((prev) => prev + 1);
    }
  });

  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          navigation(`/mountain/detail?id=${mountainData.id}`);
        }}
        ref={(_ref) => {
          if (isLast) {
            console.log('현재 ref 위치', mountainData.id);
            targetRef.current = _ref;
          } else {
            _ref = null;
          }
        }}
      >
        <Card variant={'green2'}>
          <div className={styles.textContainer}>
            <div className={styles.top}>
              <div className={styles.name}>{mountainData.name}</div>
            </div>
            <div className={styles.middle}>
              <div className={styles.location}>{mountainData.location}</div>
            </div>
            <div className={styles.bottom}>
              <img className={styles.logo} src={logo} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
