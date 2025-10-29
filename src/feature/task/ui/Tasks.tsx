import { createPortal } from 'react-dom';

import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';

import { tasksColumnConfig, useTasks } from '@/feature/task/model';
import { TaskCard, TasksColumn } from '@/feature/task/ui';

import classes from './Tasks.module.css';

export const Tasks = () => {
  const {
    board,
    tasks,
    activeTask,
    getTasksByStatus,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useTasks();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h1>{board?.title}</h1>
      <ul className={classes.wrapperTasks}>
        {tasks?.items.length === 0 ? (
          <li key={tasksColumnConfig[0].taskStatus}>
            <TasksColumn
              columnId={tasksColumnConfig[0].taskStatus}
              columnName={tasksColumnConfig[0].columnName}
              activeTask={activeTask}
              tasks={getTasksByStatus(tasks?.items, tasksColumnConfig[0].taskStatus)}
            />
          </li>
        ) : (
          tasksColumnConfig.map((column) => (
            <li key={column.taskStatus}>
              <TasksColumn
                columnId={column.taskStatus}
                columnName={column.columnName}
                activeTask={activeTask}
                tasks={getTasksByStatus(tasks?.items, column.taskStatus)}
              />
            </li>
          ))
        )}
      </ul>
      {createPortal(
        <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
