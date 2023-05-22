import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsxm from '@/libraries/utils/clsxm';
import UserLayout from '../../../components/layout/UserLayout';

import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { usePatchUserMutation } from '../../../store/services/userApi';
import { selectUser, updateUser } from '../../../store/slices/userSlice';

import {
  Button,
  Typography,
  TextField,
  Avatar,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import KeyIcon from '@mui/icons-material/Key';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import routePath from '@routes/routePath';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const categoryOptions = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

type FormValues = {
  name: string;
  nickname: string;
  birthDate: string;
  gender: number | '';
  phone: string;
  subscribeNewsletter: boolean;
  category: string[];
  contactName: string;
  contactPhone: string;
  address: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('姓名為必填欄位'),
  nickname: Yup.string(),
  birthDate: Yup.string(),
  gender: Yup.string(),
  phone: Yup.string(),
  subscribeNewsletter: Yup.boolean(),
  category: Yup.array(),
  contactName: Yup.string(),
  contactPhone: Yup.string(),
  address: Yup.string(),
});

const PersonalSettings = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [patchUser] = usePatchUserMutation();
  const userData = useAppSelector(selectUser);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

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
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userData.name,
      // nickname: userData.nickname,
      // birthDate: userData.birthDate,
      // gender: userData.gender,
      // phone: userData.phone,
      // subscribeNewsletter: userData.subscribeNewsletter,
      // category: userData.category,
      // contactName: '',
      // contactPhone: '',
      // address: '',
    },
  });

  const handleDateSelect = (newValue: Dayjs | null) => {
    const value = dayjs(newValue).format('YYYY-MM-DD');
    setSelectedDate(dayjs(value));
    // setValue('birthDate', value);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log('form data : ', data);
    try {
      const res = await patchUser({ id: userData.id, body: data }).unwrap();
      // console.log(res);

      const updateData = {
        name: res.name,
      };

      dispatch(updateUser(updateData));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserLayout>
      <div className="flex justify-end px-0 md:px-10">
        <Button onClick={() => router.push('/new-password')} className="" variant="outlined" startIcon={<KeyIcon />}>
          修改密碼
        </Button>
      </div>

      <form className="flex md:flex-row flex-col md:space-x-5 px-0 md:px-10 py-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center mb-5 md:mb-0">
          <Avatar className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] mb-5" alt="個人大頭貼" src=""></Avatar>
          <Button className="" variant="outlined" component="label" startIcon={<AddPhotoAlternateIcon />}>
            選擇上傳圖片
            <input type="file" hidden />
          </Button>
        </div>
        <div className={clsxm('w-full md:w-2/3 flex flex-col ')}>
          <div className="mb-10 w-full">
            <Typography className="text-secondary mb-5" component="h2" variant="h5">
              修改個人資料
            </Typography>
            <div className="grid grid-cols-2 gap-3">
              <TextField
                fullWidth
                className=""
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
                fullWidth
                className=""
                id="nickname"
                label="暱稱 *"
                autoComplete="nickname"
                autoFocus
                size="small"
                // {...register('nickname', { required: true })}
                // error={!!errors.nickname}
                // helperText={errors.nickname?.message}
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
                    // error: !!errors.birthDate,
                    // helperText: errors.birthDate?.message,
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
                // {...register('gender', { required: true })}
                // error={!!errors.gender}
                // helperText={errors.gender?.message}
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
                label="Email"
                autoComplete="email"
                size="small"
                disabled
                value={userData.email}
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
                  {categoryOptions.map((category) => (
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
  name: string;
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
