import { Link } from 'react-router-dom';

import { GoTrophy } from 'react-icons/go';
import styles from './TrophyBox.module.scss';
import { paths } from '/src/utils/path';

interface Trophy {
  name: string;
  description: string;
  img: string;
  clear_standard: number;
}

const ACHIEVE_TROPHY: Trophy[] = [
  {
    name: '첫 발걸음',
    description: '산 1개 인증하기',
    img: 'https://cdn.pixabay.com/photo/2022/10/07/09/24/little-panda-7504633_1280.jpg',
    clear_standard: 5,
  },
  {
    name: '두두번번째째',
    description: '산 2개 인증하기',
    img: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    clear_standard: 5,
  },
  {
    name: '333',
    description: '산 3개 인증하기',
    img: 'https://cdn.pixabay.com/photo/2020/05/03/13/09/puppy-5124947_1280.jpg',
    clear_standard: 5,
  },
  {
    name: '444',
    description: '산 4개 인증하기',
    img: 'https://cdn.pixabay.com/photo/2024/04/10/14/25/dog-8688177_1280.jpg',
    clear_standard: 5,
  },
];

export default function () {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>획득한 트로피</p>
        <Link to={paths.CHALLENGE}>
          <GoTrophy className={styles.icon} />
        </Link>
      </div>
      <div className={styles.trophyList}>
        {ACHIEVE_TROPHY.map((trophy) => {
          return <img key={trophy.name} className={styles.trophyImg} src={trophy.img} />;
        })}
      </div>
    </div>
  );
}
