import { useEffect, useState, useMemo } from 'react';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import clsxm from '@/libraries/utils/clsxm';
import UserLayout from '../../../components/layout/UserLayout';

import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { usePatchUserMutation } from '../../../store/services/userApi';
import { selectUser, updateUser } from '../../../store/slices/userSlice';
import { setUserTabsPage } from '../../../store/slices/tabsSlice';
import type { IUserState } from '@/types/user';

import {
  Button,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyIcon from '@mui/icons-material/Key';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';

const categoryOptions = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

const schema = Yup.object().shape({
  name: Yup.string().required('姓名為必填欄位'),
  nickname: Yup.string().required('暱稱為必填欄位'),
  birthDate: Yup.string().required('生日為必填欄位'),
  gender: Yup.number().required('性別為必填欄位'),
  phone: Yup.string().required('聯絡電話為必填欄位'),
  subscribeNewsletter: Yup.boolean(),
  category: Yup.array().of(Yup.string()),
  contactName: Yup.string(),
  contactPhone: Yup.string(),
  address: Yup.string(),
});

const PersonalSettings = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [patchUser, { isLoading: patchUserLoading }] = usePatchUserMutation();
  const userData = useAppSelector(selectUser);

  const [imageUploaded, setImageUploaded] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(userData.category ?? []);
  const [sameAbove, setSameAbove] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<IUserState>({
    mode: 'onChange',
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

  const handleCategoryChange = (value: string[], category: string) => {
    setSelectedCategories(value);
    const newCategories = selectedCategories?.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...(selectedCategories ?? []), category];
    setSelectedCategories(newCategories);
    return newCategories;
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
            isProposal={false}
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
                control={control}
                name="name"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    className=""
                    id="name"
                    label="姓名 *"
                    autoComplete="name"
                    autoFocus
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="nickname"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    className=""
                    id="nickname"
                    label="暱稱 *"
                    autoComplete="nickname"
                    autoFocus
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!errors.nickname}
                    helperText={errors.nickname?.message}
                  />
                )}
              />

              <Controller
                name="birthDate"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DatePicker
                    className="w-full"
                    label="生日 *"
                    disableFuture
                    value={dayjs(value)}
                    onChange={(newValue) => onChange(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small',
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="gender"
                    label="性別 *"
                    autoComplete="gender"
                    autoFocus
                    size="small"
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                    select
                    value={value}
                    onChange={onChange}
                  >
                    <MenuItem value="" disabled>
                      請選擇
                    </MenuItem>
                    <MenuItem value={0}>男</MenuItem>
                    <MenuItem value={1}>女</MenuItem>
                    <MenuItem value={2}>不方便透露</MenuItem>
                  </TextField>
                )}
              />
              <TextField
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                size="small"
                disabled
                value={userData.email}
              />
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="phone"
                    label="聯絡電話 *"
                    autoComplete="phone"
                    autoFocus
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
              <div className="col-span-full">
                <Controller
                  control={control}
                  name="subscribeNewsletter"
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      className="text-secondary"
                      control={<Checkbox checked={value} onChange={onChange} />}
                      label="接收電子報"
                    />
                  )}
                />
              </div>
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange: onCheckBoxChange, value } }) => (
                  <FormControl component="fieldset" className="col-span-full">
                    <FormLabel component="legend">請選擇感興趣的類別</FormLabel>
                    <FormGroup className="flex-row">
                      {categoryOptions.map((category) => (
                        <FormControlLabel
                          className="text-secondary"
                          value={category}
                          key={category}
                          label={category}
                          control={
                            <Checkbox
                              checked={value?.includes(category)}
                              onChange={() => value && onCheckBoxChange(handleCategoryChange(value, category))}
                            />
                          }
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                )}
              />
            </div>
          </div>

          <div className="mb-10 w-full">
            <Typography className="text-secondary mb-5" component="h2" variant="h5">
              修改收件資料
            </Typography>
            <div className="grid grid-cols-2 gap-3">
              <Controller
                control={control}
                name="contactName"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    className=""
                    id="contactName"
                    label="收件者姓名 *"
                    autoComplete="contactName"
                    autoFocus
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!errors.contactName}
                    helperText={errors.contactName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="contactPhone"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="contactPhone"
                    label="收件者電話 *"
                    autoComplete="contactPhone"
                    autoFocus
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!errors.contactPhone}
                    helperText={errors.contactPhone?.message}
                  />
                )}
              />

              <div className="col-span-full">
                <FormControlLabel
                  className="text-secondary"
                  control={<Checkbox checked={sameAbove} onChange={handleSameAboveChange} />}
                  name="sameAbove"
                  label="與贊助人資料相同"
                />
              </div>
              <Controller
                control={control}
                name="address"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    className="col-span-full"
                    id="address"
                    label="收件地址 *"
                    autoComplete="收件地址"
                    autoFocus
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </div>
          </div>

          <LoadingButton loading={patchUserLoading} type="submit" fullWidth variant="contained">
            <span>{patchUserLoading ? '儲存中' : '儲存'}</span>
          </LoadingButton>
        </div>
      </form>
    </UserLayout>
  );
};
export default PersonalSettings;
