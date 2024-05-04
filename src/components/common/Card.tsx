import { PropsWithChildren } from 'react';
import '../../styles/components/common/_card.scss';

type Props = {
  variant?: 'green1' | 'green2' | 'green3' | 'yellow';
};

export const Card = ({ variant, children }: PropsWithChildren<Props>) => {
  const cardClass = variant ? `card ${variant}` : `card`;
  return <div className={cardClass}>{children}</div>;
};
