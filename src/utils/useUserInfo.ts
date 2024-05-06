import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../services/userApi';

// type UserInfo = {
//     email: string;
//     nickname: string;
//     name: string;
//     phoneNumber: string;
//     image: string;

// }
export const useUserInfo = <T,>(select: (data: any) => T = (data) => data) => {
    const { data } = useQuery({
        queryKey: ['userInfo'],
        queryFn: getUserInfo,
        staleTime: Infinity,
        select: select,
    })

    return data;
}
