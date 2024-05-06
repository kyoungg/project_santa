import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './FindPasswordPage.module.scss';
import { Button } from '/src/components/common/Button';
import { verifySchema } from './findUserSchema';
import { VertifyData, postDuplicateEmail, postEmail, postVertifyEmail } from '/src/services/userApi';
import Timer from './Timer';
import { paths } from '/src/utils/path';

export default function FindPasswordPage() {
  const navigation = useNavigate();
  const [emailData, setEmailData] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    resetField,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifySchema),
    mode: 'onChange',
  });

  //이메일 전송 후 버튼 disable 구현 필요
  const { mutate: sendEmail, isSuccess } = useMutation({
    mutationFn: postEmail,
  });

  const { mutate: isDuplicateEmail } = useMutation<boolean, Error, string>({
    mutationKey: ['duplicateEmail'],
    mutationFn: (email) => postDuplicateEmail({ email: email }),
    onSuccess: (res) => {
      if (!res) {
        resetField('email');
        setError('email', {
          message: '존재하지 않는 회원정보입니다.',
        });
      } else {
        sendEmail({ email: emailData });
      }
    },
    onError: () => {
      setError('email', {
        message: '다시 시도해주세요.',
      });
    },
  });

  const { mutate: vertifyEmail } = useMutation({
    mutationFn: postVertifyEmail,
    onSuccess: (res) => {
      if (!res) {
        return setError('authNumber', {
          message: '인증 코드를 다시 확인 해 주세요.',
        });
      }
      sessionStorage.setItem('email', emailData);
      navigation(paths.RESET_PASSWORD);
    },
    onError: () => {
      setError('authNumber', {
        message: '다시 시도해 주세요.',
      });
    },
  });

  const handleSendEmail = (email: string) => {
    setEmailData(email);
    return isDuplicateEmail(email);
  };

  const onSubmit = (vetrtifyData: VertifyData) => {
    vertifyEmail(vetrtifyData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>FIND PASSWORD</div>
        <div className={styles.description}>
          <p>가입하셨던 이메일을 통해 인증 코드를 보내드립니다.</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.inputContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <div className={styles.label}>이메일</div>
            <div className={styles.availabilityContainer}>
              <input type="text" className={styles.availabilityInput} {...register('email')} />
              <button
                type="button"
                className={styles.checkBtn}
                onClick={() => {
                  handleSendEmail(getValues('email'));
                }}
              >
                코드 발송
              </button>
            </div>
            {errors.email && <p className={styles.errorMessage}>{errors.email?.message}</p>}
            <div className={styles.label}>인증 코드</div>
            <div className={styles.vertifyCodeInput}>
              <input type="text" className={styles.availabilityInput} {...register('authNumber')} />
              <div className={styles.timerContainer}>{isSuccess && <Timer />}</div>
            </div>
            {errors.authNumber && <p className={styles.errorMessage}>{errors.authNumber?.message}</p>}
            <div className={styles.submitBtn}>
              <Button variant="green3" children={'인증하기'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
