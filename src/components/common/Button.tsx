import { PropsWithChildren } from 'react';
import styles from '../../styles/components/common/button.module.scss';

type Props = {
  variant: 'green1' | 'green3' | 'gray' | 'yellow' | 'rounded-outline' | 'rounded-color';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?:"button" | "submit" | "reset" | undefined
};

export const Button = ({ variant, onClick, children,type }: PropsWithChildren<Props>) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
