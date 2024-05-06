import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import styles from './FindPasswordPage.module.scss';
import { Button } from '/src/components/common/Button';
import { passwordSchema } from './findUserSchema';
import { ResetPasswordData, postResetPassword } from '/src/services/userApi';
import { paths } from '/src/utils/path';

export default function FindPasswordPage() {
  const navigation = useNavigate();
  const email = sessionStorage.getItem('email');

  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });

  const { mutate: resetPassword } = useMutation<boolean, Error, ResetPasswordData>({
    mutationKey: ['resetPassword'],
    mutationFn: (data) => postResetPassword(data),
    onSuccess: () => {
      sessionStorage.removeItem('email');
      alert('비밀번호가 변경되었습니다.');
      navigation(paths.LOGIN);
    },
    onError(error) {
      console.error(error);
      resetField;
      setError('checkPassword', {
        message: '다시 시도해 주세요.',
      });
    },
  });

  const onSubmit = ({ newPassword }: { newPassword: string }) => {
    const resetPasswordData = {
      email: email,
      newPassword: newPassword,
    };
    resetPassword(resetPasswordData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>NEW PASSWORD</div>
        <div className={styles.description}>
          <p>새로운 비밀번호를 입력해 주세요</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.inputContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <div className={styles.label}>비밀번호</div>
            <div className={styles.availabilityContainer}>
              <input type="password" className={styles.availabilityInput} {...register('newPassword')} />
            </div>
            {errors.newPassword && <p className={styles.errorMessage}>{errors.newPassword?.message}</p>}
            <div className={styles.label}>비밀번호 확인</div>
            <div className={styles.availabilityContainer}>
              <input type="password" className={styles.availabilityInput} {...register('checkPassword')} />
            </div>
            {errors.checkPassword && <p className={styles.errorMessage}>{errors.checkPassword?.message}</p>}
            <div className={styles.submitBtn}>
              <Button variant="green3" children={'비밀번호 변경'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
