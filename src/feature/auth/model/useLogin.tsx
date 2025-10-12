import { type SubmitHandler, useForm } from 'react-hook-form';

import type { Login } from '@/types';

import { todolistApi } from '@/app/api';
import { ACCESS_TOKEN, RESPONSE_CODE } from '@/constants';
import { useLoginMutation } from '@/feature/auth/api';
import { useAppDispatch } from '@/hooks';

export const useLogin = (handleOpenModal?: (isOpen: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { control, setError, handleSubmit } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const res = await login(data).unwrap();
    if (res.resultCode === RESPONSE_CODE.success) {
      localStorage.setItem(ACCESS_TOKEN, res.data.token);
      dispatch(todolistApi.util.invalidateTags(['Me']));
      handleOpenModal?.(false);
    }

    if (res.resultCode === RESPONSE_CODE.error) {
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
