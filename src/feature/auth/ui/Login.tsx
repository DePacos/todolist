import { FormCheckbox } from '@/components/checkbox/FormCheckbox.tsx';
import { FormInput } from '@/components/input/FormInput.tsx';
import { useLogin } from '@/feature/auth/model/useLogin.tsx';

import classes from './login.module.css';

type Props = {
  handleOpenModal?: (isOpen: boolean) => void;
};

export const Login = ({ handleOpenModal }: Props) => {
  const { control, handleSubmit, onSubmit } = useLogin(handleOpenModal);

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control}
          name="email"
          type="email"
          placeholder="Email"
          rules={{
            require: 'Email is require',
            maxLength: { value: 30, message: 'Email is long' },
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
              message: 'Invalid email format',
            },
          }}
        />
        <FormInput
          control={control}
          name="password"
          type="password"
          placeholder="Password"
          rules={{
            require: 'Password is require',
            maxLength: { value: 20, message: 'Password is long' },
          }}
        />
        <FormCheckbox control={control} name="rememberMe" label="rememberMe" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
