import type { Control, FieldValues, Path } from 'react-hook-form';

import type { THEME_MODE, TASK_COLUMN, TASK_PRIORITY } from '@/constants';

export type ThemeMode = (typeof THEME_MODE)[keyof typeof THEME_MODE];

export type AppInitialState = {
  theme: ThemeMode;
  error: string | null;
  isAppLoading: boolean;
};

// shared
export type Response<Data> = { resultCode: number; messages: string[]; data: Data };
export type PutAfterItem = { putAfterItemId: string | null };

// auth
export type LoginResponse = { userId: number; token: string };
export type LoginRequest = { email: string; password: string; rememberMe?: boolean };
export type MeResponse = { userId: number; email: string };

// boarder
export type BoardId = { id: string };
export type AddBoardRequest = { title: string };
export type GetBoardsResponse = { addedDate: string; order: number } & BoardId & AddBoardRequest;
export type UpdateBoardRequest = BoardId & AddBoardRequest;
export type OrderBoardsRequest = PutAfterItem & BoardId;

// task
export type TaskId = { id: string };
export type TaskItem = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
  order: number;
};

export type AddTaskRequest = Partial<TaskItem> & Pick<TaskItem, 'title'> & BoardId;
export type UpdateTaskRequest = { taskId: string } & AddTaskRequest;
export type OrderTaskRequest = { boardId: string; taskId: string } & PutAfterItem;
export type DeleteTaskRequest = { boardId: string; taskId: string };

export type TaskItemResponse = { todoListId: string; addedDate: string } & TaskItem & TaskId;
export type TaskResponse = { items: TaskItemResponse[]; error: string; totalCount: number };

// form
export type FormField<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  error?: string;
};

export type Option = { label: string; value: string };

// constants
export type TaskStatus = (typeof TASK_COLUMN)[keyof typeof TASK_COLUMN]['STATUS'];
export type TaskColumnName = (typeof TASK_COLUMN)[keyof typeof TASK_COLUMN]['NAME'];
export type TaskPriority = keyof typeof TASK_PRIORITY;
