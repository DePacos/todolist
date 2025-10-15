import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

import classes from './Button.module.css';

type Props = {
  variant?: 'primary';
} & ComponentProps<'button'>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant, ...props }, ref) => {
    return (
      <button data-variant={variant} ref={ref} className={classes.button} {...props}>
        {children}
      </button>
    );
  },
);
