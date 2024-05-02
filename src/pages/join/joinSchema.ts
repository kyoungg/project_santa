import { object, ref, string } from 'yup';

/* eslint-disable */
export const joinSchema = object({
  email: string()
    .required('이메일은 필수 입력값입니다.')
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      '이메일 형식을 확인해 주세요.',
    ),
  password: string()
    .required('비밀번호는 필수 입력값입니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
      '알파벳, 숫자, 특수문자를 포함하여 8자리 이상 입력해주세요',
    ),
  checkPassword: string()
    .required('비밀번호를 한번 더 입력해 주세요.')
    .oneOf([ref('password'), ''], '비밀번호가 일치하지 않습니다.'),
  name: string().required('이름은 필수 입력값입니다.'),
  nickname: string().required('닉네임은 필수 입력값입니다.'),
  phoneNumber: string()
    .required('핸드폰 번호는 필수 입력값입니다.')
    .matches(/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/, '올바른 휴대폰 번호를 입력해 주세요.'),
});
/* eslint-enable */
