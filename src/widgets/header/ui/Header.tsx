import { LogIn, LogOut, Moon, Sun } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

import { Button, Modal, Toast } from '@/components';
import { Login } from '@/feature/auth/ui';
import { useHeader } from '@/widgets/header/model';

import classes from './Header.module.css';

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
            <Button variant="default" onClick={handleChangeTheme} title="change theme">
              {theme === 'light' ? (
                <Moon size={36} color="var(--title-color)" />
              ) : (
                <Sun size={36} color="var(--title-color)" />
              )}
            </Button>
            <Button variant="default" onClick={handleLogout} title="logout">
              <LogOut size={36} color="var(--title-color)" />
            </Button>
          </>
        ) : (
          <Button onClick={() => handleModalLogin(true)} title="login">
            <LogIn size={36} color="var(--title-color)" />
          </Button>
        )}
      </div>
      {isOpenLogin && (
        <Modal isOpen={isOpenLogin} setIsOpen={handleModalLogin}>
          <Login handleOpenModal={handleModalLogin} />
        </Modal>
      )}
      {appError && <Toast error={appError} />}
      {(isAppLoading || isLogoutLoading) && (
        <div className={classes.wrapperSkeleton}>
          <Skeleton className={classes.skeleton} />
        </div>
      )}
    </header>
  );
};
