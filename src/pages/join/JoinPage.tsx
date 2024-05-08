import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import styles from '/src/styles/join/join.module.scss';
import { paths } from '/src/utils/path';
import { postDuplicateEmail, postDuplicateNickname, postJoin } from '/src/services/userApi';
import { JoinData } from '/src/services/userApi';
import { joinSchema } from './joinSchema';

export interface JoinSchema {
  email: string;
  checkPassword: string;
  password: string;
  name: string;
  nickname: string;
  phoneNumber: string;
}

function JoinPage() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    getValues,
    resetField,
    formState: { errors },
  } = useForm<JoinSchema>({
    resolver: yupResolver(joinSchema),
    mode: 'onBlur',
  });

  const { mutate } = useMutation({
    mutationFn: postJoin,
    onSuccess: () => {
      alert('가입이 완료되었습니다!');
      navigate(paths.LOGIN);
    },
    onError: (error) => {
      console.log('login error', error);
    },
  });

  const { mutate: isDuplicateEmail } = useMutation({
    mutationKey: ['duplicateEmail'],
    mutationFn: postDuplicateEmail,
    onSuccess: (data) => {
      if (data) {
        resetField('email');
        setError('email', {
          message: '이미 등록된 이메일입니다.',
        });
      } else {
        setCheckEmail(true);
      }
    },
  });

  const { mutate: isDuplicateNickName } = useMutation({
    mutationKey: ['duplicateNickName'],
    mutationFn: postDuplicateNickname,
    onSuccess: (data) => {
      if (data) {
        resetField('nickname');
        setError('nickname', {
          message: '이미 사용중인 닉네임입니다.',
        });
      } else {
        setCheckNickname(true);
      }
    },
  });

  const handleDuplicateCheckEmail = async (email: string) => {
    const isVaild = await trigger('email');
    if (!isVaild) {
      return;
    }

    isDuplicateEmail({ email: email });
  };

  const handleDuplicateCheckNickname = async (nickname: string) => {
    const isVaild = await trigger('nickname');
    if (!isVaild) {
      return;
    }
    isDuplicateNickName({ nickname: nickname });
  };

  const onSubmit = (joinData: JoinData) => {
    if (!checkEmail) {
      return setError('email', {
        message: '이메일 중복 확인을 해 주세요.',
      });
    }
    if (!checkNickname) {
      return setError('nickname', {
        message: '닉네임 중복 확인을 해 주세요.',
      });
    }
    if (checkNickname && checkNickname) {
      return mutate(joinData);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.errorMessage}>*는 필수 입력사항입니다.</p>
        <div className={styles.inputContainer}>
          <div className={styles.label}>이메일*</div>
          <div className={styles.availabilityContainer}>
            <input type="text" className={styles.availabilityInput} {...register('email')} />
            <div
              className={styles.checkBtn}
              onClick={() => {
                handleDuplicateCheckEmail(getValues('email'));
              }}
            >
              중복확인
            </div>
          </div>
          {errors.email && <p className={styles.errorMessage}>{errors.email?.message}</p>}
          {checkEmail && <p className={styles.successMessage}>사용 가능한 이메일입니다.</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>비밀번호*</div>
          <input type="password" {...register('password')} />
          {errors.password && <p className={styles.errorMessage}>{errors.password?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>비밀번호 확인*</div>
          <input type="password" {...register('checkPassword')} />
          {errors.checkPassword && <p className={styles.errorMessage}>{errors.checkPassword?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>이름*</div>
          <input type="text" {...register('name')} />
          {errors.name && <p className={styles.errorMessage}>{errors.name?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>닉네임*</div>
          <div className={styles.availabilityContainer}>
            <input type="text" className={styles.availabilityInput} {...register('nickname')} />
            <div
              className={styles.checkBtn}
              onClick={() => {
                handleDuplicateCheckNickname(getValues('nickname'));
              }}
            >
              중복확인
            </div>
          </div>
          {errors.nickname && <p className={styles.errorMessage}>{errors.nickname?.message}</p>}
          {checkNickname && <p className={styles.successMessage}>사용 가능한 닉네임입니다.</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>휴대폰*</div>
          <input type="tel" placeholder='"-" 를 제외하고 입력해주세요' {...register('phoneNumber')} />
          {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber?.message}</p>}
        </div>

        <button type="submit" className={styles.joinBtn}>
          회원가입 완료
        </button>
      </form>
    </div>
  );
}

export default JoinPage;
