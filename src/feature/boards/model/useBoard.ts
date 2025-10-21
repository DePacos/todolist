import { useState, type MouseEvent } from 'react';

import { useDeleteBoardMutation } from '@/feature/boards/api';

export const useBoard = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [deleteBoard] = useDeleteBoardMutation();

  const handleEditMode = (isEditMode: boolean) => {
    setIsEditMode(isEditMode);
  };

  const handleOpenModal = (isOpen: boolean) => {
    setIsOpenModal(isOpen);
  };

  const handleDeleteBoard = (boardId: string) => {
    deleteBoard(boardId);
  };

  const handleStopPropagation = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    isEditMode,
    isOpenModal,
    handleEditMode,
    handleDeleteBoard,
    handleOpenModal,
    handleStopPropagation,
  };
};
