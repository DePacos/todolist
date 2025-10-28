import { TASK_COLUMN } from '@/constants';

export const tasksColumnConfig = [
  {
    columnName: TASK_COLUMN.CREATED.NAME,
    taskStatus: TASK_COLUMN.CREATED.STATUS,
  },
  {
    columnName: TASK_COLUMN.IN_PROGRESS.NAME,
    taskStatus: TASK_COLUMN.IN_PROGRESS.STATUS,
  },
  {
    columnName: TASK_COLUMN.DONE.NAME,
    taskStatus: TASK_COLUMN.DONE.STATUS,
  },
];
