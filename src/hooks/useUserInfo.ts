import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../services/userApi';

const useUserInfo = () => {
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: Infinity,
  });

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
