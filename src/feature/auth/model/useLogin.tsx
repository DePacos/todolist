import { type SubmitHandler, useForm } from 'react-hook-form';

import type { Login } from '@/types/types.ts';

import { RESULTCODE } from '@/constants/resultCode.ts';
import { useLoginMutation, useMeQuery } from '@/feature/auth/api/authApi.ts';

export const useLogin = (handleOpenModal?: (isOpen: boolean) => void) => {
  const { refetch } = useMeQuery();
  const [login] = useLoginMutation();

  const {
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const res = await login(data).unwrap();
    if (res.resultCode === RESULTCODE.success) {
      localStorage.setItem('access_token', res.data.token);
      refetch();
      handleOpenModal?.(false);
    }

    if (res.resultCode === RESULTCODE.error) {
      setError('email', { type: 'server', message: ' ' });
      setError('password', { type: 'server', message: res.messages[0] });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
  };
};
