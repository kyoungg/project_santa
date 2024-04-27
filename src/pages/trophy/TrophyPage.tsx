import styles from './TrophyPage.module.scss';
import trophyImg from '/images/trophyImg.png';

const CHALLENGE = [
  {
    name: '4444',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '잉차! 올라가봅시다!!',
    progress: '50%',
  },
  {
    name: '5555',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '잉차! 올라가봅시다!!',
    progress: '70%',
  },
  {
    name: '66666',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '잉차! 올라가봅시다!!',
    progress: '90%',
  },
  {
    name: '7777',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '잉차! 올라가봅시다!!',
    progress: '90%',
  },
];

const name = '어쩌구';

export default function TrophyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={trophyImg} className={styles.mainImg} />
        <div className={styles.title}>{name}님의 트로피 리스트 🏅</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.trophyList}>
          {CHALLENGE.map((item) => {
            return (
              <div className={styles.trophyContainer}>
                <img className={styles.trophyImg} src={item.imgUrl} />
                <p className={styles.trophyName}>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
