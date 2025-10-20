import { type SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import type { LoginRequest } from '@/schemas';

import { todolistApi } from '@/app/api';
import { ACCESS_TOKEN, RESPONSE_CODE } from '@/constants';
import { useLoginMutation } from '@/feature/auth/api';
import { useAppDispatch } from '@/hooks';
import { loginSchema } from '@/schemas';

export const useLogin = (handleOpenModal?: (isOpen: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const {
    control,
    setError,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginRequest>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
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
    isValid,
  };
};
