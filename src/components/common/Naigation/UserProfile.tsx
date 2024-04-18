import styles from './UserProfile.module.scss';

const user: { name: string; rank: number; img: string } = {
  name: '산악대장',
  rank: 1256,
  img: 'https://cdn.pixabay.com/photo/2022/08/05/05/59/korea-7366036_1280.jpg',
};

export default function UserProfile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userProfile}>
        <img src={user.img} />
        <div className={styles.rankBox}>
          <p>내 랭킹🏅</p>
          <p>{user.rank}점</p>
        </div>
      </div>
      <div className={styles.textBox}>
        <p>반갑습니다 {user.name}님!</p>
        <p>오늘도 즐거운 등산 되세요😄</p>
      </div>
    </div>
  );
}
