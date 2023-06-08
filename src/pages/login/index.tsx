import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsxm from '@/libraries/utils/clsxm';
import { Button, Typography, TextField } from '@mui/material';
import { Google } from '@mui/icons-material';
import useFirebaseAuthentication from '@libraries/hooks/useFirebaseAuthentication';
import routePath from '@routes/routePath';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';

type FormData = {
  email: string;
  password: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  email: Yup.string().required('email為必填欄位').email('email格式不對'),
  password: Yup.string().required('密碼為必填欄位'),
});

const LogIn = () => {
  const router = useRouter();
  const { handleGoogleAuth, googleToken } = useFirebaseAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('form data : ', data);
  };

  useEffect(() => {
    if (googleToken) {
      // 過期時間120分鐘
      const expirationTime = 120;
      const currentDate = new Date();
      currentDate.setTime(currentDate.getTime() + expirationTime * 60 * 1000);
      Cookies.set('googleToken', googleToken, { expires: currentDate });

      // Cookies.set('googleToken', googleToken, { expires: 1 });
      router.push(routePath.home);
    }
  }, [googleToken, router]);

  return (
    <div className="max-w-xl mx-auto px-5 py-20">
      <div
        className={clsxm(
          'py-10 px-5 sm:px-20',
          'flex flex-col items-center',
          'border border-solid border-secondary-10',
          'shadow-md rounded-md',
        )}
      >
        <Typography className="text-secondary mb-5" component="h2" variant="h5">
          開始你的募資旅程
        </Typography>
        <form className="mb-10 w-full" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            {...register('email', { required: true })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            className="mb-5"
            margin="normal"
            fullWidth
            label="密碼"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', { required: true })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <div className="flex flex-col items-center mb-5">
            <Typography component="p" variant="caption">
              忘記密碼了嗎 ?{' '}
              <Link
                href="/forget-password"
                className="no-underline visited:text-primary text-primary hover:text-secondary font-medium mx-1"
              >
                重設密碼
              </Link>
            </Typography>
          </div>

          <Button type="submit" fullWidth variant="contained">
            登入
          </Button>
        </form>

        <Typography className="text-secondary mb-10" component="h2" variant="h6">
          — 透過其他方式登入 —
        </Typography>
        <Button
          onClick={handleGoogleAuth}
          className="mb-5"
          type="submit"
          fullWidth
          variant="outlined"
          startIcon={<Google />}
        >
          使用 Google 登入
        </Button>
        <div className="flex flex-col items-center mb-5">
          <Typography component="p" variant="caption">
            還沒有帳號嗎 ?{' '}
            <Link
              href={routePath.signup}
              className="no-underline visited:text-primary text-primary hover:text-secondary font-medium mx-1"
            >
              馬上註冊
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
