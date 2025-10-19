import { useState } from 'react';

import {
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { useGetBoardsQuery, useOrderBoardsMutation } from '@/feature/boards/api';
import { getOrderParam } from '@/utils';

export const useBoards = () => {
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [isOpenAddBoard, setIsOpenAddBoard] = useState(false);

  const { data: boards } = useGetBoardsQuery();
  const [updateOrderBoards, { isLoading }] = useOrderBoardsMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const boardIds = boards?.map((board) => board.id) || [];
  const activeBoard = boards?.find((column) => column.id === activeBoardId);

  const handleDragStartBoard = (event: DragStartEvent) => {
    const { active } = event;
    setActiveBoardId(String(active.id));
  };

  const handleDragEndBoard = (event: DragEndEvent) => {
    const { activeId, putAfterItemId } = getOrderParam(event);

    if (!activeId && !putAfterItemId) return;

    updateOrderBoards({
      id: activeId,
      putAfterItemId,
    });
  };

  const handleModalAddBoard = (isOpenAddBoard: boolean) => {
    setIsOpenAddBoard(isOpenAddBoard);
  };

  return {
    boards,
    boardIds,
    sensors,
    isOpenAddBoard,
    handleDragStartBoard,
    handleDragEndBoard,
    handleModalAddBoard,
    activeBoard,
    isLoading,
  };
};
