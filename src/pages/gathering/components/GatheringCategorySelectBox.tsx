import { ChangeEvent } from 'react';
import styles from '../../../styles/gathering/gatheringPostPage.module.scss';

type GatheringCategorySelectBoxProps = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
};
export function GatheringCategorySelectBox({ defaultValue, onChange }: GatheringCategorySelectBoxProps) {
  return (
    <select name="category" id="category" onChange={onChange} defaultValue={defaultValue} className={styles.selectBox}>
      <option value="등산">등산</option>
      <option value="힐링">힐링</option>
      <option value="정상깨기">정상깨기</option>
      <option value="출사">출사</option>
      <option value="식도락">식도락</option>
      <option value="백패킹">백패킹</option>
      <option value="기타">기타</option>
    </select>
  );
}
