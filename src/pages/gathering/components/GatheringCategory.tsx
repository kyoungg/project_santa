import { useState } from 'react';
import { Chips } from '../../../components/common/Chips';
import styles from '../../../styles/gathering/gatheringCategory.module.scss';

export function GatheringCategory() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoryList, setCategoryList] = useState([
    '맞춤추천',
    '백패킹',
    '힐링',
    '정상깨기',
    '출사',
    '식도락',
    'ff',
    'ddddd',
    'dddddd',
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.categoryContainer}>
        {categoryList.map((item, index) => (
          <Chips
            variant={`${item == categoryList[selectedIndex] ? 'square-green3' : 'square-green2'}`}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </Chips>
        ))}
      </div>
    </div>
  );
}
