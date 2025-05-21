import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import classes from './modal.module.css';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Modal = ({ children, isOpen = false, setIsOpen }: Props) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return isOpen
    ? createPortal(
        <div onClick={handleOverlayClick} className={classes.overlay}>
          <div className={classes.modal}>
            <button onClick={() => setIsOpen(false)}>
              <X size="30" color="var(--font-color)" />
            </button>
            <div>{children}</div>
          </div>
        </div>,
        document.body,
      )
    : null;
};
