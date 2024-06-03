import { Chips } from '../../../components/common/Chips';
import styles from '../../../styles/gathering/gatheringCategory.module.scss';
import { useCategoryStore } from '/src/store/store';
import { GatheringCategoryType } from '/src/types/gatheringTypes';
import { useCategoryList } from '/src/utils/useCategoryList';
import { useEffect, useState } from 'react';

export function GatheringCategory() {
  const { category, setCategory } = useCategoryStore();
  const categoryList = useCategoryList<GatheringCategoryType[]>((data) => data.data);

  const [categories, setCategories] = useState<GatheringCategoryType[]>([]);

  useEffect(() => {
    if (categoryList) {
      setCategories([{ id: 0, name: '맞춤추천' }, ...categoryList]);
    }
  }, [categoryList]);

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.categoryContainer}>
        {categories.map((_category: GatheringCategoryType) => (
          <Chips
            key={_category.id}
            variant={`${_category.name == category.name ? 'square-green3' : 'square-green2'}`}
            onClick={() => {
              setCategory({ id: _category.id, name: _category.name });
            }}
          >
            {_category.name}
          </Chips>
        ))}
      </div>
    </div>
  );
}
