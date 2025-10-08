import { type ComponentProps, forwardRef, useId } from 'react';

import classes from './Input.module.css';

export type InputTypes = 'password' | 'email';

type Props = {
  label?: string;
  error?: string;
  type?: InputTypes;
  id?: string;
} & ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, type = 'text', id, ...props }, ref) => {
    const inputId = useId();
    return (
      <div className={classes.wrapper}>
        {label && <label htmlFor={id || inputId}>{label}</label>}
        <input
          style={{ borderColor: error ? 'red' : '' }}
          type={type}
          ref={ref}
          id={id || inputId}
          {...props}
        />
        {error && <span>{error}</span>}
      </div>
    );
  },
);
