import { useEffect, useState, useMemo } from 'react';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsxm from '@/libraries/utils/clsxm';
import UserLayout from '../../../components/layout/UserLayout';

import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { usePatchUserMutation } from '../../../store/services/userApi';
import { selectUser, updateUser } from '../../../store/slices/userSlice';
import { setUserTabsPage } from '../../../store/slices/tabsSlice';
import type { IUserState } from '@/types/user';
import LoadingButton from '@mui/lab/LoadingButton';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import KeyIcon from '@mui/icons-material/Key';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import routePath from '@routes/routePath';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';

const schema = Yup.object().shape({
  name: Yup.string().required('姓名為必填欄位'),
  nickname: Yup.string().required('暱稱為必填欄位'),
  birthDate: Yup.string().required('生日為必填欄位'),
  gender: Yup.number().required('性別為必填欄位'),
  phone: Yup.string().required('聯絡電話為必填欄位'),
  subscribeNewsletter: Yup.boolean(),
  category: Yup.array().of(Yup.string()),
  contactName: Yup.string().required('收件者姓名為必填欄位'),
  contactPhone: Yup.string().required('收件者電話為必填欄位'),
  address: Yup.string().required('收件地址為必填欄位'),
});

const categoryOptions = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

const PersonalSettings = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [patchUser, { isLoading: patchUserLoading }] = usePatchUserMutation();

  const userData = useAppSelector(selectUser);

  const [imageUploaded, setImageUploaded] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(userData.birthDate) ?? null);
  const [selectedGender, setSelectedGender] = useState<number | string>(userData.gender ?? '');
  const [selectedNewspaper, setSelectedNewspaper] = useState<boolean>(userData.subscribeNewsletter ?? false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(userData.category ?? []);
  const [sameAbove, setSameAbove] = useState(false);

  const handleDateSelect = (newValue: Dayjs | null) => {
    const value = dayjs(newValue).format('YYYY-MM-DD');
    setSelectedDate(dayjs(value));
    setValue('birthDate', value);
  };

  const handleGenderSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(e.target.value);
  };

  const handleNewspaperChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedNewspaper(e.target.checked);
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSameAboveChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSameAbove(e.target.checked);

    if (e.target.checked) {
      setValue('contactName', getValues('name'));
      setValue('contactPhone', getValues('phone'));
    } else {
      setValue('contactName', '');
      setValue('contactPhone', '');
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<IUserState>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        avatar: userData.avatar,
        name: userData.name,
        nickname: userData.nickname,
        birthDate: userData.birthDate,
        gender: userData.gender,
        phone: userData.phone,
        subscribeNewsletter: userData.subscribeNewsletter,
        category: userData.category,
        contactName: userData.contactName,
        contactPhone: userData.contactPhone,
        address: userData.address,
      };
    }, [userData]),
  });

  const onSubmit: SubmitHandler<IUserState> = async (data) => {
    console.log('form data : ', data);
    try {
      const res = await patchUser({ id: userData.id, body: data }).unwrap();
      const updateData = {
        ...res,
      };
      dispatch(updateUser(updateData));
      console.log(updateData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (imageUploaded) {
      setValue('avatar', imageUploaded);
    }
  }, [imageUploaded, setValue]);

  useEffect(() => {
    dispatch(setUserTabsPage(0));
  }, [dispatch]);

  useEffect(() => {
    reset({
      avatar: userData.avatar,
      name: userData.name,
      nickname: userData.nickname,
      birthDate: userData.birthDate,
      gender: userData.gender,
      phone: userData.phone,
      subscribeNewsletter: userData.subscribeNewsletter,
      category: userData.category,
      contactName: userData.contactName,
      contactPhone: userData.contactPhone,
      address: userData.address,
    });
  }, [userData, reset]);

  return (
    <UserLayout>
      <div className="flex justify-end px-0 lg:px-10">
        <Button onClick={() => router.push('/new-password')} className="" variant="outlined" startIcon={<KeyIcon />}>
          修改密碼
        </Button>
      </div>

      <form className="flex md:flex-row flex-col md:space-x-5 px-0 lg:px-10 py-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center mb-5 md:mb-0">
          <PhotoUpload
            originalName={userData.name ?? ''}
            originalAvatar={userData.avatar ?? ''}
            setImageUploaded={setImageUploaded}
          />
        </div>
        <div className={clsxm('w-full md:w-2/3 flex flex-col ')}>
          <div className="mb-10 w-full">
            <Typography className="text-secondary mb-5" component="h2" variant="h5">
              修改個人資料
            </Typography>
            <div className="grid grid-cols-2 gap-3">
              <Controller
                render={({ field }) => (
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
                )}
                control={control}
                name="name"
                defaultValue={userData.name}
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
                    size: 'small',
                    error: !!errors.birthDate,
                    helperText: errors.birthDate?.message,
                    ...register('birthDate', { required: true }),
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
                value={selectedGender}
                onChange={handleGenderSelect}
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
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />

              <div className="col-span-full">
                <FormControlLabel
                  className="text-secondary"
                  control={<Checkbox checked={selectedNewspaper} onChange={handleNewspaperChange} />}
                  {...register('subscribeNewsletter', { required: true })}
                  label="接收電子報"
                />
              </div>
              <FormControl component="fieldset" className="col-span-full">
                <FormLabel component="legend">請選擇感興趣的類別</FormLabel>
                <FormGroup className="flex-row">
                  {categoryOptions.map((category) => (
                    <FormControlLabel
                      {...register('category')}
                      className="text-secondary"
                      value={category}
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
                {...register('contactName')}
                error={!!errors.contactName}
                helperText={errors.contactName?.message}
              />
              <TextField
                fullWidth
                id="contactPhone"
                label="收件者電話 *"
                autoComplete="contactPhone"
                autoFocus
                size="small"
                {...register('contactPhone')}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone?.message}
              />

              <div className="col-span-full">
                <FormControlLabel
                  className="text-secondary"
                  control={<Checkbox checked={sameAbove} onChange={handleSameAboveChange} />}
                  name="sameAbove"
                  label="與贊助人資料相同"
                />
              </div>

              <TextField
                fullWidth
                className="col-span-full"
                id="address"
                label="收件地址 *"
                autoComplete="收件地址"
                autoFocus
                size="small"
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </div>
          </div>
          {/* <Button type="submit" fullWidth variant="contained">
            儲存
          </Button> */}

          <LoadingButton loading={patchUserLoading} loadingPosition="start" type="submit" fullWidth variant="contained">
            <span>{patchUserLoading ? '儲存中' : '儲存'}</span>
          </LoadingButton>
        </div>
      </form>
    </UserLayout>
  );
};
export default PersonalSettings;
