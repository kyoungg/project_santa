import { object, string } from 'yup';

/* eslint-disable */
export const loginSchema = object({
  email: string()
    .required('아이디를 입력해 주세요.')
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      '아이디는 이메일 형식이어야 합니다.',
    ),
  password: string().required('비밀번호를 입력해 주세요.'),
});
/* eslint-enable */
