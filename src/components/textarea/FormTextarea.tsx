import type { ComponentProps } from 'react';
import { useController, type FieldValues } from 'react-hook-form';

import type { FormField } from '@/types';

import { Textarea } from '@/components';

type Props<T extends FieldValues> = {
  label?: string;
  error?: string;
} & ComponentProps<'textarea'> &
  FormField<T>;

export const FormTextarea = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  error,
  ...props
}: Props<T>) => {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <Textarea label={label} {...field} error={error || fieldState.error?.message} {...props} />
  );
};
