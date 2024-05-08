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
  email: string | null;
  newPassword: string;
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
  role: string;
}

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  image: string;
  accumulatedHeight: number;
}

export interface EditData {
  nickname: string;
  phoneNumber: string;
  image: string;
  imageFile?: string;
  name: string;
}

export interface UserRank {
  id: number;
  rank: number;
  nickname: string;
  image: string;
  score: number;
}

export interface KakaoCode {
  authorizationCode: string;
}

export interface kakaoLoginData {
  accessToken: string;
  grantType: string;
  refreshToken: string;
}

export const postKakaoCode = async (code: KakaoCode) => {
  const response = await api.post<kakaoLoginData>('oauth2/kakao', code);
  return response;
};

export const postUserLogin = async (loginData: LoginData) => {
  const response = await api.post<LoginResponse>('users/sign-in', loginData);
  return response.data;
};

export const getUserInfo = async () => {
  const result = await api.get<UserInfo>('users/my-info');
  return result.data;
};

export const patchUserInfo = async (editData: FormData) => {
  await api.patch('users/my-info', editData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const postDuplicateEmail = async (email: Email) => {
  const response = await api.post<boolean>('users/duplicate/email', email);
  return response.data;
};

export const postDuplicateNickname = async (nickname: Nickname) => {
  const response = await api.post<boolean>('users/duplicate/nickname', nickname);
  return response.data;
};

export const postJoin = async (joinData: JoinData) => {
  const response = await api.post('users/signup', joinData);
  return response.data;
};

export const postEmail = async (email: Email) => {
  const response = await api.post('users/send-email', email);
  return response.data;
};

export const postVertifyEmail = async (vertifyData: VertifyData) => {
  const response = await api.post('users/verify-email', vertifyData);
  return response.data;
};

export const postResetPassword = async (resetPasswordData: ResetPasswordData) => {
  const response = await api.post('users/reset-passwords', resetPasswordData);
  return response.data;
};

export const getUserRank = async () => {
  const response = await api.get<UserRank>('users/ranking');
  return response.data;
};

export const deleteUser = () => {
  return api.delete('users');
};

//소셜 로그인 Api
