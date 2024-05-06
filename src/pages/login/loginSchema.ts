import { object, string } from 'yup';
import { emailRegex } from '/src/utils/inputRegex';

export const loginSchema = object({
  email: string().required('아이디를 입력해 주세요.').matches(emailRegex, '아이디는 이메일 형식이어야 합니다.'),
  password: string().required('비밀번호를 입력해 주세요.'),
});
