import { Link } from 'react-router-dom';
import styles from './CategoryBox.module.scss';
import { FaGear } from 'react-icons/fa6';

const CATEGORY = ['출사', '힐링', '아마추어'];

export default function CategoryBox() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>선호 카테고리</p>
        <Link to="/카테고리 수정">
          <FaGear className={styles.icon} />
        </Link>
      </div>
      <div className={styles.categoryList}>
        {CATEGORY.map((item) => {
          return <p>#{item}</p>;
        })}
      </div>
    </div>
  );
}
