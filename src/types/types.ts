import type { Control, FieldValues, Path } from 'react-hook-form';

export type Response<Data> = {
  resultCode: number;
  messages: string[];
  data: Data;
};

export type Request = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type ColumnType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type Login = {
  email: string;
  password: string;
  captcha?: string;
  rememberMe?: boolean;
};

export type FormField<T extends FieldValues> = {
  rules?: Record<string, unknown>;
  control: Control<T>;
  name: Path<T>;
  error?: string;
};
