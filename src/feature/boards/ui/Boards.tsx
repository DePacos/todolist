import { CopyPlus } from 'lucide-react';
import { createPortal } from 'react-dom';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { Button, Modal } from '@/components';
import { useBoards } from '@/feature/boards/model';
import { AddBoard, Board } from '@/feature/boards/ui';

import classes from './Boards.module.css';

export const Boards = () => {
  const {
    boards,
    boardIds,
    activeBoard,
    sensors,
    isOpenAddBoard,
    handleDragStartBoard,
    handleDragEndBoard,
    handleModalAddBoard,
  } = useBoards();

  return boards ? (
    <DndContext sensors={sensors} onDragStart={handleDragStartBoard} onDragEnd={handleDragEndBoard}>
      <div className={classes.wrapper}>
        <Button variant="primary" onClick={() => handleModalAddBoard(true)}>
          Add board <CopyPlus size={20} color="var(--title-color)" />
        </Button>
        <div className={classes.wrapperBoards}>
          {boards.map((board) => (
            <div key={board.id}>
              <SortableContext items={boardIds}>
                <Board board={board} />
              </SortableContext>
            </div>
          ))}
        </div>
      </div>
      {createPortal(
        <DragOverlay>{activeBoard && <Board board={activeBoard} />}</DragOverlay>,
        document.body,
      )}
      {isOpenAddBoard && (
        <Modal isOpen={isOpenAddBoard} setIsOpen={handleModalAddBoard}>
          <AddBoard handleModal={handleModalAddBoard} />
        </Modal>
      )}
    </DndContext>
  ) : (
    <div>No boards</div>
  );
};
