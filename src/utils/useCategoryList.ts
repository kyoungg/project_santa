import { useQuery } from '@tanstack/react-query';
import { getAllCategory } from '../services/categoryApi';

export const useCategoryList = <T,>(select: (data: any) => T = (data) => data) => {
    const { data } = useQuery({
        queryKey: ['category'],
        queryFn: getAllCategory,
        staleTime: Infinity,
        select: select,
    })

    return data;
}