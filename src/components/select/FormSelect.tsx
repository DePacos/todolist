import type { ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { FormField, Option } from '@/types';

import { Select } from '@/components';

type SelectOptions<K extends Option[]> = {
  options: K;
  defaultValue?: K[number]['value'];
};

type Props<K extends Option[], T extends FieldValues> = {
  label?: string;
  error?: string;
} & ComponentProps<'select'> &
  FormField<T> &
  SelectOptions<K>;

export const FormSelect = <K extends Option[], T extends FieldValues>({
  control,
  name,
  rules,
  options,
  label,
  defaultValue,
  error,
  ...props
}: Props<K, T>) => {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <Select
      label={label}
      defaultValue={defaultValue}
      options={options}
      error={error || fieldState.error?.message}
      {...field}
      {...props}
    />
  );
};
