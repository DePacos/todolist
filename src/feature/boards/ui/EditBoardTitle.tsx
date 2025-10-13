import { X } from 'lucide-react';

import type { BoardsResponse, FormColumnData } from '@/types';

import { RESPONSE_CODE } from '@/constants';
import { useUpdateBoardMutation } from '@/feature/boards/api';
import { BoardForm } from '@/feature/boards/ui';

import classes from './Board.module.css';

type Props = {
  board: BoardsResponse;
  handleEditMode: (isEdit: boolean) => void;
};

export const EditBoardTitle = ({ board, handleEditMode }: Props) => {
  const [updateColumn, { isLoading }] = useUpdateBoardMutation();

  const handleSubmit = async (data: FormColumnData) => {
    const res = await updateColumn({ ...data, id: board.id }).unwrap();
    if (res.resultCode === RESPONSE_CODE.success) {
      handleEditMode(false);
    }
  };

  const exitEditMode = () => {
    handleEditMode(false);
  };

  return (
    <div className={classes.wrapperBoardEditTitle}>
      <h2 className={classes.columnTitle}>Edit title</h2>
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
