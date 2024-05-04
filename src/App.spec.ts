import { describe, it, expect } from 'vitest';

const testCase = {
  normal: {
    email: 'test@elice.com',
    password: '1q2w3e4r!@',
  },
  error: {
    email: '',
    password: '',
  },
};

export const loginValidation = ({ email, password }: { email: string; password: string }) => {
  const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegex = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*^&+=]).*$/;

  if (!emailRegex.test(email) || passwordRegex.test(password)) {
    //요거에 대한 내용 채우기
    return false;
  }
  //요거에 대한 내용 채우기
  return true;
};
describe('로그인 과정을 검증합니다.', () => {
  it('정상적인 이메일과 비밀번호를 입력하면 로그인에 성공합니다.', () => {
    expect(testCase.normal.email).toBe(true);
  });

  it('이메일과 비밀번호 중 하나라고 입력하지 않으면 로그인에 실패합니다.', () => {
    expect(testCase.error.email).toBe(false);
  });
});

// 무한 스크롤 테스트코드
export const infiniteScroll = ({}: {}) => {};
// import { expect } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import App from './App';

// describe('App', () => {
//   test('renders learn react link', () => {
//     render(<App />);
//     const linkElement = screen.getByTestId(/learn react/i);
//     expect(linkElement).not.toBeInTheDocument();
//   });
// });
