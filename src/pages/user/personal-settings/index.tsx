import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsxm from '@/libraries/utils/clsxm';
import { useAppSelector } from '@libraries/hooks/reduxHooks';
import { selectUser } from '../../../store/slices/userSlice';
import {
  Button,
  Typography,
  TextField,
  Avatar,
  MenuItem,
  Tab,
  Tabs,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import KeyIcon from '@mui/icons-material/Key';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import UserLayout from '../../../components/layout/UserLayout';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import routePath from '@routes/routePath';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const options = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

type FormData = {
  userName: string;
  nickname: string;
  email: string;
  gender: number | '';
  birthDate: string;
  password: string;
  passwordConfirm: string;
};

type SignUpFormValues = {
  userName: string;
  nickname: string;
  email: string;
  gender: number | '';
  birthDate: string;
  password: string;
  passwordConfirm: string;
};

const schema = Yup.object().shape({
  userName: Yup.string().required('姓名為必填欄位'),
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
const PersonalSettings = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const router = useRouter();
  const { avatar, userName, email } = useAppSelector(selectUser);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: '',
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

  return (
    <UserLayout>
      <form className="flex space-x-5 px-10 py-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-1/3 shrink-0 flex flex-col items-center ">
          <Avatar className="w-[200px] h-[200px] mb-5" alt="" src=""></Avatar>
          <Button variant="outlined" component="label" startIcon={<AddPhotoAlternateIcon />}>
            選擇上傳圖片
            <input type="file" hidden />
          </Button>
        </div>
        <div className={clsxm('w-2/3 flex flex-col ')}>
          <Button
            onClick={() => router.push('/new-password')}
            className="self-end"
            variant="outlined"
            startIcon={<KeyIcon />}
          >
            修改密碼
          </Button>

          <div className="mb-10 w-full">
            <Typography className="text-secondary mb-5" component="h2" variant="h5">
              修改個人資料
            </Typography>
            <div className="grid grid-cols-2 gap-3">
              <TextField
                fullWidth
                className=""
                id="userName"
                label="姓名 *"
                autoComplete="userName"
                autoFocus
                size="small"
                {...register('userName', { required: true })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
              <TextField
                fullWidth
                className=""
                id="nickname"
                label="暱稱 *"
                autoComplete="nickname"
                autoFocus
                size="small"
                {...register('nickname', { required: true })}
                error={!!errors.nickname}
                helperText={errors.nickname?.message}
              />

              <DatePicker
                className="w-full"
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

              <TextField
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
                fullWidth
                id="phone"
                label="聯絡電話 *"
                autoComplete="phone"
                autoFocus
                size="small"
                // {...register('phone', { required: true })}
                // error={!!errors.phone}
                // helperText={errors.phone?.message}
              />

              <div className="col-span-full">
                <FormControlLabel
                  className="text-secondary"
                  control={<Checkbox defaultChecked />}
                  name="subscribeNewsletter"
                  label="接收電子報"
                />
              </div>
              <FormControl component="fieldset" className="col-span-full">
                <FormLabel component="legend">請選擇感興趣的類別</FormLabel>
                <FormGroup className="flex-row">
                  {options.map((category) => (
                    <FormControlLabel
                      className="text-secondary"
                      key={category}
                      control={
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                      }
                      label={category}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </div>
          </div>

          <div className="mb-10 w-full">
            <Typography className="text-secondary mb-5" component="h2" variant="h5">
              修改收件資料
            </Typography>
            <div className="grid grid-cols-2 gap-3">
              <TextField
                fullWidth
                className=""
                id="contactName"
                label="收件者姓名 *"
                autoComplete="contactName"
                autoFocus
                size="small"
                // {...register('contactName', { required: true })}
                // error={!!errors.contactName}
                // helperText={errors.contactName?.message}
              />
              <TextField
                fullWidth
                id="contactPhone"
                label="收件者電話 *"
                autoComplete="contactPhone"
                autoFocus
                size="small"
                // {...register('contactPhone', { required: true })}
                // error={!!errors.contactPhone}
                // helperText={errors.contactPhone?.message}
              />

              <div className="col-span-full">
                <FormControlLabel
                  className="text-secondary"
                  control={<Checkbox />}
                  name="sameAbove"
                  label="與贊助人資料相同"
                />
              </div>

              <TextField
                fullWidth
                className="col-span-full"
                id="address"
                name="address"
                label="地址 *"
                autoComplete="收件地址"
                autoFocus
                size="small"
              />
            </div>
          </div>
          <Button type="submit" fullWidth variant="contained">
            儲存
          </Button>
        </div>
      </form>
    </UserLayout>
  );
};
export default PersonalSettings;

{
  /* id?: string;
  uid: string;
  avatar?: string | undefined;
  userName: string;
  email: string;
  nickname?: string;
  birthDate?: string;
  gender?: number;
  phone?: string;
  subscribeNewsletter?: boolean;
  category?: string[];
  contactName?: string;
  contactPhone?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  address?: string;
  createdAt?: Date | null; */
}
