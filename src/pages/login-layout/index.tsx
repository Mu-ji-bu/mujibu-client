import Link from 'next/link';
import clsxm from '@/lib/clsxm';
import { Button, Typography, TextField } from '@mui/material';
import { Google } from '@mui/icons-material';

const LogIn = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          開始你的募資旅程
        </Typography>
        <form className="mb-10 w-full" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            className="mb-5"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="current-password"
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
        <Button className="mb-5" type="submit" fullWidth variant="outlined" startIcon={<Google />}>
          使用 Google 登入
        </Button>
        <div className="flex flex-col items-center mb-5">
          <Typography component="p" variant="caption">
            還沒有帳號嗎 ?{' '}
            <Link
              href="/signup"
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
