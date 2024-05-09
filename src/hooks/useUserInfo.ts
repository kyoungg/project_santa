import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../services/userApi';
import { getIsAdmin } from '../services/auth';

const useUserInfo = () => {
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: Infinity,
  });

  const isAdmin = getIsAdmin();

  if (data && !isAdmin) {
    if (data && data.name === null && data.nickname === null && data.phoneNumber === null) {
      localStorage.setItem('role', 'GUEST');
    } else {
      localStorage.setItem('role', 'USER');
    }
  }

  return data;
};

// const useUserInfo = <T>(select: (data: UserInfo) => T = (data) => data as UserInfo as T) => {
//   const { data } = useQuery({
//     queryKey: ['userInfo'],
//     queryFn: getUserInfo,
//     staleTime: Infinity,
//     select,
//   });

//   return data;
// };

export default useUserInfo;
