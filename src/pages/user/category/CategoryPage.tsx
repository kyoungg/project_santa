import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCategory, getPreferCategory, postPreferCategory } from '/src/services/categoryApi';
import { useState } from 'react';

import styles from './CategoryPage.module.scss';
import { Button } from '/src/components/common/Button';
import useUserInfo from '/src/hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';
import { paths } from '/src/utils/path';

const ICON = ['⛰️', '❓', '🌿', '🍽️', '👊🏻', '🎒', '📸', '🍁', '🌍'];

export default function CategoryPage() {
  const [selectCategory, setSelectCategory] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const userInfo = useUserInfo();
  const navigation = useNavigate();

  const { data: preferCategory } = useQuery({
    queryKey: ['preferCategory'],
    queryFn: getPreferCategory,
    select: (data) => data.data,
    staleTime: Infinity,
  });

  const isEdit = preferCategory?.length !== 0;

  const { data: allCategoryData } = useQuery({
    queryKey: ['allCategoryData'],
    queryFn: getAllCategory,
    select: (data) => data.data,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: postPreferCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferCategory'] });
      alert('선호 카테고리 등록이 완료되었습니다!');
      if (!isEdit) {
        return navigation(paths.HOME);
      }
      navigation(paths.PROFILE);
    },
    onError: () => {
      alert('다시 시도해주세요.');
    },
  });

  const newCategoryData = allCategoryData?.map((caterory, index) => {
    return { ...caterory, icon: ICON[index] };
  });

  const handleClick = (value: string) => {
    const isSelected = selectCategory.includes(value);

    if (isSelected) {
      const updatedCategories = selectCategory.filter((item) => item !== value);
      setSelectCategory(updatedCategories);
    } else {
      setSelectCategory([...selectCategory, value]);
    }
  };

  const handleSubmit = () => {
    if (selectCategory.length == 0) {
      return alert('선호 카테고리를 선택 해 주세요');
    } else {
      const categoryIds = selectCategory.map(Number);
      const categoryData = {
        categoryIds,
      };
      mutate(categoryData);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>
          {userInfo?.nickname}님, {isEdit ? '안녕하세요🙌' : '환영해요🎉'}
        </h2>
        <p>{isEdit ? '선호하시는 카테고리를 선택해주세요.' : '시작하기 전 선호하시는 카테고리를 선택해주세요.'}</p>
      </div>
      <div className={styles.middle}>
        <div className={styles.categoryContainer}>
          <div className={styles.categoryList}>
            {newCategoryData?.map((category) => (
              <button
                key={category.id}
                value={category.id}
                className={selectCategory.includes(`${category.id}`) ? styles.ClickBtn : styles.categoryBtn}
                style={{ backgroundColor: `${selectCategory.includes(`${category.id}`) ? '#ecf0b2' : 'white'}` }}
                onClick={(e) => {
                  handleClick(e.currentTarget.value);
                }}
              >
                <p className={styles.icon}>{category.icon}</p>
                <p className={styles.name}>#{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button variant="green1" onClick={handleSubmit}>
          {isEdit ? '수정 완료' : '이제 시작 해 볼까요?'}
        </Button>
      </div>
    </div>
  );
}
