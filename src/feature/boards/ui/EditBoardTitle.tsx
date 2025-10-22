import { X } from 'lucide-react';

import type { BoardFormType } from '@/schemas';
import type { GetBoardsResponse } from '@/types';

import { RESPONSE_CODE } from '@/constants';
import { useUpdateBoardMutation } from '@/feature/boards/api';
import { BoardForm } from '@/feature/boards/ui';

import classes from './Board.module.css';

type Props = {
  board: GetBoardsResponse;
  handleEditMode: (isEdit: boolean) => void;
};

export const EditBoardTitle = ({ board, handleEditMode }: Props) => {
  const [updateBoard, { isLoading }] = useUpdateBoardMutation();

  const handleSubmit = async (data: BoardFormType) => {
    const res = await updateBoard({ ...data, id: board.id }).unwrap();
    if (res.resultCode === RESPONSE_CODE.success) {
      handleEditMode(false);
    }
  };

  const exitEditMode = () => {
    handleEditMode(false);
  };

  return (
    <div className={classes.wrapperBoardEditTitle}>
      <h2>Edit title</h2>
      <div className={classes.wrapperInput}>
        <button onClick={exitEditMode}>
          <X size="24" color="red" />
        </button>
        <BoardForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          defaultValue={board.title}
          isEditMode
        />
      </div>
    </div>
  );
};
