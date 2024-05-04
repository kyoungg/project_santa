import { api } from './api';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
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
  const response = await api.post<LoginResponse>('/api/users/sign-in', loginData);
  return response.data;
};

export const getUserInfo = async () => {
  return await api.get<UserInfo>('/api/users/my');
};
