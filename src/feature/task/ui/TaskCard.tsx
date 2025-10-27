import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { DeleteTaskRequest, TaskItemResponse } from '@/types';

import { Button, ModalConfirmation } from '@/components';
import { TASK_COLUMN, TASK_PRIORITY } from '@/constants';
import { useDeleteTaskMutation } from '@/feature/task/api';
import { TaskForm } from '@/feature/task/ui/TaskForm.tsx';

import classes from './TaskCard.module.css';

export type Props = {
  task: TaskItemResponse;
};

export const TaskCard = ({ task }: Props) => {
  const [isEditMode, setIsEdit] = useState(false);
  const [isOpenModalDeleteTask, setIsOpenModalDeleteTask] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', task, columnId: task.status },
    disabled: isEditMode,
  });

  const [deleteTask] = useDeleteTaskMutation();

  const taskPriority = TASK_PRIORITY[task.priority].LABEL;
  const isDeadLine = Date.now() > new Date(task.deadline).getTime();
  const isDone = TASK_COLUMN.DONE.STATUS === task.status;

  const handleEditMode = (isEditMode: boolean) => {
    setIsEdit(isEditMode);
  };

  const handleModalDeleteTask = (isOpen: boolean) => {
    setIsOpenModalDeleteTask(isOpen);
  };

  const handleDeleteTask = (data: DeleteTaskRequest) => {
    deleteTask({ ...data });
  };

  return (
    <div
      className={classes.wrapper}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      data-dragging-task={isDragging && !isEditMode && 'dragging'}
      data-done-task={isDone && 'done'}
      ref={isEditMode ? null : setNodeRef}
      {...attributes}
      {...listeners}
    >
      {isEditMode ? (
        <TaskForm task={task} isEditMode setIsEditMode={handleEditMode} />
      ) : (
        <div className={classes.wrapperTaskCard}>
          <div className={classes.wrapperTaskTitle}>
            <h3>{task.title}</h3>
            <div className={classes.wrapperTaskTitleBtn}>
              <Button disabled={isDone} onClick={() => handleEditMode(true)}>
                <SquarePen size="20" color="green" />
              </Button>
              <Button onClick={() => handleModalDeleteTask(true)}>
                <Trash2 size="20" color="red" />
              </Button>
            </div>
          </div>
          <div className={classes.wrapperTaskStatus}>
            <span data-task-priority={taskPriority}>{taskPriority}</span>
            <span data-task-deadline={isDeadLine && 'deadline'}>
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          </div>
          <p className={classes.taskDescription}>{task.description}</p>
        </div>
      )}
      {isOpenModalDeleteTask && (
        <ModalConfirmation
          title={
            <h3 className="modalConfirmation">
              Are you sure you want to delete the task <span>{task.title}</span>
            </h3>
          }
          isOpen={isOpenModalDeleteTask}
          setIsOpen={handleModalDeleteTask}
          onConfirm={() => handleDeleteTask({ taskId: task.id, boardId: task.todoListId })}
        />
      )}
    </div>
  );
};
