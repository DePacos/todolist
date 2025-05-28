import { Checkbox } from '@/components/checkbox/Checkbox.tsx';
import { Input } from '@/components/input/Input.tsx';
import { useLogin } from '@/feature/auth/model/useLogin.tsx';

import classes from './login.module.css';

type Props = {
  handleOpenModal?: (isOpen: boolean) => void;
};

export const Login = ({ handleOpenModal }: Props) => {
  const { handleSubmit, onSubmit, register, errors } = useLogin(handleOpenModal);

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.email?.message}
          placeholder="Email"
          type="email"
          {...register('email', {
            required: {
              value: true,
              message: 'Email is require',
            },
            maxLength: {
              value: 30,
              message: 'Email is long',
            },
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
              message: 'Invalid email format',
            },
          })}
        />
        <Input
          error={errors.password?.message}
          placeholder="Password"
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is require',
            },
            maxLength: {
              value: 20,
              message: 'Password is long',
            },
          })}
        />
        <Checkbox label="rememberMe" {...register('rememberMe')} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
