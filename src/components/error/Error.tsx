import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES, THEME_MODE } from '@/constants';

import classes from './Error.module.css';

export const Error = ({ description }: { description: string }) => {
  const setThemeRef = useRef(true);
  const theme = localStorage.getItem(THEME_MODE.name);

  if (setThemeRef.current) {
    setThemeRef.current = false;
    document.body.setAttribute(THEME_MODE.dataAtr, theme || THEME_MODE.light);
  }

  return (
    <div className={classes.wrapper}>
      <h1>{description}</h1>
      <Link to={ROUTES.HOME}>Back to main</Link>
    </div>
  );
};
