import { ChangeEvent } from 'react';
import styles from '../../../styles/gathering/gatheringPostPage.module.scss';
import { useCategoryList } from '/src/utils/useCategoryList';

type GatheringCategorySelectBoxProps = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
};
export function GatheringCategorySelectBox({ defaultValue, onChange }: GatheringCategorySelectBoxProps) {

  const categoryList = useCategoryList((data) => data.data);
  return (
    <select name="category" id="category" onChange={onChange} defaultValue={defaultValue} className={styles.selectBox}>
      {categoryList && categoryList?.map((category: { id: number, name: string }) => (
        <option value={category.name} id={category.id.toString()}>{category.name}</option>
      ))}

    </select>
  );
}
