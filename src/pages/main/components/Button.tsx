import { ButtonHTMLAttributes, ReactNode } from 'react';
import '../../../styles/components/common/_button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green1' | 'green3' | 'gray' | 'yellow' | 'rounded-outline' | 'rounded-color';
  children?: ReactNode;
  size: 'sm' | 'xl' | 'lg' | 'xxl';
  disabled: boolean;
  selected: boolean;
}

export const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
};
