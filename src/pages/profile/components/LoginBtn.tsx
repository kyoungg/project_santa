import styles from './LoginBtn.module.scss';

interface Props {
  loginType: 'kakao' | 'google';
  imgUrl: string;
  state?: string;
}

export default function LoginBtn({ loginType, imgUrl, state = '연동완료' }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.company}>
        <img src={imgUrl} className={styles.logoImg} />
        <p>{loginType}</p>
      </div>
      <div className={state == '연동완료' ? styles.connected : styles.connect}>{state}</div>
    </div>
  );
}
