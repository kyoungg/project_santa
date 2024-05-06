import styles from '../../styles/gathering/gatheringSearch.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGatheringSearchResult } from '/src/services/gatheringApi';
import { SearchList } from './components/SearchList';
import { SearchNoResult } from './components/SearchNoResults';
import { TitleContainer } from './components/TitleContainer';
export function GatheringSearchResultPage() {
    const [searchParams] = useSearchParams();
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [isNoResult, setIsNoResult] = useState(false)
    useEffect(() => {
        const keyword = searchParams.get('keyword');
        if (keyword) {
            setSearchKeyword(keyword);
        } else {
            setSearchKeyword('none');
        }
    }, [searchParams])

    const { data: gatheringList, isSuccess, isError } = useQuery({
        queryKey: ['getSearchList', searchKeyword],
        queryFn: () => {
            return getGatheringSearchResult(searchKeyword);
        },
        select: (data) => data?.data.content,
    });

    useEffect(() => {
        if (isSuccess) {
            console.log('search data ', gatheringList);
            if (gatheringList.length === 0 ||
                !gatheringList) {
                setIsNoResult(true);
            } else {
                setIsNoResult(false);
            }
        } else if (isError) {
            console.log('error');
        }
        console.log('list:', gatheringList)

    }, [gatheringList])
    useEffect(() => {
        console.log('isNoresult', isNoResult);
    }, [isNoResult])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.containerRow}>
                <TitleContainer title={`${searchKeyword} 검색 결과`} />
            </div>
            {gatheringList && <SearchList gatheringData={gatheringList} />}
            {isNoResult && <SearchNoResult keyword={searchKeyword} />}



        </div>
    )
}