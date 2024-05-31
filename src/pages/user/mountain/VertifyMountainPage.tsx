import { useMutation, useQueryClient } from '@tanstack/react-query';

import styles from './VertifyMountainPage.module.scss';
import useGeolocation from '/src/hooks/useGeolocation';
import { VertifyData, postVertifyMountain } from '/src/services/mountainAPi';
import SuccessImg from '/images/mountaun_success.png';
import loadingImg from '/images/mountain_loding.png';
import { useNavigate } from 'react-router-dom';
import { paths } from '/src/utils/path';

export default function VertifyMountainPage() {
  const navigation = useNavigate();
  const location = useGeolocation();
  const queryClient = useQueryClient();

  const {
    mutate,
    isSuccess,
    data: MountainData,
  } = useMutation({
    mutationFn: (vertifyData: VertifyData) => postVertifyMountain(vertifyData),
    onSuccess: (data) => {
      data.data;
      queryClient.invalidateQueries({ queryKey: ['myMountains'] });
    },
    onError(error) {
      // @ts-ignore
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    },
  });

  const onVertifyClick = () => {
    const date = new Date();
    const climbDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    const vertifyData = {
      climbDate: climbDate,
      latitude: location.coordinates?.lng,
      longitude: location.coordinates?.lat,
    };
    mutate(vertifyData);
  };

  // const SUCCESS = !isError && isPending;
  return (
    <div className={styles.container}>
      {isSuccess ? (
        <>
          <div className={styles.title}>{MountainData?.data.mountainName} 인증되었습니다!</div>
          <img className={styles.image} src={SuccessImg} />
          <button
            className={styles.vertifyBtn}
            style={{ backgroundColor: '#C1D95F' }}
            onClick={() => {
              navigation(paths.PROFILE);
            }}
          >
            완료
          </button>
        </>
      ) : (
        <>
          <div className={styles.title}>산 정상에 계신가요?</div>
          <img className={styles.image} src={loadingImg} />
          <button className={styles.vertifyBtn} onClick={onVertifyClick} style={{ backgroundColor: '#FBC241' }}>
            네! 인증할래요
          </button>
          <button
            className={styles.vertifyBtn}
            style={{ backgroundColor: '#C1D95F' }}
            onClick={() => {
              navigation(-1);
            }}
          >
            돌아갈게요
          </button>
        </>
      )}
    </div>
  );
}
