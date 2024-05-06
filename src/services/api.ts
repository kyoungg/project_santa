import axios from 'axios';

const getAccessToken = () => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const accessToken = localStorage.getItem('access_token');
  return accessToken;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = getAccessToken();

  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

//interceptor 분리시 -> 로그인, 새로고침 해야 헤더에 토큰 적용되는 에러 발생함
