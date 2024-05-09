import axios from 'axios';
import logout from '../utils/logout';
import { getVaildTime } from './auth';
// import { AxiosInstance } from 'axios';
// import logout from '../utils/logout';

const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  return accessToken;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const accessToken = getAccessToken();

  //토큰이 있으면
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     const originalRequest = config;
//     //리프레쉬 만료시 로그아웃
//     if(status === 401){
//       logout();
//     } else if (status === 403) {
//       //토큰 재발급
//       const newAccessToken = await tokenRefresh(api)
//       //헤더 다시 설정
//       error.config.headers.Authorization = `Bearer ${newAccessToken}`;
//       localStorage.removeItem('access_token')
//       localStorage.setItem('access_token',newAccessToken)
//       //중단된 요청은 토큰 갱신 후 재요청
//       return await api(originalRequest);
//     }
//     return Promise.reject(error);
//   },
// );

//토큰 다시 받아오는 함수
export const tokenRefresh = async () => {
  //리프레쉬 토큰 가져옴
  const currentTime = new Date();
  const vaildTime = localStorage.getItem('vaild_time');

  if (vaildTime) {
    const isEnd = `${currentTime}` >= vaildTime;
    //만료 시간이 끝났으면
    if (isEnd) return logout();

    //안끝났으면
    if (!isEnd) {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await api.post('users/new-access-token', {
        refreshToken: refreshToken,
      });

      const newAccessToken = response.data;

      //새 엑세스 토큰을 받아왔으면
      if (newAccessToken) {
        //기존에 있던 토큰 삭제
        localStorage.removeItem('access_token');
        localStorage.removeItem('vaild_time');
        //새 엑세스 토큰 로컬에 넣음
        localStorage.setItem('access_token', newAccessToken);
        getVaildTime();
        //엑세스 토큰 못받아왔으면
      } else {
        //로그아웃
        return logout();
      }
    }
  }
};

//interceptor 분리시 -> 로그인, 새로고침 해야 헤더에 토큰 적용되는 에러 발생함
