import { object, string } from 'yup';

/* eslint-disable */
export const profileEditSchema = object({
  nickname: string().required('닉네임은 필수 입력값입니다.'),
  phoneNumber: string()
    .required('핸드폰 번호는 필수 입력값입니다.')
    .matches(/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/, '올바른 휴대폰 번호를 입력해 주세요.'),
  image: string().required('이미지를 첨부해주세요'),
  imageFile: string().required('이미지 파일을 첨부해주세요.'),
});
/* eslint-enable */
