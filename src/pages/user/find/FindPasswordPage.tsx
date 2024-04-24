import { useState } from 'react';

import styles from './FindPasswordPage.module.scss';
import { Input } from '/src/components/common/Input';
import { Button } from '/src/components/common/Button';

export default function FindPasswordPage() {
  const [value, setValue] = useState('');

  const onChange = () => {
    setValue(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>FIND PASSWORD</div>
        <div className={styles.description}>
          <p>가입하신 전화번호, 이메일과 이름으로</p>
          <p>비밀번호 찾기가 가능합니다.</p>{' '}
        </div>
      </div>
      <div className={styles.bottom}>
        <form className={styles.formContainer}>
          <label htmlFor="email">이메일</label>
          <Input
            variant={'outline-gray'}
            onChange={onChange}
            value={value}
            placeholder={`2teamontheTop@gmail.com`}
          ></Input>
          <label htmlFor="name">이름</label>
          <Input variant={'outline-gray'} onChange={onChange} value={value} placeholder={``}></Input>
          <label htmlFor="phoneNumber">휴대폰</label>
          <Input
            variant={'outline-gray'}
            onChange={onChange}
            value={value}
            placeholder={`'-'를 제외하고 입력 해 주세요.`}
          ></Input>
        </form>
        <div className={styles.submitBtn}>
          <Button children={'확인'} />
        </div>
      </div>
    </div>
  );
}
