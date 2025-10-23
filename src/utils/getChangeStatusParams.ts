import type { DragOverEvent } from '@dnd-kit/core';

import type { TaskId, TaskItem, TaskPriority } from '@/types';

export const getChangeStatusParams = (
  event: DragOverEvent,
): (Omit<TaskItem, 'completed' | 'startDate' | 'order'> & TaskId) | undefined => {
  const { active, over } = event;

  const activeColumnId = (active.data?.current?.columnId ?? null) as number | null;
  const overColumnId = (over?.data?.current?.columnId ?? null) as number | null;
  const activeTaskId = active.id as string;

  if (!over || overColumnId === null || activeColumnId === overColumnId) return;

  const title = event.active.data.current?.task.title as string;
  const description = event.active.data.current?.task.description as string;
  const priority = event.active.data.current?.task.priority as TaskPriority;
  const deadline = event.active.data.current?.task.deadline as string;

  return {
    id: activeTaskId,
    title,
    description,
    status: overColumnId,
    priority,
    deadline,
  };
};
