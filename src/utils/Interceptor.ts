import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem('refresh_token');
  return refreshToken;
};

export const requestIntercepter = (config: InternalAxiosRequestConfig<unknown>) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  config.headers['Content-Type'] = 'application/json';

  return config;
};

export const responseIntercepter = (response: AxiosResponse) => {
  return response;
};

export interface ErrorType extends Error {
  code?: number;
}

export const rejectIntercepter = (_error: ErrorType) => {
  return null;
};
