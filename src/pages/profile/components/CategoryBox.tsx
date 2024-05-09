import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PreferCategory, getPreferCategory } from '/src/services/categoryApi';

import { FaGear } from 'react-icons/fa6';
import styles from './CategoryBox.module.scss';
import { paths } from '/src/utils/path';

export default function CategoryBox() {
  const navigation = useNavigate();
  const { data: preferCategory } = useQuery({
    queryKey: ['preferCategory'],
    queryFn: getPreferCategory,
    select: (data) => data.data,
    staleTime: Infinity,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>선호 카테고리</p>
        {preferCategory && preferCategory?.length == 0 && (
          <FaGear
            className={styles.icon}
            onClick={() => {
              navigation(paths.CATEGORY);
            }}
          />
        )}
      </div>
      <div className={styles.categoryList}>
        {preferCategory && preferCategory.length !== 0 ? (
          preferCategory.map((category: PreferCategory) => {
            return <p key={category.categoryName}>#{category.categoryName}</p>;
          })
        ) : (
          <p className={styles.nothingCategoty}>선호 카테고리를 설정하세요</p>
        )}
      </div>
    </div>
  );
}
