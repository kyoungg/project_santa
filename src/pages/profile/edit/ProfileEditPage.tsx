import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { EditData, patchUserInfo } from '/src/services/userApi';
import styles from './ProfileEditPage.module.scss';
import { Button } from '/src/components/common/Button';
import { profileEditSchema } from './profileEditSchema';
import useUserInfo from '/src/hooks/useUserInfo';
import { paths } from '/src/utils/path';
import { useNavigate } from 'react-router-dom';
import { getIsUser } from '/src/services/auth';

export default function ProfileEditPage() {
  const [imgPreview, setImgPreview] = useState('');
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditData>({
    resolver: yupResolver(profileEditSchema),
    mode: 'onChange',
  });

  const userInfo = useUserInfo();

  const isUser = getIsUser();

  useEffect(() => {
    if (userInfo?.name) setValue('name', userInfo.name);
    if (userInfo?.nickname) setValue('nickname', userInfo.nickname);
    if (userInfo?.phoneNumber) setValue('phoneNumber', userInfo.phoneNumber);
    if (userInfo?.image) setValue('image', userInfo.image);
  }, [userInfo]);

  const { mutate } = useMutation<Response, Error, FormData>({
    //@ts-expect-error 김경혜...11
    mutationFn: patchUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      navigation(paths.PROFILE);
    },
    onError: () => {
      alert('다시 시도 해 주세요.');
    },
  });

  //유저가 새로 등록한 이미지 파일
  const newImg = watch('imageFile');
  useEffect(() => {
    if (newImg && newImg.length > 0) {
      const file = newImg[0];
      //@ts-expect-error 김경혜...222
      const imgUrl = URL.createObjectURL(file);
      // setValue('image', imgUrl);
      setImgPreview(imgUrl);
    }
  }, [newImg]);

  // 데이터를 formData로 변환해주는 함수
  function createFormData(editData: EditData) {
    const form = new FormData();

    form.append('image', editData.image);
    form.append('nickname', editData.nickname);
    form.append('name', editData.name);
    form.append('phoneNumber', editData.phoneNumber);
    if (newImg && newImg[0] !== undefined) {
      form.append('imageFile', newImg[0]);
    }

    return form;
  }

  const onSubmit = (editData: EditData) => {
    console.log(editData);
    const formData = createFormData(editData);
    mutate(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>{isUser ? '프로필 수정' : '프로필 정보 추가'}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.userInfo}>
          <img className={styles.userImg} src={imgPreview !== '' ? imgPreview : userInfo?.image} />
          <div className={styles.label}>
            <label className={styles.inputImgLabel}>
              이미지 변경
              <input
                type="file"
                accept="image/*"
                placeholder="이미지"
                {...register('imageFile')}
                className={styles.inputFile}
              />
            </label>
          </div>
        </div>
        <div className={styles.defaultContainer}>
          <div className={styles.label}>이메일</div>
          <div className={styles.defaultinput}>{userInfo?.email}</div>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.label}>이름</div>
          <input type="text" {...register('name')} />
          {errors.name && <p className={styles.errorMessage}>{errors.name?.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.label}>닉네임</div>
          <input type="text" {...register('nickname')} />
          {errors.nickname && <p className={styles.errorMessage}>{errors.nickname?.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.label}>핸드폰 번호</div>
          <input type="text" {...register('phoneNumber')} />
          {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber?.message}</p>}
        </div>
        <div className={styles.submitBtn}>
          <Button variant="green3" children={'수정 완료'} />
        </div>
      </form>
    </div>
  );
}
