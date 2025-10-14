import type { ComponentProps } from 'react';
import { useController, type FieldValues } from 'react-hook-form';

import type { FormField } from '@/types';

import { DataPicker } from '@/components';

type Props<T extends FieldValues> = {
  label?: string;
  error?: string;
} & ComponentProps<'input'> &
  FormField<T>;

export const FormDataPicker = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  error,
  ...props
}: Props<T>) => {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <DataPicker label={label} error={error || fieldState.error?.message} {...field} {...props} />
  );
};
