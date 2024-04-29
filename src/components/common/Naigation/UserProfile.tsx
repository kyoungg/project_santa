import { useQuery } from '@tanstack/react-query';
import styles from './UserProfile.module.scss';
import { getUserInfo } from '/src/services/userApi';

//유저 랭킹도 요구
const USERANK = 7777;
//기본 이미지
const PUBLIC_IMG = 'https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_1280.png';

export default function UserProfile() {
  const { data: userInfo, isSuccess } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (data) => data.data,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userProfile}>
        <img src={isSuccess ? userInfo?.image : PUBLIC_IMG} />
        <div className={styles.rankBox}>
          <p>내 랭킹🏅</p>
          {isSuccess ? <p>{USERANK}</p> : ''}
        </div>
      </div>
      <div className={styles.textBox}>
        <p>반갑습니다 {isSuccess ? userInfo.nickname : '비회원'}님!</p>
        <p>오늘도 즐거운 등산 되세요😄</p>
      </div>
    </div>
  );
}
