import { api } from './api';

type UserListType = {
    email: string;
    id: number;
    name: string;
    nickname: string;
    reportCount: number;
}
interface userListResponse {
    content: UserListType[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}
export function userSearchApi(searchValue?: string, page?: number, size?: number) {
    return api.get<userListResponse>(`users?search=${searchValue}&size=${size}&page=${page}`)
}
//?size=${size}&page=${page}