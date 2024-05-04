import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import styles from '/src/styles/join/join.module.scss';
import { paths } from '/src/utils/path';
import { Nickname, postDuplicateEmail, postDuplicateNickname, postJoin } from '/src/services/userApi';
import { JoinData, Email } from '/src/services/userApi';
import { joinSchema } from './joinSchema';

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
  } = useForm({
    resolver: yupResolver(joinSchema),
    mode: 'onChange',
  });

  const { mutate } = useMutation<Response, Error, JoinData>({
    mutationFn: (joinData) => postJoin(joinData),
    onSuccess: () => {
      navigate(paths.LOGIN);
    },
    onError: (error) => {
      console.log('login error', error);
    },
  });

  const { mutate: isDuplicateEmail } = useMutation<boolean, Error, Email>({
    mutationKey: ['duplicateEmail'],
    mutationFn: (data) => postDuplicateEmail(data),
    onSuccess: (data) => {
      if (data) {
        //이메일 중복일 경우
        resetField('email');
        setError('email', {
          message: '이미 등록된 이메일입니다.',
        });
      } else {
        setCheckEmail(true);
      }
    },
  });

  const { mutate: isDuplicateNickName } = useMutation<boolean, Error, Nickname>({
    mutationKey: ['duplicateNickName'],
    mutationFn: (data) => postDuplicateNickname(data),
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

  //이메일 중복 체크
  const handleDuplicateCheckEmail = async (email: string) => {
    //이메일 유효성 검사
    const isVaild = await trigger('email');
    if (!isVaild) {
      return;
    }
    //유효성 통과시 api 호출
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
    // const { checkPassword, ...otherJoinData } = joinData;
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
        <div className={styles.inputContainer}>
          <div className={styles.label}>이메일</div>
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
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>비밀번호</div>
          <input type="password" {...register('password')} />
          {errors.password && <p className={styles.errorMessage}>{errors.password?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>비밀번호 확인</div>
          <input type="password" {...register('checkPassword')} />
          {errors.checkPassword && <p className={styles.errorMessage}>{errors.checkPassword?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>이름</div>
          <input type="text" {...register('name')} />
          {errors.name && <p className={styles.errorMessage}>{errors.name?.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>닉네임</div>
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
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.label}>휴대폰</div>
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
