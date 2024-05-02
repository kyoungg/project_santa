import styles from './CategoryPage.module.scss';
import { Button } from '/src/components/common/Button';

const CATEGORY: CategoryItem[] = [
  { icone: '🌿', name: '힐링' },
  { icone: '🍁', name: '단풍' },
  { icone: '👊🏻', name: '정상등반' },
  { icone: '🎒', name: '백패킹' },
  { icone: '📸', name: '출사' },
  { icone: '🍽️', name: '식도락' },
  { icone: '🌍', name: '플로깅' },
];

const PHYSICAL: CategoryItem[] = [
  { icone: '🌱', name: '비기너' },
  { icone: '🪴', name: '아마추어' },
  { icone: '🌳', name: '프로' },
];

interface CategoryItem {
  icone: string;
  name: string;
}

export default function Category() {
  const name = '엘리스';

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>{name}님, 환영해요!</h2>
        <p>시작에 앞서 선호하시는 카테고리를 선택해주세요.</p>
      </div>
      <div className={styles.middle}>
        <div className={styles.categoryContainer}>
          <h3 className={styles.title}>목적</h3>
          <div className={styles.categoryList}>
            {CATEGORY.map((item) => (
              <div key={item.name} className={styles.categoryBox}>
                <p className={styles.icon}>{item.icone}</p>
                <p className={styles.name}>#{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <h3 className={styles.title}>운동 능력</h3>
          <div className={styles.categoryList}>
            {PHYSICAL.map((item) => (
              <div key={item.name} className={styles.categoryBox}>
                <p className={styles.icon}>{item.icone}</p>
                <p className={styles.name}>#{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button variant="green1">이제 시작 해 볼까요?</Button>
      </div>
    </div>
  );
}
