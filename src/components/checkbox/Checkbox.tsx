import { type ComponentProps, useId, forwardRef } from 'react';

import classes from './Checkbox.module.css';

type Props = {
  id?: string;
  label?: string;
  error?: string;
} & ComponentProps<'input'>;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, id, error, ...props }, ref) => {
    const inputId = useId();
    return (
      <div className={classes.wrapper}>
        <input type="checkbox" id={id || inputId} ref={ref} {...props} />
        <label htmlFor={id || inputId}>{label}</label>
        {error && <span>{error}</span>}
      </div>
    );
  },
);
