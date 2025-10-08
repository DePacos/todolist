import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

import classes from './Button.module.css';

type Props = {} & ComponentProps<'button'>;

export const Button = forwardRef<HTMLButtonElement, Props>(({ children, ...props }, ref) => {
  return (
    <button ref={ref} className={classes.button} {...props}>
      {children}
    </button>
  );
});
