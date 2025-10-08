import type { InputTypes } from './Input';

import type { ComponentPropsWithoutRef } from 'react';
import { type FieldValues, useController } from 'react-hook-form';

import type { FormField } from '@/types';

import { Input } from './Input';

type Props<T extends FieldValues> = {
  type?: InputTypes;
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
