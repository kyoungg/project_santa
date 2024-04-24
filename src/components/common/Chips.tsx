import { PropsWithChildren } from 'react';
import '../../styles/_chips.scss';
type Props = {
  // yellow | green1 | green2 | outline-green3 | square
  variant?: 'green1' | 'green2' | 'green3' | 'yellow' | 'outline-green3' | 'square-green2' | 'square-green3';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Chips = ({ variant, onClick, children }: PropsWithChildren<Props>) => {
  const chipClass = variant ? `chip ${variant}` : `chip`;
  return (
    <div className={chipClass} onClick={onClick}>
      {children}
    </div>
  );
};
