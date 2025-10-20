import { FormCheckbox, FormInput, Button } from '@/components';

import classes from './Login.module.css';

import { useLogin } from '../model/useLogin.tsx';

type Props = {
  handleOpenModal?: (isOpen: boolean) => void;
};

export const Login = ({ handleOpenModal }: Props) => {
  const { control, handleSubmit, onSubmit, isValid } = useLogin(handleOpenModal);

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput control={control} name="email" placeholder="Email" type="email" />
        <FormInput control={control} name="password" placeholder="Password" type="password" />
        <FormCheckbox control={control} name="rememberMe" label="rememberMe" />
        <Button disabled={!isValid} variant="primary">
          Login
        </Button>
      </form>
    </div>
  );
};
