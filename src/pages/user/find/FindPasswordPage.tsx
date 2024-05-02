import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './FindPasswordPage.module.scss';
import { Button } from '/src/components/common/Button';
import { verifySchema } from './findUserSchema';
import { Email, VertifyData, postDuplicateEmail, postEmail, postVertifyEmail } from '/src/services/userApi';
import Timer from './Form/Timer';

export default function FindPasswordPage() {
  const navigation = useNavigate();
  const [emailData, setEmailData] = useState('');

  // useEffect(() => {
  //   sendEmail({ email: emailData });
  //   setValue('email', emailData);
  // }, [emailData]);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifySchema),
    mode: 'onChange',
  });

  //이메일 보내기
  const { mutate: sendEmail } = useMutation<Response, Error, Email>({
    mutationKey: ['sendEmail'],
    mutationFn: (email) => postEmail(email),
  });

  //이메일 중복 확인
  const {
    mutate: isDuplicateEmail,
    // isError,
    // isPending,
  } = useMutation<boolean, Error, string>({
    mutationKey: ['duplicateEmail'],
    mutationFn: (email) => postDuplicateEmail({ email: email }),
    onSuccess: (res) => {
      //유저 정보가 있음
      if (res) {
        //유저 이메일 업데이트
        setEmailData(getValues('email'));
        //이메일 보내기
        sendEmail({ email: emailData });
      }
    },
  });

  // if (true) {
  //   console.log('나 이 이메일로 인증코드 보낼거임', email);
  //   sendEmail(email);
  //   setEmailData(email.email);
  // }
  // if (false) {
  //   resetField('email');
  //   setError('email', {
  //     message: '존재하지 않는 회원정보입니다.',
  //   });
  // } else {
  //   setError('email', {
  //     message: '다시 시도해주세요.',
  //   });
  // }

  //이메일 인증
  const { mutate: vertifyEmail } = useMutation<Response, Error, VertifyData>({
    mutationKey: ['vertifyEmail'],
    mutationFn: (vetrtifyData) => postVertifyEmail(vetrtifyData),
    onSuccess: () => {
      navigation('비번 초기화 페이지');
    },
    onError: () => {
      setError('authNumber', {
        message: '인증 코드를 다시 확인 해 주세요.',
      });
    },
  });

  //이메일 인증 submit
  const onSubmit = (vetrtifyData: VertifyData) => {
    console.log('나 이 데이터로 인증할거임', vetrtifyData);
    vertifyEmail(vetrtifyData);
  };

  //이메일코드 전송 함수
  const handleSendEmail = (email: string) => {
    //중복 검사
    if (email !== '') {
      return isDuplicateEmail(email);
    }
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
                className={styles.checkBtn}
                onClick={() => {
                  const email = getValues('email');
                  handleSendEmail(email);
                }}
              >
                코드 발송
              </button>
            </div>
            {errors.email && <p className={styles.errorMessage}>{errors.email?.message}</p>}
            <div className={styles.label}>인증 코드</div>
            <div className={styles.vertifyCodeInput}>
              <input type="text" className={styles.availabilityInput} {...register('authNumber')} />
              <div className={styles.timerContainer}>
                <Timer />
              </div>
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
