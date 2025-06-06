import { type SubmitHandler, useForm } from 'react-hook-form';

import type { Login } from '@/types/types.ts';

import { setToken } from '@/app/reducer/appSlice.ts';
import { RESULTCODE } from '@/constants/resultCode.ts';
import { useLoginMutation } from '@/feature/auth/api/authApi.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';

export const useLogin = (handleOpenModal?: (isOpen: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { control, setError, handleSubmit } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const res = await login(data).unwrap();
    if (res.resultCode === RESULTCODE.success) {
      localStorage.setItem('access_token', res.data.token);
      dispatch(setToken(res.data.token));
      handleOpenModal?.(false);
    }

    if (res.resultCode === RESULTCODE.error) {
      setError('email', { type: 'server', message: ' ' });
      setError('password', { type: 'server', message: res.messages[0] });
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
  };
};
