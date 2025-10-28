import { CopyPlus } from 'lucide-react';
import { useState } from 'react';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import type { TaskColumnName, TaskItemResponse } from '@/types';

import { Button, Modal } from '@/components';
import { TASK_COLUMN } from '@/constants';
import { TaskCard, TaskForm } from '@/feature/task';

import classes from './Tasks.module.css';

type Props = {
  columnId: number;
  columnName: TaskColumnName;
  activeTask?: TaskItemResponse;
  tasks: TaskItemResponse[];
};

export const TasksColumn = ({ columnId, columnName, tasks }: Props) => {
  const { setNodeRef } = useDroppable({
    id: columnId,
    data: { type: 'column', columnId },
  });

  const taskIds = tasks.map((task) => task.id);

  const [isOpenAddTaskModal, setOpenAddTaskModal] = useState(false);

  const isNoTasks = tasks.length === 0;
  const isCreateColumn = columnName === TASK_COLUMN.CREATED.NAME;

  const handleModal = (isOpen: boolean) => {
    setOpenAddTaskModal(isOpen);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={classes.wrapperTasksColumn}
        data-no-tasks={isCreateColumn && isNoTasks && 'noTasks'}
      >
        {isCreateColumn && (
          <Button onClick={() => handleModal(true)} className={classes.addTaskButton}>
            <CopyPlus size={26} color="var(--title-color)" />
          </Button>
        )}
        <div className={classes.taskColumnTitle}>
          {isCreateColumn && isNoTasks ? 'Create' : columnName}
        </div>
        <SortableContext
          id={String(columnId)}
          items={taskIds}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      {isOpenAddTaskModal && (
        <Modal isOpen={isOpenAddTaskModal} setIsOpen={handleModal}>
          <TaskForm />
        </Modal>
      )}
    </>
  );
};
