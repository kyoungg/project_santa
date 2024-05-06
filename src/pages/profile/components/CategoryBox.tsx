import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPreferCategory } from '/src/services/categoryApi';

import { FaGear } from 'react-icons/fa6';
import styles from './CategoryBox.module.scss';
import { paths } from '/src/utils/path';

interface CategoryName {
  category: { name: string };
}

export default function CategoryBox() {
  const {
    data: preferCategory,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ['preferCategory'],
    queryFn: getPreferCategory,
    select: (data) => data.data,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const Success = isFetched && !isError;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>선호 카테고리</p>
        <Link to={paths.CATEGORY}>
          <FaGear className={styles.icon} />
        </Link>
      </div>
      <div className={styles.categoryList}>
        {Success ? (
          preferCategory.map((category: CategoryName) => {
            return <p key={category.category.name}>#{category.category.name}</p>;
          })
        ) : (
          <p>선호 카테고리를 설정하세요!</p>
        )}
      </div>
    </div>
  );
}
