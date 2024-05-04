import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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

//loader 적용시
export interface ErrorType extends Error {
  code?: number;
}

export const rejectIntercepter = (_error: ErrorType) => {
  return null;
};
