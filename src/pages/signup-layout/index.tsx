import Link from 'next/link';
import clsxm from '@/lib/clsxm';
import { Button, Typography, TextField } from '@mui/material';
import { Google } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';

const SignUp = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('birthday'), data.get('email'));
  };

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
          立即加入會員
        </Typography>
        <form className="mb-10 w-full" onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            required
            fullWidth
            id="userName"
            label="姓名"
            name="userName"
            autoComplete="userName"
            autoFocus
            size="small"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="nickname"
            label="暱稱"
            name="nickname"
            autoComplete="nickname"
            autoFocus
            size="small"
          />

          <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="gender"
            label="性別"
            name="gender"
            autoComplete="gender"
            autoFocus
            size="small"
          />
          <DatePicker
            className="mb-1 mt-2 w-full"
            label="生日"
            slotProps={{
              textField: {
                id: 'birthday',
                name: 'birthday',
                size: 'small',
              },
            }}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="passwordCurrent"
            size="small"
          />
          <TextField
            className="mb-5"
            margin="dense"
            required
            fullWidth
            name="passwordConfirm"
            label="再次輸入密碼"
            type="password"
            id="passwordConfirm"
            autoComplete="passwordConfirm"
            size="small"
          />
          <div className="flex flex-col items-center mb-5">
            <Typography component="p" variant="caption">
              已經有帳號了嗎 ?{' '}
              <Link
                href="/login"
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
        <Button className="mb-5" type="submit" fullWidth variant="outlined" startIcon={<Google />}>
          使用 Google 登入
        </Button>
        <div className="flex flex-col items-center mb-5">
          <Typography component="p" variant="caption">
            註冊即表示您同意
            <Link
              href="/user-terms"
              className="no-underline visited:text-primary text-primary hover:text-secondary font-medium mx-1"
            >
              使用條款
            </Link>
            及
            <Link
              href="/user-privacy"
              className="no-underline visited:text-primary text-primary hover:text-secondary font-medium mx-1"
            >
              隱私權政策
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
