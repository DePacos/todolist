import { Check, X } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button, Modal } from '@/components';

import classes from './ModalConfirmation.module.css';

type Props = {
  title: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
};

export const ModalConfirmation = ({ title, isOpen, setIsOpen, onConfirm }: Props) => {
  const handelClose = () => {
    setIsOpen(false);
  };

  const handleConfirmation = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={classes.wrapper}>
        {title}
        <div className={classes.wrapperModalBtn}>
          <Button onClick={handleConfirmation}>
            <Check size="24" color="green" /> Ok
          </Button>
          <Button onClick={handelClose}>
            <X size="24" color="red" />
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
