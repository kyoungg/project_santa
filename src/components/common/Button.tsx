import { PropsWithChildren } from 'react';
import styles from '../../styles/components/common/button.module.scss';

type Props = {
  variant: 'green1' | 'green3' | 'gray' | 'yellow' | 'rounded-outline' | 'rounded-color';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ variant, onClick, children }: PropsWithChildren<Props>) => {
  return (
    <div className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </div>
  );
};
