import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useFirebaseAuthentication from '@libraries/hooks/useFirebaseAuthentication';
import routePath from '@routes/routePath';
import styles from './style.module.scss';

type FormData = {
  account: string;
  password: string;
};

type LoginFormValues = {
  account: string;
  password: string;
};

const schema = Yup.object().shape({
  account: Yup.string().required('帳號為必填欄位'),
  password: Yup.string().required('密碼為必填欄位'),
});

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const { handleGoogleAuth, googleToken } = useFirebaseAuthentication();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleGoogleAuth();
  };

  useEffect(() => {
    if (googleToken) {
      const hasLoginToken = localStorage.getItem('googleToken');
      if (hasLoginToken === googleToken) {
        // 有token時代表註冊過則登入
        router.push(routePath.home);
      } else {
        alert('請先註冊');
      }
    }
  }, [googleToken, router]);

  return (
    <div className={styles['login-form']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="帳號" type="text" {...register('account')} />
        {errors.account && <span className={styles['error-text']}>{errors.account.message}</span>}
        <input placeholder="密碼" type="password" {...register('password')} />
        {errors.password && <span className={styles['error-text']}>{errors.password.message}</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const LogInContent = () => {
  return (
    <div>
      <h1>3.0 登入</h1>
      <LoginForm />
      <a href={routePath.signup}>馬上註冊</a>
    </div>
  );
};

export default LogInContent;
