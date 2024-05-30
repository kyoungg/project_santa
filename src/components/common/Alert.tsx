import { IoCloseOutline } from 'react-icons/io5';
import { RiErrorWarningLine } from 'react-icons/ri';
import { RiInformationLine } from 'react-icons/ri';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import alert from '../../styles/components/common/alert.module.scss';
import { PropsWithChildren, useEffect } from 'react';
type Props = {
  variant: 'error' | 'info' | 'success';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export function Alert({ variant, children, isOpen, setIsOpen }: PropsWithChildren<Props>) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, setIsOpen]);

  if (!isOpen) {
    return null;
  }
  return (
    <div className={`${alert.container} ${alert[variant]}`}>
      <div className={alert.icon}>
        {variant === 'error' && <RiErrorWarningLine size={'100%'} />}
        {variant === 'info' && <RiInformationLine size={'100%'} />}
        {variant === 'success' && <RiCheckboxCircleLine size={'100%'} />}
      </div>
      <div className={alert.text}>{children}</div>
      <div className={alert.close} onClick={() => setIsOpen(false)}>
        <IoCloseOutline size={'100%'} />
      </div>
    </div>
  );
}
