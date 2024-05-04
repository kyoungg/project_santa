import styles from '../../styles/components/common/input.module.scss';
import { IoSearch } from 'react-icons/io5';
type Props = {
  variant: 'outline-green3' | 'outline-gray' | 'underline';
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // 수정
  value?: string;
  placeholder?: string;
};

export const Input = ({ variant, onChange, value, placeholder }: Props) => {
  return (
    <input
      className={`${styles.input} ${styles[variant]}`}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    ></input>
  );
};

type searchProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // 수정
  value?: string;
  placeholder?: string;
  onClick: React.MouseEventHandler<SVGElement>;
};
export const SearchInput = ({ onChange, value, placeholder, onClick }: searchProps) => {
  return (
    <div className={styles.searchInputContainer}>
      <input className={styles.searchInput} onChange={onChange} value={value} placeholder={placeholder}></input>
      <IoSearch color="#498428" onClick={onClick} />
    </div>
  );
};
