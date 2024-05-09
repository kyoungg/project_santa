import { Chips } from '../../../components/common/Chips';
import styles from '../../../styles/gathering/gatheringCategory.module.scss';
import { useCategoryStore } from '/src/store/store';
import type { GatheringCategory } from '/src/services/gatheringApi';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps
const categoryList: GatheringCategory[] = [
  // '맞춤추천',
  '등산',
  '힐링',
  '정상깨기',
  '출사',
  '식도락',
  '백패킹',
  '기타',
];
export function GatheringCategory() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, setCategory } = useCategoryStore();


  return (
    <div className={styles.scrollContainer}>
      <div className={styles.categoryContainer}>
        {categoryList.map((item) => (
          <Chips
            key={item}
            variant={`${item == category ? 'square-green3' : 'square-green2'}`}
            onClick={() => {
              setCategory(item);
            }}
          >
            {item}
          </Chips>
        ))}
      </div>
    </div>
  );
}
