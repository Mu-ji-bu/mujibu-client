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

import type { IProjectState } from '@/types/project';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  projectType: Yup.number().required('此為必填欄位'),
  projectName: Yup.string().required('此為必填欄位'),
  projectDescription: Yup.string().required('此為必填欄位'),
  projectImage: Yup.string(),
  projectCategory: Yup.number().required('此為必填欄位'),
  goalAmount: Yup.number()
    .typeError('目標金額只能填寫數字')
    .positive('目標金額必須大於零')
    .integer('目標金額必須為整數')
    .test('no-leading-zero', '目標金額不能以零開頭', function (value) {
      if (value === undefined || value === null) return true;
      return /^(?!0)\d+/.test(value.toString());
    })
    .required('此為必填欄位'),
  startTime: Yup.string().test('is-after-start', '開始時間不可晚於結束時間', function (value) {
    const { endTime } = this.parent;
    return dayjs(value).isAfter(dayjs(endTime)) === false;
  }),
  endTime: Yup.string().test('is-after-start', '結束時間不可早於開始時間', function (value) {
    const { startTime } = this.parent;
    return dayjs(value).diff(dayjs(startTime), 'day') >= 0;
  }),
  officialPage: Yup.string(),
  fanPage: Yup.string(),
  attachmentLink: Yup.string(),
  projectContent: Yup.string(),
});

const steps = ['提案資料', '回饋方案', '團隊資料', '提領/物流設定', '畫面預覽', '送出提案'];

const Form = () => {
  const dispatch = useAppDispatch();
  const [patchUser, { isLoading: patchUserLoading }] = usePatchUserMutation();

  const userData = useAppSelector(selectUser);

  const [activeStep, setActiveStep] = useState(0);
  const today = dayjs().startOf('day').toDate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<IProjectState>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        projectType: 0,
        projectName: '',
        projectDescription: '',
        projectImage: '',
        projectCategory: 0,
        goalAmount: 0,
        startTime: dayjs().startOf('day').toDate() || null,
        endTime: dayjs().add(1, 'day').startOf('day').toDate() || null,
        officialPage: '',
        fanPage: '',
        attachmentLink: '',
        projectContent: '',
      };
    }, []),
  });

  const onSubmit: SubmitHandler<IProjectState> = async (data) => {
    console.log('form data : ', data);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
          {activeStep === 0 && <ProposalStep1 setValue={setValue} errors={errors} control={control} />}
          {/* {activeStep === 1 && <ProposalStep2 setValue={setValue} errors={errors} control={control} />} */}
          {activeStep !== 0 && activeStep !== 1 && (
            <ProposalStep1 setValue={setValue} errors={errors} control={control} />
          )}

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
                  <Button type="submit" variant="contained" startIcon={<CheckIcon />}>
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
