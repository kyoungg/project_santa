import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface ErrorType extends Error {
  code?: number;
}

export const getUserToken = () => {
  const userToken = localStorage.getItem('access_token');
  return userToken;
};

export const requestIntercepter = (config: InternalAxiosRequestConfig<unknown>) => {
  const userToken = getUserToken();

  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  config.headers['Content-Type'] = 'application/json';

  return config;
};

export const responseIntercepter = (response: AxiosResponse) => {
  return response;
};

export const rejectIntercepter = (_error: ErrorType) => {
  return null;
};
