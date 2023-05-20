import Link from 'next/link';
import clsxm from '@/libraries/utils/clsxm';
import { Button, Typography, TextField } from '@mui/material';
const ForgetPassword = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data);
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
          重設密碼
        </Typography>
        <form className="mb-10 w-full" onSubmit={handleSubmit}>
          <TextField
            className="mb-5"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
          />
          <Button type="submit" fullWidth variant="contained">
            寄送重設密碼連結
          </Button>
        </form>
        <div className="flex items-center mb-5 space-x-10">
          <Link
            href="/login"
            className="no-underline visited:text-primary text-primary hover:text-secondary font-medium"
          >
            <Typography component="p" variant="caption">
              重新登入
            </Typography>
          </Link>

          <Link
            href="/login"
            className="no-underline visited:text-primary text-primary hover:text-secondary font-medium"
          >
            <Typography component="p" variant="caption">
              {' '}
              重新註冊
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
