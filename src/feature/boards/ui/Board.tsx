import { SquarePen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { GetBoardsResponse } from '@/types';

import { Button, ModalConfirmation } from '@/components';
import { ROUTES } from '@/constants';
import { useBoard, EditBoardTitle } from '@/feature/boards';

import classes from './Board.module.css';

type Props = {
  board: GetBoardsResponse;
};

export const Board = ({ board }: Props) => {
  const {
    isEditMode,
    handleEditMode,
    handleDeleteBoard,
    isOpenModal,
    handleOpenModal,
    handleStopPropagation,
  } = useBoard();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: board.id,
    data: { type: 'board', board },
    disabled: isEditMode,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      data-dragging-board={isDragging && !isEditMode && 'dragging'}
      className={classes.wrapperBoard}
    >
      {isEditMode ? (
        <EditBoardTitle board={board} handleEditMode={handleEditMode} />
      ) : (
        <Link to={ROUTES.BOARD + board.id} className={classes.wrapperTitleLink}>
          <h2>{board?.title}</h2>
          <div>
            <Button
              onClick={(e) => {
                handleStopPropagation(e);
                handleEditMode(true);
              }}
            >
              <SquarePen size="20" color="green" />
            </Button>
            <Button
              onClick={(e) => {
                handleStopPropagation(e);
                handleOpenModal(true);
              }}
            >
              <Trash2 size="20" color="red" />
            </Button>
          </div>
        </Link>
      )}

      {isOpenModal && (
        <ModalConfirmation
          title={
            <h3 className="modalConfirmation">
              Removing the <span> {board.title}</span> board will delete all tasks. <br />
              Do you want to continue?
            </h3>
          }
          isOpen={isOpenModal}
          setIsOpen={handleOpenModal}
          onConfirm={() => handleDeleteBoard(board.id)}
        />
      )}
    </div>
  );
};
