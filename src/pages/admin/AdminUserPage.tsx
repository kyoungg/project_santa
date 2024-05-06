import { ListComponent } from './components/ListComponent';
import styles from '../../styles/admin/adminMain.module.scss';
import { TitleContainer } from '../gathering/components/TitleContainer';
import { SearchInput } from '/src/components/common/Input';
import SectionTitle from '/src/components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { userSearchApi } from '/src/services/adminApi';
import { ChangeEvent, useEffect, useState } from 'react';
const PAGE_SIZE = 4;

export function AdminUserPage() {
    const [page, setPage] = useState(0);
    const [userDataList, setUserDataList] = useState<UserListType[]>([])
    const [searchValue, setSearchValue] = useState<string>();
    const [inputValue, setInputValue] = useState<string>('');
    type UserListType = {
        email: string;
        id: number;
        name: string;
        nickname: string;
        reportCount: number;
    }
    const { data: userData, isFetched,
        isError, } = useQuery({
            queryKey: ['userSearch', searchValue, page],
            queryFn: () => userSearchApi(searchValue, page, PAGE_SIZE),
            select: (data) => {
                return {
                    content: data.data.content,
                    totalPage: data.data.totalPages,
                }
            }

        })

    useEffect(() => {
        console.log(userData)
        console.log(userData?.content);
        console.log(userData?.totalPage);
    }, [userDataList])

    useEffect(() => {
        const isSuccess = isFetched && !isError;

        if (isSuccess && userData !== undefined) {
            console.log(userData)
            console.log(userData?.content);
            console.log(userData?.totalPage);
            // if (searchValue) {
            //     setUserDataList([...userData?.content]);
            // } else {
            setUserDataList(prevList => [...prevList, ...userData?.content]);

            // }

        }

    }, [isFetched, isError, userData, searchValue]);



    // function handleDeleteBtnClick(id: number) {
    //     //id를 받아서 삭제

    // }
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }
    function handleSearchBtnClick() {
        setSearchValue(inputValue);
        //기존 userData 배열 초기화 
        setUserDataList([]);
        setPage(0)
    }
    return (
        <div className={styles.adminPageContainer}>
            <TitleContainer title='회원관리' />
            <div className={styles.searchContainer}>
                <SectionTitle title='회원정보 및 검색 조회' subtitle='이름 또는 닉네임으로 회원을 검색합니다' />
                <SearchInput onClick={handleSearchBtnClick} placeholder='회원 이름 또는 닉네임을 검색하세요' onChange={handleInputChange} value={inputValue} />
            </div>
            {userDataList && userDataList.map((userList: UserListType, index: number) => (
                <ListComponent key={index} title={userList.name} subtitle={userList.email} report={userList.reportCount} isLast={
                    userData &&
                    userData?.totalPage >= page &&
                    userDataList.length === index + 1
                }
                    setPage={setPage} />
            ))}

        </div>
    )
}
/**
 * 
 */