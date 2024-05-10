import { Button } from '../../components/common/Button';

import AchievementsBox from './components/AchievementsBox';
import CategoryBox from './components/CategoryBox';
import GatheringBox from './components/GatheringBox';
import TrophyBox from './components/TrophyBox';
import styles from './profile.module.scss';
// import LoginBtn from './components/LoginBtn';
// import kakaoLogo from '/images/kakao.png';
// import googleLogo from '/images/google.svg';
import { useNavigate } from 'react-router-dom';
import { paths } from '/src/utils/path';
import useUserInfo from '/src/hooks/useUserInfo';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '/src/services/userApi';
import { getIsUser } from '/src/services/auth';

export default function ProfilePage() {
  const navigation = useNavigate();
  const userInfo = useUserInfo();

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.clear();
      alert('회원 탈퇴가 완료되었습니다.');
      navigation(paths.LOGIN);
    },
    onError: () => {
      alert('다시 시도해 주세요.');
    },
  });

  const onClickDeleteBtn = () => {
    if (window.confirm('정말 탈퇴하시겠어요?')) {
      mutate();
    }
  };

  const isUser = getIsUser();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          {userInfo && <img className={styles.userImg} src={userInfo?.image} />}
          <div className={styles.userName}>{isUser ? userInfo?.nickname : '프로필 정보를 추가해주세요!'}</div>
          <div className={styles.btn}>
            <Button
              variant={'rounded-outline'}
              children={isUser ? '프로필 수정' : '프로필 추가'}
              onClick={() => {
                navigation(paths.PROFILE_EDIT);
              }}
            />
          </div>
        </div>
        <div className={styles.infoContainer}>
          <TrophyBox />
          <div className={styles.middle}>
            <div className={styles.left}>
              <CategoryBox />
              <GatheringBox />
            </div>
            <div className={styles.right}>
              <AchievementsBox />
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          {/* <LoginBtn loginType={'kakao'} imgUrl={kakaoLogo} />
      <LoginBtn loginType={'google'} imgUrl={googleLogo} state={'연동하기'} /> */}
          <button className={styles.withdrawalBtn} onClick={onClickDeleteBtn}>
            회원 탈퇴
          </button>
        </div>
      </div>
    </>
  );
}
