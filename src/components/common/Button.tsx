import { PropsWithChildren } from 'react';
import '../../styles/components/common/_button.scss';
type Props = {
  variant?: 'green1' | 'green3' | 'gray' | 'yellow' | 'rounded-outline' | 'rounded-color';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ variant, onClick, children }: PropsWithChildren<Props>) => {
  return (
    <div className={`button ${variant}`} onClick={onClick}>
      {children}
    </div>
  );
};
