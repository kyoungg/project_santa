import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green1' | 'green3' | 'gray' | 'yellow' | 'rounded-outline' | 'rounded-color';
  children?: ReactNode;
  size?: 'sm' | 'xl' | 'lg' | 'xxl';
  disabled?: boolean;
  selected?: boolean;
}

export const Button = ({ variant, disabled, children, ...props }: ButtonProps) => {
  return (
    <button className={`button ${variant}`} {...props} disabled={disabled}>
      {children}
    </button>
  );
};
