import { object, string } from 'yup';
import { phoneRegex } from '/src/utils/inputRegex';

export const profileEditSchema = object({
  nickname: string()
    .min(2, '닉네임은 최소 2글자 이상이어야 합니다.')
    .max(8, '닉네임은 최대 8자까지 입력 가능합니다.')
    .required('닉네임은 필수 입력값입니다.'),
  phoneNumber: string()
    .required('핸드폰 번호는 필수 입력값입니다.')
    .matches(phoneRegex, '올바른 휴대폰 번호를 입력해 주세요.'),
  image: string().required('이미지를 첨부해주세요'),
  imageFile: string(),
  name: string().required('이름은 필수 입력값입니다.'),
});
