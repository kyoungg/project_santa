import { Chips } from '../../../components/common/Chips';
import styles from '../../../styles/gathering/gatheringCategory.module.scss';
import { useCategoryStore } from '/src/store/store';
import type { GatheringCategoryType } from '/src/services/gatheringApi';
import { useCategoryList } from '/src/utils/useCategoryList';
import { useEffect, useState } from 'react';


export function GatheringCategory() {
  const { category, setCategory } = useCategoryStore();
  const categoryList = useCategoryList<GatheringCategoryType[]>((data) => data.data);

  const [categories, setCategories] = useState<GatheringCategoryType[]>([]);
  useEffect(() => {
    console.log('선택된 카테고리 : ', category,)
    if (categoryList) {
      setCategories([{ id: 0, name: '맞춤추천' }, ...categoryList])
    }
  }, [category])

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.categoryContainer}>
        {categoryList && categories.map((_category: GatheringCategoryType) => (
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
