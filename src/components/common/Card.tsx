import { PropsWithChildren } from 'react';
import styles from '../../styles/components/common/card.module.scss';

type Props = {
  variant: 'green1' | 'green2' | 'green3' | 'yellow';
};

export const Card = ({ variant, children }: PropsWithChildren<Props>) => {
  return <div className={`${styles.card} ${styles[variant]}`}>{children}</div>;
};
