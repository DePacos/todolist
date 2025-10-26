import z from 'zod';

import type { TaskPriority } from '@/types';

import { DAY, REGEX_EMAIL, TASK_PRIORITY_VALUES } from '@/constants';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is require' })
    .max(30, { message: 'Max title length 30 characters' })
    .trim(),
  description: z.string().max(150, { message: 'Max description length 150 characters' }).optional(),
  priority: z.coerce
    .number()
    .min(0)
    .max(TASK_PRIORITY_VALUES.length - 1)
    .transform((value) => value as TaskPriority)
    .optional(),
  deadline: z
    .string()
    .refine(
      (dateString) => {
        if (!dateString?.trim()) return true;
        const date = new Date(dateString).getTime();
        const yesterday = Date.now() - DAY;

        return !Number.isNaN(date) && date >= yesterday;
      },
      { message: 'Date less than current' },
    )
    .optional(),
});

export const boardSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is require' })
    .max(20, { message: 'Max title length 20 characters' }),
});

const emailRegex = new RegExp(REGEX_EMAIL);

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is require' })
    .refine((value) => !value || emailRegex.test(value), { message: 'Invalid email format' }),
  password: z
    .string()
    .min(1, { message: 'Password is require' })
    .max(20, { message: 'Password is long' }),
  rememberMe: z.boolean().optional(),
});

export type TaskFormType = z.infer<typeof taskSchema>;
export type BoardFormType = z.infer<typeof boardSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
