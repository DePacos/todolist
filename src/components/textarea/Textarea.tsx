import type { ComponentProps } from 'react';
import { useId } from 'react';
import { forwardRef } from 'react';

import classes from './Textarea.module.css';

type Props = {
  label?: string;
  error?: string;
  id?: string;
} & ComponentProps<'textarea'>;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, id, ...props }: Props, ref) => {
    const textareaId = useId();
    return (
      <div className={classes.wrapperTextArea}>
        {label && <label htmlFor={id || textareaId}>{label}</label>}
        <textarea
          className={error ? classes.error : ''}
          id={id || textareaId}
          ref={ref}
          {...props}
        />
        {error && <span className="inputError">{error}</span>}
      </div>
    );
  },
);
