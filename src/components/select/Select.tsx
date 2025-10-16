import { forwardRef, useId, type ComponentProps, type JSX, type Ref } from 'react';

import type { Option } from '@/types';

import classes from './Select.module.css';

type Props<T extends Option[]> = {
  options: T;
  defaultValue?: T[number]['value'];
  label?: string;
  error?: string;
  id?: string;
} & ComponentProps<'select'>;

export const Select = forwardRef(
  <T extends Option[]>(
    { options, defaultValue, label, error, id, ...props }: Props<T>,
    ref: Ref<HTMLSelectElement>,
  ) => {
    const selectId = useId();

    return (
      <div className={classes.wrapperSelect}>
        <label htmlFor={id || selectId}>{label}</label>
        <select
          className={error ? classes.error : ''}
          defaultValue={defaultValue || ''}
          id={id || selectId}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="inputError">{error}</span>}
      </div>
    );
  },
) as <T extends Option[]>(props: Props<T> & { ref?: Ref<HTMLSelectElement> }) => JSX.Element;
