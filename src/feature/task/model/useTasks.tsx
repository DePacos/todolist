import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import type { TaskItemResponse, TaskStatus } from '@/types';

import { useGetBoardsQuery } from '@/feature/boards/api';
import { useGetTasksQuery, useOrderTaskMutation } from '@/feature/task/api';
import { useUpdateTaskStatusMutation } from '@/feature/task/api/taskApi.ts';
import { getOrderParams } from '@/utils';
import { getChangeStatusParams } from '@/utils/getChangeStatusParams.ts';

export const useTasks = () => {
  const { id: boardId } = useParams();
  const { data: tasks } = useGetTasksQuery({ id: boardId || '' });

  const { data: board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find((board) => board.id === tasks?.items[0]?.todoListId),
    }),
  });

  const [orderTask] = useOrderTaskMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const [activeTaskId, setActiveTaskId] = useState<string>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const getTasksByStatus = (tasks: TaskItemResponse[] | undefined, taskStatus: TaskStatus) => {
    if (!tasks) return [];

    return tasks.filter((task) => task.status === taskStatus);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTaskId(String(active.id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { activeId, putAfterItemId } = getOrderParams(event);
    if (!activeId || !boardId) return;

    orderTask({
      boardId,
      taskId: activeId,
      putAfterItemId,
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const data = getChangeStatusParams(event);
    if (!data || !boardId) return;

    updateTaskStatus({
      id: boardId,
      taskId: data.id,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      deadline: data.deadline,
    });
  };

  const activeTask = tasks?.items.find((task) => task.id === activeTaskId);

  return {
    board,
    tasks,
    activeTask,
    sensors,
    getTasksByStatus,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
