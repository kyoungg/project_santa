import { api } from './api';
export interface LoginData {
  email: string;
  password: string;
}

export interface Nickname {
  nickname: string;
}
export interface Email {
  email: string;
}

export interface VertifyData {
  email: string;
  authNumber?: string;
}

export interface ResetPasswordData {
  email: string;
  authNumber: string;
}

export interface JoinData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phoneNumber: string;
}

export interface LoginResponse {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

interface UserInfo {
  email: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  image: string;
}

export const postUserLogin = async (loginData: LoginData) => {
  const response = await api.post<LoginResponse>('users/sign-in', loginData);
  return response.data;
};

export const getUserInfo = async () => {
  return await api.get<UserInfo>('users/my-info');
};

//중복확인 api
export const postDuplicateEmail = async (email: Email) => {
  const response = await api.post<boolean>('users/duplicate/email', email);
  return response.data;
};

export const postDuplicateNickname = async (nickname: Nickname) => {
  const response = await api.post<boolean>('users/duplicate/nickname', nickname);
  return response.data;
};

//회원가입 api
export const postJoin = async (joinData: JoinData) => {
  const response = await api.post('users/signup', joinData);
  return response.data;
};

//이메일 전송 api
export const postEmail = async (email: Email) => {
  const response = await api.post('users/send-email', email);
  return response.data;
};

//이메일 인증 api
export const postVertifyEmail = async (vertifyData: VertifyData) => {
  const response = await api.post('users/verify-email', vertifyData);
  return response.data;
};

//비밀번호 리셋 api
export const postResetPassword = async (resetPasswordData: ResetPasswordData) => {
  const response = await api.post('users/reset-passwords', resetPasswordData);
  return response.data;
};
