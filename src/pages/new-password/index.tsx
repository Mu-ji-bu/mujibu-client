import Link from 'next/link';
import clsxm from '@/libraries/utils/clsxm';
import { Button, Typography, TextField } from '@mui/material';

const NewPassword = () => {
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
            margin="dense"
            required
            fullWidth
            id="oldPassword"
            label="輸入舊密碼"
            name="oldPassword"
            autoComplete="oldPassword"
            autoFocus
            size="small"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="newPassword"
            label="輸入新密碼"
            name="newPassword"
            autoComplete="newPassword"
            autoFocus
            size="small"
          />
          <TextField
            className="mb-5"
            margin="dense"
            required
            fullWidth
            id="confirmNewPassword"
            label="請再次輸入新密碼"
            name="confirmNewPassword"
            autoComplete="confirmNewPassword"
            autoFocus
            size="small"
          />
          <Button type="submit" fullWidth variant="contained">
            重設密碼
          </Button>
        </form>
      </div>
    </div>
  );
};
export default NewPassword;
