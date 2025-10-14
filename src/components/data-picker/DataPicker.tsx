import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

import classes from './DataPicker.module.css';

type Props = {
  label?: string;
  error?: string;
} & ComponentProps<'input'>;

export const DataPicker = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }: Props, ref) => {
    return (
      <div className={classes.wrapperDataPicker}>
        {label && <label>{label}</label>}
        <input ref={ref} type="date" {...props} />
        {error && <span className="inputError">{error}</span>}
      </div>
    );
  },
);
