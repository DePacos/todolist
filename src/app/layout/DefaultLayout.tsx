import { Outlet } from 'react-router-dom';

import { RESPONSE_CODE } from '@/constants';
import { useMeQuery } from '@/feature/auth/api';
import { Boards } from '@/feature/boards/ui';
import { Header } from '@/widgets/header/ui';

import classes from './DefaultLayout.module.css';

export const DefaultLayout = () => {
  const { data } = useMeQuery();
  const isAuth = data?.resultCode === RESPONSE_CODE.success;

  const Content = () => {
    return (
      <div className={classes.wrapperContent}>
        <aside>
          <Boards />
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    );
  };

  return (
    <>
      <Header isAuth={isAuth} />
      {isAuth && <Content />}
    </>
  );
};
