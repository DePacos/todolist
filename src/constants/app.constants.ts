import type { TaskPriority } from '@/types';

export const RESPONSE_CODE = {
  success: 0,
  error: 1,
};

export const SLICE_NAME = {
  app: 'app',
};

export const THEME_MODE = {
  dataAtr: 'data-theme',
  name: 'themeMode',
  light: 'light',
  dark: 'dark',
} as const;

export const ACCESS_TOKEN = 'q0?YCbtBruQg';
export const DAY = 86400000;
export const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export const ROUTES = {
  HOME: '/',
  BOARD: 'board/',
};

export const TASK_COLUMN = {
  CREATED: {
    NAME: 'Created',
    STATUS: 0,
  },
  IN_PROGRESS: {
    NAME: 'In progress',
    STATUS: 1,
  },
  DONE: {
    NAME: 'Done',
    STATUS: 2,
  },
} as const;

export const TASK_PRIORITY = {
  0: {
    LABEL: 'Low',
    VALUE: '0',
  },
  1: {
    LABEL: 'Normal',
    VALUE: '1',
  },
  2: {
    LABEL: 'High',
    VALUE: '2',
  },
} as const;

export const TASK_PRIORITY_VALUES = Object.keys(TASK_PRIORITY).map(
  (key) => Number(key) as TaskPriority,
);
