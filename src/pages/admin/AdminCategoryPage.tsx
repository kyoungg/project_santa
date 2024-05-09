import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from '../../styles/admin/adminMain.module.scss';
import { TitleContainer } from '../gathering/components/TitleContainer';
import { ListComponent } from './components/ListComponent';
import SectionTitle from '/src/components/SectionTitle';
// import { SearchInput } from '/src/components/common/Input';
import { addCategory, deleteCategoryList, editCategoryList, getCategoryList } from '/src/services/adminApi';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '/src/components/common/Input';
import { FaPlus } from "react-icons/fa";
import { EditBtn } from '/src/components/common/Button';

type category = {

    id: number,
    name: string,
}
export function AdminCategoryPage() {
    const queryClient = useQueryClient();
    const [editingCategoryId, setEditingCategoryId] = useState(0);
    const [editInput, setEditInput] = useState('');

    const { mutate: deleteMutation } = useMutation({
        mutationFn: deleteCategoryList,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
    function handleDeleteBtnClick(id: number) {
        console.log('삭제');
        deleteMutation(id)
    }

    const { mutate: editMutation } = useMutation({
        mutationFn: editCategoryList,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    })

    const { mutate: addMutation } = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },

    })

    const [inputValue, setInputValue] = useState<string>('');
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoryList,
        select: (data) => data.data

    })

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }
    function handleEditBtnClick(id: number) {
        if (editingCategoryId === id) {
            const newCategoryData = {
                name: editInput,
            }
            editMutation({ categoryId: id, categoryData: newCategoryData });
            setEditingCategoryId(0);
            setEditInput('');
        } else {
            setEditingCategoryId(id);

        }
    }
    function handlePlusBtnClick() {
        const newCategoryData = {
            name: inputValue,
        }
        addMutation(newCategoryData);
        setInputValue('');
    }
    function handleEditInput(e: ChangeEvent<HTMLInputElement>) {
        setEditInput(e.target.value)
    }
    useEffect(() => {
        console.log('카테고리', categories);
    }, [categories])

    return (
        <div className={styles.adminPageContainer}>
            <TitleContainer title='회원관리' />
            <div className={styles.searchContainer}>
                <SectionTitle title='카테고리 신규 생성' subtitle='카테고리 목록을 수정하고 삭제하세요' />
                {/* <SearchInput onClick={handleSearchBtnClick} placeholder='회원 이름 또는 닉네임을 검색하세요' onChange={handleInputChange} value={inputValue} /> */}
                <div className={styles.rowContainer}>
                    <Input variant='outline-green3' onChange={handleInputChange} value={inputValue} />
                    <FaPlus className={styles.plusBtn} onClick={handlePlusBtnClick} />
                </div>
            </div>
            {categories && categories.map((categoryList: category) => (
                editingCategoryId === categoryList.id ? (
                    <div className={styles.listEdit_container}>
                        <div className={styles.listEdit_col}>
                            <Input variant='underline' placeholder='수정 내용을 입력하세요' onChange={handleEditInput} value={editInput} />
                        </div>
                        <div className={styles.listEdit_row}>
                            <EditBtn onClick={() => handleEditBtnClick(categoryList.id)} />
                        </div>
                    </div>
                ) : (
                    <ListComponent key={categoryList.id} title={categoryList.name}
                        onClickDelete={() => handleDeleteBtnClick(categoryList.id)}
                        onClickEdit={() => handleEditBtnClick(categoryList.id)}
                    />
                )
            ))}
        </div>
    )
}