import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { setError } from '@/app/reducer/appSlice.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';

import classes from './toast.module.css';

type Props = {
  error: string | null;
};

export const Toast = ({ error }: Props) => {
  const [queue, setQueue] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (error) {
      setQueue((prev) => [...prev, error]);
    }
  }, [error]);

  useEffect(() => {
    if (queue.length === 0) return;

    setVisible(true);

    const hideTimer = setTimeout(() => {
      setVisible(false);

      const removeTimer = setTimeout(() => {
        setQueue((prev) => prev.slice(1));
      }, 300);

      return () => clearTimeout(removeTimer);
    }, 3000);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [queue[0]]);

  useEffect(() => {
    if (queue.length === 0) {
      dispatch(setError(null));
    }
  }, [queue]);

  if (queue.length === 0) return null;

  return createPortal(
    <div className={classes.wrapper}>
      {queue.map((e, i) => (
        <div
          key={`${e}-${i}`}
          className={`${classes.toast} ${i === 0 ? (visible ? classes.enter : classes.exit) : ''}`}
        >
          {e}
        </div>
      ))}
    </div>,
    document.body,
  );
};
