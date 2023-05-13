import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useFirebaseAuthentication from '@libraries/hooks/useFirebaseAuthentication';
import routePath from '@routes/routePath';
import styles from './style.module.scss';

type FormData = {
  name: string;
  nickname: string;
  email: string;
  gender: string;
  birthdate: string;
  password: string;
};

type SignUpFormValues = {
  name: string;
  nickname: string;
  email: string;
  gender: string;
  birthdate: string;
  password: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('帳號為必填欄位'),
  password: Yup.string().required('密碼為必填欄位'),
});

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(schema),
  });
  const { handleGoogleAuth, googleToken } = useFirebaseAuthentication();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleGoogleAuth();
  };

  useEffect(() => {
    if (googleToken) {
      localStorage.setItem('googleToken', googleToken);
      router.push(routePath.home);
    }
  }, [googleToken, router]);

  return (
    <div className={styles['signup-form']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="姓名" type="text" {...register('name')} />
        {errors.name && <span className={styles['error-text']}>{errors.name.message}</span>}
        <input placeholder="暱稱" type="text" {...register('nickname')} />
        {errors.nickname && <span className={styles['error-text']}>{errors.nickname.message}</span>}
        <input placeholder="電子信箱" type="text" {...register('email')} />
        {errors.email && <span className={styles['error-text']}>{errors.email.message}</span>}
        <input placeholder="性別" type="text" {...register('gender')} />
        {errors.gender && <span className={styles['error-text']}>{errors.gender.message}</span>}
        <input placeholder="生日" type="text" {...register('birthdate')} />
        {errors.birthdate && <span className={styles['error-text']}>{errors.birthdate.message}</span>}
        <input placeholder="密碼" type="password" {...register('password')} />
        {errors.password && <span className={styles['error-text']}>{errors.password.message}</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const SignUpContent = () => {
  return (
    <div>
      <h1>4.0 註冊</h1>
      <SignUpForm />
      <span>
        已有帳號?
        <a href={routePath.login}>馬上登入</a>
      </span>
    </div>
  );
};

export default SignUpContent;
