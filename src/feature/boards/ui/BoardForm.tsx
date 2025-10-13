import { Check, CirclePlus } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import type { FormColumnData } from '@/types';

import { FormInput } from '@/components';

import classes from './Board.module.css';

type Props = {
  onSubmit: (data: FormColumnData) => void;
  isEditMode?: boolean;
  defaultValue?: string;
  isLoading?: boolean;
  error?: string;
};

export const BoardForm = ({ isEditMode, onSubmit, defaultValue, isLoading, error }: Props) => {
  const editModeRef = useRef<Boolean>(true);

  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<FormColumnData>({ mode: 'onChange' });

  if (isEditMode && editModeRef.current) {
    editModeRef.current = false;
    reset({
      title: defaultValue || '',
    });
  }

  return (
    <form className={classes.boardForm} onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        error={error}
        disabled={isLoading}
        maxLength={21}
        control={control}
        name="title"
        placeholder="Column name"
        rules={{
          required: 'Column name is require',
          maxLength: { value: 20, message: 'Name is long' },
        }}
      />
      <button disabled={!isValid}>
        {isEditMode ? (
          <Check size="24" color="green" />
        ) : (
          <CirclePlus size="30" color="var(--font-color)" />
        )}
      </button>
    </form>
  );
};
