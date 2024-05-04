// import { redirect } from 'react-router-dom';
// import { paths } from '../utils/path';

export function getAuthToken() {
  return localStorage.getItem('access_token');
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

// export function tokenLoader() {
//   return getAuthToken();
// }

// export function checkAuthLoader() {
//   const token = getAuthToken();

//   if (!token) {
//     console.log('need to login.');
//     return redirect(paths.LOGIN);
//   }

//   return null;
// }
