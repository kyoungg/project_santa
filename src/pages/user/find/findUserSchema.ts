import { object, ref, string } from 'yup';

/* eslint-disable */
export const verifySchema = object({
  email: string()
    .required('이메일은 필수 입력값입니다.')
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      '이메일 형식을 확인해 주세요.',
    ),
  authNumber: string().required('인증 코드를 입력 해 주세요.'),
});

export const passwordSchema = object({
  newPassword: string()
    .required('비밀번호는 필수 입력값입니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
      '알파벳, 숫자, 특수문자를 포함하여 8자리 이상 입력해주세요',
    ),
  checkPassword: string()
    .required('비밀번호를 한번 더 입력해 주세요.')
    .oneOf([ref('newPassword'), ''], '비밀번호가 일치하지 않습니다.'),
});
/* eslint-enable */
