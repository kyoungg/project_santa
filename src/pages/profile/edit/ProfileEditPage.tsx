import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { EditData, getUserInfo, patchUserInfo } from '/src/services/userApi';
import styles from './ProfileEditPage.module.scss';
import { Button } from '/src/components/common/Button';
import { profileEditSchema } from './profileEditSchema';

export default function ProfileEditPage() {
  //const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileEditSchema),
    mode: 'onChange',
  });

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (data) => data.data,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation<Response, Error, EditData>({
    mutationKey: ['duplicateNickName'],
    mutationFn: (editData) => patchUserInfo(editData),
    onSuccess: () => {
      //queryClient.invalidateQueries(['userInfo']);
    },
  });

  const onSubmit = (editData: EditData) => {
    console.log(editData);
    mutate(editData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>프로필 수정</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.userInfo}>
          <img className={styles.userImg} src={userInfo?.image} />
          <div className={styles.label}>
            <input type="file" accept="image/*" placeholder="이미지" {...register('imageFile')} />
          </div>
        </div>
        <div className={styles.defaultContainer}>
          <div className={styles.label}>이름</div>
          <div className={styles.defaultinput}>{userInfo?.name}</div>
          <div className={styles.label}>이메일</div>
          <div className={styles.defaultinput}>{userInfo?.email}</div>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.label} {...register('nickname')}>
            닉네임
          </div>
          <input type="text" />
          {errors.nickname && <p className={styles.errorMessage}>{errors.nickname?.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.label} {...register('phoneNumber')}>
            핸드폰 번호
          </div>
          <input type="text" />
          {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber?.message}</p>}
        </div>
        <div className={styles.submitBtn}>
          <Button variant="green3" children={'수정 완료'} />
        </div>
      </form>
    </div>
  );
}
