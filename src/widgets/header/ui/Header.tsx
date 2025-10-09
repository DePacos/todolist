import { LogIn, LogOut, Moon, Sun } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

import { Modal, Toast } from '@/components';
import { Login } from '@/feature/auth/ui';

import classes from './Header.module.css';

import { useHeader } from '../model/useHeader';

export const Header = ({ isAuth }: { isAuth: boolean }) => {
  const {
    appError,
    theme,
    handleChangeTheme,
    isLogoutLoading,
    isOpenLogin,
    isAppLoading,
    handleModalLogin,
    handleLogout,
  } = useHeader();

  return (
    <header className={classes.wrapper}>
      <h1>TODO APP</h1>
      <div className={classes.btn}>
        {isAuth ? (
          <>
            <button onClick={handleChangeTheme} title="change theme">
              {theme === 'light' ? (
                <Moon size={36} color="var(--title-color)" />
              ) : (
                <Sun size={36} color="var(--title-color)" />
              )}
            </button>
            <button onClick={handleLogout} title="logout">
              <LogOut size={36} color="var(--title-color)" />
            </button>
          </>
        ) : (
          <button onClick={() => handleModalLogin(true)} title="login">
            <LogIn size={36} color="var(--title-color)" />
          </button>
        )}
      </div>
      <Modal isOpen={isOpenLogin} setIsOpen={handleModalLogin}>
        <Login handleOpenModal={handleModalLogin} />
      </Modal>
      <Toast error={appError} />
      {(isAppLoading || isLogoutLoading) && (
        <div className={classes.wrapperSkeleton}>
          <Skeleton className={classes.skeleton} />
        </div>
      )}
    </header>
  );
};
