import { PropsWithChildren } from 'react';
import '../../styles/components/common/_button.scss';
type Props = {
    variant?: 'green1' | 'green3' | 'gray' | 'yellow' | 'rounded-outline' | 'rounded-color';
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({ variant, onClick, children }: PropsWithChildren<Props>) => {
    const buttonClass = variant ? `button ${variant}` : `button`;
    return (
        <div className={buttonClass} onClick={onClick} >{children}</div>
    )
}
