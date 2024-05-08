import { useQuery } from '@tanstack/react-query';

import styles from './MountainDetailPage.module.scss';
import { getMountainDetail } from '/src/services/mountainAPi';
import logo from '/images/logo.svg';

export default function MountainDetailPage() {
  const id = new URL(window.location.href).searchParams.get('id');
  const mountainId = Number(id);

  const { data: mountain, isSuccess } = useQuery({
    queryKey: ['mountainDetail', id],
    queryFn: () => getMountainDetail(mountainId),
    select: (data) => data.data,
  });

  console.log(mountain);

  return (
    <>
      {isSuccess && (
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.title}>{mountain.name}</div>
          </div>
          <div className={styles.middle}>
            <div className={styles.label}>위치</div>
            <p>{mountain.location}</p>
            <div className={styles.label}>높이</div>
            <p>{mountain.height} M</p>
            <div className={styles.label}>정보</div>
            <p>{mountain.description}</p>
            <div className={styles.label}>등산 포인트</div>
            <p>{mountain.point}</p>
          </div>
          <div className={styles.bottom}>
            <img className={styles.logo} src={logo} />
          </div>
        </div>
      )}
    </>
  );
}
