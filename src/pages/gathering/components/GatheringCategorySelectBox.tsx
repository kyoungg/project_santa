import { ChangeEvent } from 'react';
type GatheringCategorySelectBoxProps = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};
export function GatheringCategorySelectBox({ onChange }: GatheringCategorySelectBoxProps) {
  return (
    <select name="category" id="category" onChange={onChange}>
      <option value="hiking">등산</option>
      <option value="healing">힐링</option>
      <option value="peak">정상깨기</option>
      <option value="photo">출사</option>
      <option value="food">식도락</option>
      <option value="camping">백패킹</option>
      <option value="others">기타</option>
    </select>
  );
}
