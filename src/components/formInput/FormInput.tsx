import type { ComponentPropsWithoutRef } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { FormField } from '@/types/types.ts';

import { Input } from '@/components/input/Input.tsx';

type Props<T extends FieldValues> = {
  type?: 'text' | 'password' | 'email';
  error?: string;
  label?: string;
} & ComponentPropsWithoutRef<'input'> &
  FormField<T>;

export const FormInput = <T extends FieldValues>({
  control,
  name,
  rules,
  error,
  type,
  label,
  ...props
}: Props<T>) => {
  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      {...field}
      type={type}
      label={label}
      error={error || fieldState.error?.message}
      {...props}
    />
  );
};
