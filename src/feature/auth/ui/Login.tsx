import { FormCheckbox, FormInput, Button } from '@/components';
import { REGEX_EMAIL } from '@/constants';

import classes from './Login.module.css';

import { useLogin } from '../model/useLogin.tsx';

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
              value: REGEX_EMAIL,
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
        <Button />
      </form>
    </div>
  );
};
