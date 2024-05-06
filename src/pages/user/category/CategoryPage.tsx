import { useQuery } from '@tanstack/react-query';
import { getAllCategory } from '/src/services/categoryApi';

import styles from './CategoryPage.module.scss';
import { Button } from '/src/components/common/Button';
import useUserInfo from '/src/hooks/useUserInfo';

const ICON = ['⛰️', '❓', '🌿', '🍽️', '👊🏻', '🎒', '📸', '🍁', '🌍'];

export default function CategoryPage() {
  const { data: allCategoryData } = useQuery({
    queryKey: ['allCategoryData'],
    queryFn: getAllCategory,
    select: (data) => data.data,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const userInfo = useUserInfo();

  const newCategoryData = allCategoryData?.map((caterory, index) => {
    return { ...caterory, icon: ICON[index] };
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>{userInfo?.nickname}님, 환영해요!</h2>
        <p>시작에 앞서 선호하시는 카테고리를 선택해주세요.</p>
      </div>
      <div className={styles.middle}>
        <div className={styles.categoryContainer}>
          <h3 className={styles.title}>목적</h3>
          <div className={styles.categoryList}>
            {newCategoryData?.map((item) => (
              <div key={item.name} className={styles.categoryBox}>
                <p className={styles.icon}>{item.icon}</p>
                <p className={styles.name}>#{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className={styles.categoryContainer}>
          <h3 className={styles.title}>운동 능력</h3>
          <div className={styles.categoryList}>
            {PHYSICAL.map((item) => (
              <div key={item.name} className={styles.categoryBox}>
                <p className={styles.icon}>{item.icone}</p>
                <p className={styles.name}>#{item.name}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <div className={styles.bottom}>
        <Button variant="green1">이제 시작 해 볼까요?</Button>
      </div>
    </div>
  );
}
