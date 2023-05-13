import { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Stack,
  Button,
  Typography,
  Link,
  FormControlLabel,
  TextField,
  Checkbox,
} from '@mui/material';
import { Google } from '@mui/icons-material';

const SignUp = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <Container component="div" maxWidth="sm">
      <Box className="border border-solid border-secondary-10 shadow-md my-20 py-10 px-20 flex flex-col items-center rounded-md">
        <Typography className="text-secondary mb-5" component="h2" variant="h5">
          立即加入會員
        </Typography>
        <Box className="mb-10" component="form" onSubmit={handleSubmit}>
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
          <Box className="flex flex-col items-center mb-5">
            <Typography component="p" variant="caption">
              已經有帳號了嗎 ?{' '}
              <Link href="#" className="hover:text-secondary ml-1" variant="caption" underline="none">
                登入
              </Link>
            </Typography>
          </Box>

          <Button type="submit" fullWidth variant="contained">
            註冊
          </Button>
        </Box>

        <Typography className="text-secondary mb-10" component="h2" variant="h6">
          — 透過其他方式登入 —
        </Typography>

        <Button className="mb-5" type="submit" fullWidth variant="outlined" startIcon={<Google />}>
          使用 Google 登入
        </Button>
        <Box className="flex flex-col items-center mb-5">
          <Typography component="p" variant="caption">
            註冊即表示您同意
            <Link href="#" className="hover:text-secondary mx-1" variant="caption" underline="none">
              使用條款
            </Link>
            及
            <Link href="#" className="hover:text-secondary mx-1" variant="caption" underline="none">
              隱私權政策
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;
