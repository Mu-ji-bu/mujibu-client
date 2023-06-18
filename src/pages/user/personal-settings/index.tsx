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

import { Button, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyIcon from '@mui/icons-material/Key';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';
import { InputText, InputSelect, InputCheckbox, InputCheckboxes, InputDatepicker } from '@/components/block/form';

const genderItems = ['男', '女', '不方便透露'];
const categoryItems = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

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
  const [sameAbove, setSameAbove] = useState(false);

  const {
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
    console.log('user form data : ', data);
    try {
      const res = await patchUser({ _id: userData._id, body: data }).unwrap();
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
              <InputText
                control={control}
                error={!!errors.name}
                helperText={errors.name?.message}
                name={'name'}
                label={'姓名 *'}
                defaultValue={''}
              />
              <InputText
                control={control}
                error={!!errors.nickname}
                helperText={errors.nickname?.message}
                name={'nickname'}
                label={'暱稱 *'}
                defaultValue={''}
              />

              <InputSelect
                control={control}
                error={!!errors.gender}
                helperText={errors.gender?.message}
                name={'gender'}
                label={'性別 *'}
                items={genderItems}
                isNumber={true}
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

              <InputDatepicker
                control={control}
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
                name={'birthDate'}
                label={'生日 *'}
                disableFuture={true}
              />

              <InputText
                control={control}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                name={'phone'}
                label={'聯絡電話 *'}
                defaultValue={''}
              />

              <div className="col-span-full">
                <InputCheckbox
                  control={control}
                  name={'subscribeNewsletter'}
                  label={'接收電子報'}
                  defaultValue={false}
                  className="text-secondary"
                />
              </div>
              <div className="col-span-full">
                <InputCheckboxes
                  control={control}
                  name={'category'}
                  label={'請選擇感興趣的類別'}
                  items={categoryItems}
                  defaultValue={userData.category ?? []}
                  className="text-secondary"
                />
              </div>
            </div>
          </div>

          <div className="mb-10 w-full">
            <Typography className="text-secondary mb-5" component="h2" variant="h5">
              修改收件資料
            </Typography>
            <div className="grid grid-cols-2 gap-3">
              <InputText
                control={control}
                error={!!errors.contactName}
                helperText={errors.contactName?.message}
                name={'contactName'}
                label={'收件者姓名 *'}
                defaultValue={''}
              />

              <InputText
                control={control}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone?.message}
                name={'contactPhone'}
                label={'收件者電話 *'}
                defaultValue={''}
              />

              <div className="col-span-full">
                <FormControlLabel
                  className="text-secondary"
                  control={<Checkbox checked={sameAbove} onChange={handleSameAboveChange} />}
                  name="sameAbove"
                  label="與贊助人資料相同"
                />
              </div>

              <InputText
                className="col-span-full"
                control={control}
                error={!!errors.address}
                helperText={errors.address?.message}
                name={'address'}
                label={'收件地址 *'}
                defaultValue={''}
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
