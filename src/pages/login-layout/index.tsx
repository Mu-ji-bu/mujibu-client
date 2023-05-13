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
    <Container component="div" maxWidth="sm">
      <Box className="border border-solid border-secondary-10 shadow-md mt-20 py-10 px-20 flex flex-col items-center rounded-md">
        <Typography className="text-secondary mb-5" component="h2" variant="h5">
          開始你的募資旅程
        </Typography>
        <Box className="mb-10" component="form" onSubmit={handleSubmit}>
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
          <Box className="flex flex-col items-center mb-5">
            <Typography component="p" variant="caption">
              忘記密碼了嗎 ?{' '}
              <Link href="#" className="hover:text-secondary ml-1" variant="caption" underline="none">
                重設密碼
              </Link>
            </Typography>
          </Box>

          <Button type="submit" fullWidth variant="contained">
            登入
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
            還沒有帳號嗎 ?{' '}
            <Link href="#" className="hover:text-secondary ml-1" variant="caption" underline="none">
              馬上註冊
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
export default LogIn;
