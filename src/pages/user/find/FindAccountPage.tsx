import { useState } from 'react';

import styles from './FindAccountPage.module.scss';
import { Input } from '/src/components/common/Input';
import { Button } from '/src/components/common/Button';

export default function FindAccountPage() {
  const [value, setValue] = useState('');

  const onChange = () => {
    setValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>FIND ID</div>
        <div className={styles.description}>가입하신 전화번호로 이메일 찾기가 가능합니다.</div>
      </div>
      <div className={styles.bottom}>
        <form className={styles.formContainer}>
          <label htmlFor="email">휴대폰</label>
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
