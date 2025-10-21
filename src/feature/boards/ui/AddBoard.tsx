import type { BoardFormType } from '@/schemas';

import { RESPONSE_CODE } from '@/constants';
import { useAddBoardMutation } from '@/feature/boards/api';
import { BoardForm } from '@/feature/boards/ui';

import classes from './Board.module.css';

type Props = {
  handleModal?: (isOpen: boolean) => void;
};

export const AddBoard = ({ handleModal }: Props) => {
  const [addColumn, { isLoading }] = useAddBoardMutation();

  const handleSubmit = async (data: BoardFormType) => {
    const res = await addColumn(data).unwrap();
    if (res.resultCode === RESPONSE_CODE.success) {
      handleModal?.(false);
    }
  };

  return (
    <div className={classes.wrapperAddTitle}>
      <h2>Add new board</h2>
      <BoardForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};
