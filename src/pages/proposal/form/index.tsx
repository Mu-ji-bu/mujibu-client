import { useEffect, useState, useMemo, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { usePatchUserMutation } from '../../../store/services/userApi';
import { selectUser, updateUser } from '../../../store/slices/userSlice';
import { Typography, Stepper, Step, StepLabel, Button, MobileStepper } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import ProposalStep1 from '@/components/pages/proposal/ProposalStep1';
import ProposalStep2 from '@/components/pages/proposal/ProposalStep2';

import type { IUserState } from '@/types/user';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  name: Yup.string().required('姓名為必填欄位'),
  nickname: Yup.string().required('暱稱為必填欄位'),
  birthDate: Yup.string().required('生日為必填欄位'),
  category: Yup.number().required('性別為必填欄位'),
  phone: Yup.string().required('聯絡電話為必填欄位'),
  subscribeNewsletter: Yup.boolean(),
  category2: Yup.array().of(Yup.string()),
  contactName: Yup.string().required('收件者姓名為必填欄位'),
  contactPhone: Yup.string().required('收件者電話為必填欄位'),
  address: Yup.string().required('收件地址為必填欄位'),
});

const steps = ['提案資料', '回饋方案', '團隊資料', '物流/提領設定', '畫面預覽', '送出提案'];

const Form = () => {
  const dispatch = useAppDispatch();
  const [patchUser, { isLoading: patchUserLoading }] = usePatchUserMutation();

  const userData = useAppSelector(selectUser);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  };

  // useEffect(() => {
  //   reset({
  //     avatar: userData.avatar,
  //     name: userData.name,
  //     nickname: userData.nickname,
  //     birthDate: userData.birthDate,
  //     gender: userData.gender,
  //     phone: userData.phone,
  //     subscribeNewsletter: userData.subscribeNewsletter,
  //     category: userData.category,
  //     contactName: userData.contactName,
  //     contactPhone: userData.contactPhone,
  //     address: userData.address,
  //   });
  // }, [userData, reset]);

  return (
    <div className="bg-gray-light">
      <div className="border-0 border-b border-solid border-secondary-10 sticky top-0 left-0 bg-green-accent-10 md:bg-white z-10">
        <Stepper activeStep={activeStep} className="max-w-screen-md mx-auto md:flex hidden px-5 py-4">
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="md:hidden flex items-center justify-between">
          <Typography className="flex items-center px-5 py-3 w-2/3" component="h2" variant="h6">
            <span className="bg-primary text-white pt-0 pb-0.5 px-[7px] text-sm rounded-full mr-2">
              {activeStep + 1}
            </span>{' '}
            {steps[activeStep]}
          </Typography>

          <div className="md:hidden bg-white shrink-0 p-2">
            <LoadingButton
              className="md:hidden bg-white bg-opacity-75"
              // loading={patchUserLoading}
              type="submit"
              color="secondary"
              startIcon={<SaveIcon />}
            >
              儲存草稿
              {/* <span>{patchUserLoading ? '儲存中' : '儲存草稿'}</span> */}
            </LoadingButton>
          </div>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto md:py-5">
        <div className="hidden md:block w-full bg-gray-dark text-secondary text-center px-5 py-3 rounded-md border border-solid border-secondary-10">
          <Typography component="h2" variant="h5">
            {steps[activeStep]}
          </Typography>
        </div>

        <form className="flex flex-col items-center md:py-5" onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && <ProposalStep1 setValue={setValue} control={control} />}
          {activeStep === 1 && <ProposalStep2 setValue={setValue} control={control} />}
          {activeStep !== 0 && activeStep !== 1 && <ProposalStep1 setValue={setValue} control={control} />}

          <div className="w-full border-0 border-t border-solid border-secondary-10 md:px-5 md:py-4 fixed bottom-0 left-0 bg-white z-10">
            <div className="hidden md:flex justify-between max-w-screen-xl mx-auto">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                color="secondary"
                startIcon={<UndoIcon />}
              >
                返回上一步
              </Button>
              <div className="flex space-x-5">
                <LoadingButton
                  loading={patchUserLoading}
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  startIcon={<SaveIcon />}
                >
                  <span>{patchUserLoading ? '儲存中' : '儲存草稿'}</span>
                </LoadingButton>

                {activeStep === steps.length - 2 && (
                  <Button variant="contained" startIcon={<CheckIcon />}>
                    送出提案
                  </Button>
                )}
                {activeStep !== steps.length - 2 && activeStep !== steps.length - 1 && (
                  <Button onClick={handleNext} variant="contained" startIcon={<RedoIcon />}>
                    {`下一步：${steps[activeStep + 1]}`}
                  </Button>
                )}
              </div>
            </div>

            <MobileStepper
              className="md:hidden"
              variant="text"
              steps={6}
              position="static"
              activeStep={activeStep}
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  <KeyboardArrowLeft />
                  上一步
                </Button>
              }
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                  {activeStep === steps.length - 2 ? '送出提案' : '下一步'}
                  <KeyboardArrowRight />
                </Button>
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
