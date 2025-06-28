import type { ComponentPropsWithoutRef } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { FormField } from '@/types/types.ts';

import { Checkbox } from '@/components/checkbox/Checkbox.tsx';

type Props<T extends FieldValues> = {
  error?: boolean;
  label?: string;
} & ComponentPropsWithoutRef<'input'> &
  FormField<T>;

export const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  rules,
  error,
  label,
  ...props
}: Props<T>) => {
  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Checkbox {...field} label={label} error={error || fieldState.error?.message} {...props} />
  );
};
