import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectError, selectLoading, selectTheme, setTheme } from '@/app/reducer';
import { ACCESS_TOKEN, THEME_MODE } from '@/constants';
import { useLogoutMutation } from '@/feature/auth/api';
import { useAppDispatch } from '@/hooks';

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const appError = useSelector(selectError);
  const theme = useSelector(selectTheme);
  const isAppLoading = useSelector(selectLoading);
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const handleModalLogin = (isOpenLogin: boolean) => {
    setIsOpenLogin(isOpenLogin);
  };

  const handleChangeTheme = () => {
    const newTheme = theme === THEME_MODE.light ? THEME_MODE.dark : THEME_MODE.light;

    dispatch(setTheme(newTheme));
    localStorage.setItem(THEME_MODE.name, newTheme);
    document.body.setAttribute(THEME_MODE.dataAtr, newTheme);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem(ACCESS_TOKEN);
  };

  useEffect(() => {
    document.body.setAttribute(THEME_MODE.dataAtr, theme);
  }, []);

  return {
    appError,
    theme,
    handleChangeTheme,
    isLogoutLoading,
    isOpenLogin,
    isAppLoading,
    handleModalLogin,
    handleLogout,
  };
};
