import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsxm from '@/libraries/utils/clsxm';

import { Button, Typography, TextField, MenuItem } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import useFirebaseAuthentication from '@libraries/hooks/useFirebaseAuthentication';
import routePath from '@routes/routePath';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import Seo from '@/components/Seo';

type FormData = {
  name: string;
  nickname: string;
  email: string;
  gender: number | '';
  birthDate: string;
  password: string;
  passwordConfirm: string;
};

type SignUpFormValues = {
  name: string;
  nickname: string;
  email: string;
  gender: number | '';
  birthDate: string;
  password: string;
  passwordConfirm: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('姓名為必填欄位'),
  nickname: Yup.string().required('暱稱為必填欄位'),
  gender: Yup.string().required('性別為必填欄位'),
  birthDate: Yup.string().required('生日為必填欄位'),
  email: Yup.string().required('email為必填欄位').email('email格式不對'),
  password: Yup.string()
    .required('密碼為必填欄位')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      '密碼必須包含8個字符，其中至少包含一個大寫字母，一個小寫字母，一個數字',
    ),
  passwordConfirm: Yup.string()
    .required('確認密碼為必填欄位')
    .oneOf([Yup.ref('password')], '與上方密碼不相同'),
});

const SignUp = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const router = useRouter();
  const { handleGoogleAuth, googleToken } = useFirebaseAuthentication();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      gender: '',
      birthDate: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleDateSelect = (newValue: Dayjs | null) => {
    const value = dayjs(newValue).format('YYYY-MM-DD');
    setSelectedDate(dayjs(value));
    setValue('birthDate', value);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('form data : ', data);
    console.log('birthDate : ', data.birthDate);
  };

  useEffect(() => {
    if (googleToken) {
      Cookies.set('googleToken', googleToken);
      router.push(routePath.home);
    }
  }, [googleToken, router]);

  return (
    <>
      <Seo templateTitle="註冊" />
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
            立即加入會員
          </Typography>
          <form className="mb-10 w-full" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="dense"
              fullWidth
              id="name"
              label="姓名 *"
              autoComplete="name"
              autoFocus
              size="small"
              {...register('name', { required: true })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              margin="dense"
              fullWidth
              id="nickname"
              label="暱稱 *"
              autoComplete="nickname"
              autoFocus
              size="small"
              {...register('nickname', { required: true })}
              error={!!errors.nickname}
              helperText={errors.nickname?.message}
            />

            <TextField
              margin="dense"
              fullWidth
              id="email"
              label="Email *"
              autoComplete="email"
              autoFocus
              size="small"
              {...register('email', { required: true })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="dense"
              fullWidth
              id="gender"
              label="性別 *"
              autoComplete="gender"
              autoFocus
              size="small"
              {...register('gender', { required: true })}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              select
              defaultValue={''}
            >
              <MenuItem value="" disabled>
                請選擇
              </MenuItem>
              <MenuItem value={0}>男</MenuItem>
              <MenuItem value={1}>女</MenuItem>
              <MenuItem value={2}>不方便透露</MenuItem>
            </TextField>

            <DatePicker
              className="mb-1 mt-2 w-full"
              label="生日 *"
              disableFuture
              slotProps={{
                textField: {
                  id: 'birthDate',
                  name: 'birthDate',
                  size: 'small',
                  error: !!errors.birthDate,
                  helperText: errors.birthDate?.message,
                  // ...register('birthDate', { required: true }),
                },
              }}
              value={selectedDate}
              onChange={handleDateSelect}
            />

            <TextField
              margin="dense"
              fullWidth
              label="密碼 *"
              type="password"
              id="password"
              autoComplete="passwordCurrent"
              size="small"
              {...register('password', { required: true })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              className="mb-5"
              margin="dense"
              fullWidth
              label="再次輸入密碼 *"
              type="password"
              id="passwordConfirm"
              autoComplete="passwordConfirm"
              size="small"
              {...register('passwordConfirm', { required: true })}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
            />
            <div className="flex flex-col items-center mb-5">
              <Typography component="p" variant="caption">
                已經有帳號了嗎 ?{' '}
                <Link
                  href={routePath.login}
                  className="no-underline visited:text-primary text-primary hover:text-secondary font-medium mx-1"
                >
                  登入
                </Link>
              </Typography>
            </div>

            <Button type="submit" fullWidth variant="contained">
              註冊
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
            startIcon={<GoogleIcon />}
          >
            使用 Google 註冊
          </Button>
          <div className="flex flex-col items-center mb-5">
            <Typography component="p" variant="caption">
              註冊即表示您同意
              <Link
                href={routePath.userTerms}
                className="no-underline visited:text-primary text-primary hover:text-secondary font-medium mx-1"
              >
                使用條款
              </Link>
              及
              <Link
                href={routePath.userPrivacy}
                className="no-underline visited:text-primary text-primary hover:text-secondary font-medium mx-1"
              >
                隱私權政策
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
