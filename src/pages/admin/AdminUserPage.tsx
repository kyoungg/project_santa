import { ListComponent } from './components/ListComponent';
import styles from '../../styles/admin/adminMain.module.scss';
import { TitleContainer } from '../gathering/components/TitleContainer';
import { SearchInput } from '/src/components/common/Input';
import SectionTitle from '/src/components/SectionTitle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, userSearchApi } from '/src/services/adminApi';
import { ChangeEvent, useEffect, useState } from 'react';
const PAGE_SIZE = 4;

export function AdminUserPage() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [userDataList, setUserDataList] = useState<UserListType[]>([])
    const [searchValue, setSearchValue] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    type UserListType = {
        email: string;
        id: number;
        name: string;
        nickname: string;
        reportCount: number;
    }
    const { data: userData, isSuccess, isFetched, isError } = useQuery({
        queryKey: ['userSearch', searchValue, page],
        queryFn: () => userSearchApi(searchValue, page, PAGE_SIZE),
        select: (data) => {
            return {
                content: data.data.content,
                totalPage: data.data.totalPages - 1,
                totalElements: data.data.totalElements
            }
        }

    })


    useEffect(() => {
        const isSuccess = isFetched && !isError;

        if (isSuccess && userData !== undefined) {
            if (page === 0) {
                setUserDataList([...userData?.content])
            } else {
                setUserDataList(prevList => [...prevList, ...userData?.content]);

            }

        }

    }, [isFetched, isError, userData, searchValue]);

    // useEffect(() => {
    //     if (
    //         isSuccess &&
    //         userData !== undefined &&
    //         userDataList.length < PAGE_SIZE * (page + 1) &&
    //         userDataList.length < userData.totalElements
    //     ) {
    //         setUserDataList((prevList) => {
    //             if (prevList === undefined) {
    //                 return userData.content;
    //             }
    //             return [...prevList, ...userData.content];
    //         });
    //     }
    // }, [isSuccess, userData, searchValue]);
    // useEffect(() => {
    //     if (isSuccess && userData !== undefined) {
    //         setUserDataList(prevList => [...prevList, ...userData.content]);
    //     }
    // }, [isSuccess, userData]);

    const initUserList = () => {
        // console.log('초기화');
        // setUserDataList([]);
        // setPage(0);
        queryClient.invalidateQueries({ queryKey: ['userSearch', searchValue] });
    };

    const { mutate: deleteMutation } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            console.log('삭제완')
            initUserList()
        }
    });
    function handleDeleteBtnClick(id: number) {
        //id를 받아서 삭제
        console.log('삭제');
        setPage(0);
        deleteMutation(id);


    }

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
                <ListComponent key={index} title={`${userList.name}(${userList.nickname})`} subtitle={userList.email} report={userList.reportCount} isLast={
                    userData &&
                    userData?.totalPage >= page &&
                    userDataList.length === index + 1
                }
                    setPage={setPage}
                    onClickDelete={() => handleDeleteBtnClick(userList.id)} />
            ))}
        </div>
    )
}
