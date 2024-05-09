import { object, ref, string } from 'yup';

import { emailRegex, passwordRegex, phoneRegex } from '/src/utils/inputRegex';

export const joinSchema = object({
  email: string().required('이메일은 필수 입력값입니다.').matches(emailRegex, '이메일 형식을 확인해 주세요.'),
  password: string()
    .required('비밀번호는 필수 입력값입니다.')
    .matches(passwordRegex, '알파벳, 숫자, 특수문자를 포함하여 8자리 이상 입력해주세요'),
  checkPassword: string()
    .required('비밀번호를 한번 더 입력해 주세요.')
    .oneOf([ref('password'), ''], '비밀번호가 일치하지 않습니다.'),
  name: string().required('이름은 필수 입력값입니다.'),
  nickname: string()
    .min(2, '닉네임은 최소 2글자 이상이어야 합니다.')
    .max(8, '닉네임은 최대 8자까지 입력 가능합니다.')
    .required('닉네임은 필수 입력값입니다.'),
  phoneNumber: string()
    .required('핸드폰 번호는 필수 입력값입니다.')
    .matches(phoneRegex, '올바른 휴대폰 번호를 입력해 주세요.'),
});
