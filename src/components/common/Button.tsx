import { PropsWithChildren } from 'react';
import styles from '../../styles/components/common/button.module.scss';

type Props = {
  variant: 'green1' | 'green3' | 'gray' | 'yellow' | 'rounded-outline' | 'rounded-color';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined
};
interface DeleteBtnProps {
  onClick: () => void;
}

export const Button = ({ variant, onClick, children, type }: PropsWithChildren<Props>) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};


export const DeleteBtn: React.FC<DeleteBtnProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.deleteBtn}>
      삭제
    </div>
  );
};

export const EditBtn: React.FC<DeleteBtnProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.editBtn}>
      수정
    </div>
  )
}