import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@libraries/hooks/reduxHooks';
import { selectUser } from '../../../store/slices/userSlice';
import { usePostProposalMutation } from '../../../store/services/proposalApi';

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
import ProposalStep3 from '@/components/pages/proposal/ProposalStep3';
import ProposalStep4 from '@/components/pages/proposal/ProposalStep4';
// import ProposalStep5 from '@/components/pages/proposal/ProposalStep5';
import ProposalStep6 from '@/components/pages/proposal/ProposalStep6';

import type { IProjectState } from '@/types/project';
import dayjs from 'dayjs';

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsxm from '@/libraries/utils/clsxm';
import Seo from '@/components/Seo';

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
  startTime: Yup.date().test('is-after-start', '開始時間不可晚於結束時間', function (value) {
    const { endTime } = this.parent;
    return dayjs(value).isAfter(dayjs(endTime)) === false;
  }),
  endTime: Yup.date().test('is-after-start', '結束時間不可早於開始時間', function (value) {
    const { startTime } = this.parent;
    return dayjs(value).diff(dayjs(startTime), 'day') >= 0;
  }),
  officialPage: Yup.string(),
  fanPage: Yup.string(),
  attachmentLink: Yup.string(),
  projectContent: Yup.string().required('此為必填欄位'),
  projectPlans: Yup.array().of(
    Yup.object().shape({
      planName: Yup.string().required('此為必填欄位'),
      planType: Yup.string().required('此為必填欄位'),
      planDiscountPrice: Yup.number()
        .typeError('金額只能填寫數字')
        .positive('金額必須大於零')
        .integer('金額必須為整數')
        .required('此為必填欄位'),
      planOriginalPrice: Yup.number()
        .typeError('金額只能填寫數字')
        .positive('金額必須大於零')
        .integer('金額必須為整數')
        .required('此為必填欄位'),
      planImage: Yup.string(),
      planQuantity: Yup.number()
        .typeError('方案數量只能填寫數字')
        .positive('方案數量必須大於零')
        .integer('方案數量必須為整數')
        .required('此為必填欄位'),
      planStartTime: Yup.date().test('is-after-start', '開始時間不可晚於結束時間', function (value) {
        const { planEndTime } = this.parent;
        return dayjs(value).isAfter(dayjs(planEndTime)) === false;
      }),
      planEndTime: Yup.date().test('is-after-start', '結束時間不可早於開始時間', function (value) {
        const { planStartTime } = this.parent;
        return dayjs(value).diff(dayjs(planStartTime), 'day') >= 0;
      }),
      planDescription: Yup.string().required('此為必填欄位'),
      otherNotes: Yup.array().of(Yup.string()),
      isRealProduct: Yup.boolean(),
    }),
  ),
  projectTeam: Yup.object().shape({
    teamName: Yup.string().required('此為必填欄位'),
    teamIntroduction: Yup.string().required('此為必填欄位'),
    teamAvatar: Yup.string(),
    representativeName: Yup.string().required('此為必填欄位'),
    representativeMobile: Yup.string().required('此為必填欄位'),
    representativePhone: Yup.string().required('此為必填欄位'),
    representativeEmail: Yup.string().email('email格式不對').required('此為必填欄位'),
    companyName: Yup.string(),
    companyPhone: Yup.string(),
    companyRegistrationNumber: Yup.string(),
    companyAddress: Yup.string(),
    socialWebsite: Yup.string(),
    socialEmail: Yup.string().email('email格式不對'),
    socialFb: Yup.string(),
    socialLine: Yup.string(),
    socialIg: Yup.string(),
    socialYoutube: Yup.string(),
    isTaiwan: Yup.boolean().oneOf([true], '需要具有台灣國籍').required('需要具有台灣國籍'),
    isAgreeTerms: Yup.boolean().oneOf([true], '需要同意條款').required('需要同意條款'),
    isOver18: Yup.boolean().oneOf([true], '需要法定年齡超過18歲').required('需要法定年齡超過18歲'),
  }),
  withdrawSettings: Yup.object().shape({
    bankName: Yup.string().required('此為必填欄位'),
    accountNumber: Yup.string().required('此為必填欄位'),
    isAgreeTerms: Yup.boolean().oneOf([true], '需要同意條款').required('需要同意條款'),
  }),
  shippingSettings: Yup.object().shape({
    shippingSwitch: Yup.boolean(),
    deliveryInfo: Yup.object().shape({
      deliverySwitch: Yup.boolean(),
      deliveryFee: Yup.number().typeError('運費只能填寫數字').positive('運費必須大於零').integer('運費必須為整數'),
      multiProductCheckout: Yup.number(),
      freeShippingConditions: Yup.number(),
      freeShippingPrice: Yup.number()
        .typeError('免運金額只能填寫數字')
        .positive('免運金額必須大於零')
        .integer('免運金額必須為整數'),
      senderName: Yup.string(),
      senderPhone: Yup.string(),
      senderAddress: Yup.string(),
      // senderName: Yup.string().when('deliverySwitch', ([deliverySwitch], schema) => {
      //   return deliverySwitch ? schema.required('請提供寄件人姓名') : schema;
      // }),
      // senderPhone: Yup.string().when('deliverySwitch', ([deliverySwitch], schema) => {
      //   return deliverySwitch ? schema.required('請提供寄件人電話號碼') : schema;
      // }),
      // senderAddress: Yup.string().when('deliverySwitch', ([deliverySwitch], schema) => {
      //   return deliverySwitch ? schema.required('請提供寄件人地址') : schema;
      // }),
    }),

    cvsInfo: Yup.object().shape({
      cvsSwitch: Yup.boolean(),
      deliveryFee: Yup.number().typeError('運費只能填寫數字').positive('運費必須大於零').integer('運費必須為整數'),
      multiProductCheckout: Yup.number(),
      freeShippingConditions: Yup.number(),
      freeShippingPrice: Yup.number()
        .typeError('免運金額只能填寫數字')
        .positive('免運金額必須大於零')
        .integer('免運金額必須為整數'),
      cvsName: Yup.number().when('cvsSwitch', ([cvsSwitch], schema) => {
        return cvsSwitch ? schema.required('請選擇超商') : schema;
      }),
    }),
  }),
});

const steps = ['提案資料', '回饋方案', '團隊資料', '提領/物流設定', '畫面預覽', '送出提案'];

const Form = () => {
  const dispatch = useAppDispatch();
  const [postProposal, { isLoading: postProposalLoading }] = usePostProposalMutation();
  const userData = useAppSelector(selectUser);

  const [activeStep, setActiveStep] = useState(0);
  const [firstStep, setFirstStep] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  // const [proposalForm, setProposalForm] = useState({});
  const [proposalSuccess, setProposalSuccess] = useState(false);

  const {
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    reset,
    watch,
    control,
    formState,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm<IProjectState>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        projectType: 0,
        projectName: '',
        projectDescription: '',
        projectImage:
          'https://firebasestorage.googleapis.com/v0/b/mujibu.appspot.com/o/images%2Fdefault%2Fdefault_image.jpg?alt=media&token=eafe76e5-ea42-4eb2-9fb0-dde5b3fd7dd4',
        projectCategory: 0,
        goalAmount: 0,
        startTime: dayjs().startOf('day').toDate() || null,
        endTime: dayjs().add(1, 'day').startOf('day').toDate() || null,
        officialPage: '',
        fanPage: '',
        attachmentLink: '',
        projectContent: '',
        projectPlans: [
          {
            planName: '',
            planType: '',
            planDiscountPrice: 0,
            planOriginalPrice: 0,
            planImage:
              'https://firebasestorage.googleapis.com/v0/b/mujibu.appspot.com/o/images%2Fdefault%2Fdefault_image.jpg?alt=media&token=eafe76e5-ea42-4eb2-9fb0-dde5b3fd7dd4',
            planQuantity: 0,
            planStartTime: dayjs().startOf('day').toDate() || null,
            planEndTime: dayjs().add(1, 'day').startOf('day').toDate() || null,
            planDescription: '',
            otherNotes: [],
            isRealProduct: true,
          },
        ],
        projectTeam: {
          teamName: '',
          teamIntroduction: '',
          teamAvatar:
            'https://firebasestorage.googleapis.com/v0/b/mujibu.appspot.com/o/images%2Fdefault%2Fdefault_image.jpg?alt=media&token=eafe76e5-ea42-4eb2-9fb0-dde5b3fd7dd4',
          representativeName: '',
          representativeMobile: '',
          representativePhone: '',
          representativeEmail: '',
          companyName: '',
          companyPhone: '',
          companyRegistrationNumber: '',
          companyAddress: '',
          socialWebsite: '',
          socialEmail: '',
          socialFb: '',
          socialLine: '',
          socialIg: '',
          socialYoutube: '',
          isTaiwan: false,
          isAgreeTerms: false,
          isOver18: false,
        },
        withdrawSettings: {
          bankName: '',
          accountNumber: '',
          isAgreeTerms: false,
        },
        shippingSettings: {
          shippingSwitch: false,
          deliveryInfo: {
            deliverySwitch: false,
            deliveryFee: 100,
            multiProductCheckout: 0,
            freeShippingConditions: 1,
            freeShippingPrice: 1000,
            senderName: '',
            senderPhone: '',
            senderAddress: '',
          },
          cvsInfo: {
            cvsSwitch: false,
            deliveryFee: 70,
            multiProductCheckout: 0,
            freeShippingConditions: 1,
            freeShippingPrice: 1000,
            cvsName: 0,
          },
        },
      };
    }, []),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projectPlans',
  });

  const projectPlansNum = watch('projectPlans');
  const isDelivery = watch('shippingSettings.deliveryInfo.deliverySwitch');

  // const handleGetValues = () => {
  //   const formData = getValues();
  //   setProposalForm(formData);
  //   console.log(formData);
  // };

  const handleStep1 = () => {
    const checkData = getValues();
    console.log(checkData);
    if (
      firstStep &&
      checkData.projectName !== '' &&
      checkData.projectDescription !== '' &&
      checkData.projectContent !== '' &&
      checkData.goalAmount !== 0
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setFirstStep(false);
      handleSubmit(onSubmit)();
    } else if (
      firstStep ||
      checkData.projectName == '' ||
      checkData.projectDescription == '' ||
      checkData.projectContent == '' ||
      checkData.goalAmount == 0
    ) {
      handleSubmit(onSubmit)();
      setFirstStep(false);
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    let shouldIncrementStep = true;
    switch (activeStep) {
      case 0:
        if (!!errors.projectName || !!errors.projectDescription || errors.projectContent || !!errors.goalAmount) {
          shouldIncrementStep = false;
        }
        break;
      case 1:
        if (!!errors.projectPlans) {
          shouldIncrementStep = false;
        }
        break;
      case 2:
        if (!!errors.projectTeam) {
          shouldIncrementStep = false;
        }
        break;
      case 3:
        if (!!errors.withdrawSettings || !!errors.shippingSettings) {
          shouldIncrementStep = false;
        }
        break;
      default:
        break;
    }

    if (shouldIncrementStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep5 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setIsPreview(true);
  };

  const onSubmit: SubmitHandler<IProjectState> = useCallback(
    async (data) => {
      console.log(activeStep);
      if (isPreview && !proposalSuccess) {
        data.projectProposer = userData._id;

        console.log('final !! proposal form data : ', data);

        try {
          const res = await postProposal({ body: data }).unwrap();
          const postData = {
            ...res,
            status: res.status,
          };
          console.log('postData', postData);
          if (postData?.status == 'Success') {
            setProposalSuccess(true);
            setIsPreview(false);
          } else {
            setProposalSuccess(false);
            setIsPreview(false);
          }
        } catch (err) {
          setProposalSuccess(false);
          setIsPreview(false);
          console.log(err);
        }
      }
    },
    [userData._id, postProposal, isPreview],
  );

  useEffect(() => {
    if (projectPlansNum && projectPlansNum.length > 1 && !isPreview && !proposalSuccess) {
      setIsPreview(false);
      handleSubmit(onSubmit)();
    } else {
      return;
    }
  }, [projectPlansNum, proposalSuccess]);

  useEffect(() => {
    if (isPreview && !proposalSuccess) {
      handleSubmit(onSubmit)();
    }
  }, [isPreview, proposalSuccess, handleSubmit, onSubmit]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  return (
    <>
      <Seo templateTitle="提案表單" />
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
            {activeStep === 0 && (
              <ProposalStep1 getValues={getValues} setValue={setValue} errors={errors} control={control} />
            )}
            {activeStep === 1 && (
              <ProposalStep2
                getValues={getValues}
                setValue={setValue}
                errors={errors}
                control={control}
                fields={fields}
                append={append}
                remove={remove}
              />
            )}
            {activeStep === 2 && (
              <ProposalStep3 getValues={getValues} setValue={setValue} errors={errors} control={control} />
            )}
            {activeStep === 3 && (
              <ProposalStep4
                setValue={setValue}
                getValues={getValues}
                errors={errors}
                control={control}
                watch={watch}
              />
            )}
            {activeStep === 4 && (
              // <ProposalStep5 proposalForm={proposalForm} />
              <>
                <Typography className="text-primary my-5 md:mt-0 text-center" component="h3" variant="h6">
                  請確認您填寫好的提案資料
                </Typography>
                <div className="relative flex flex-col space-y-3">
                  <ProposalStep1
                    isPreview={true}
                    getValues={getValues}
                    setValue={setValue}
                    errors={errors}
                    control={control}
                  />
                  <ProposalStep2
                    isPreview={true}
                    getValues={getValues}
                    setValue={setValue}
                    errors={errors}
                    control={control}
                    fields={fields}
                    append={append}
                    remove={remove}
                  />
                  <ProposalStep3
                    isPreview={true}
                    getValues={getValues}
                    setValue={setValue}
                    errors={errors}
                    control={control}
                  />
                  <ProposalStep4
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                    control={control}
                    watch={watch}
                  />
                  <div className="w-full h-full bg-primary bg-opacity-20 rounded-md absolute -top-3 left-0"></div>
                </div>
              </>
            )}
            {activeStep === 5 && (
              <ProposalStep6
                setValue={setValue}
                proposalSuccess={proposalSuccess}
                postProposalLoading={postProposalLoading}
              />
            )}

            <div
              className={clsxm(
                activeStep === 5 && proposalSuccess && 'hidden',
                'w-full border-0 border-t border-solid border-secondary-10 md:px-5 md:py-4 fixed bottom-0 left-0 bg-white z-10',
              )}
            >
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
                  {activeStep !== steps.length - 1 && (
                    <LoadingButton
                      // loading={patchUserLoading}
                      type="submit"
                      variant="outlined"
                      color="secondary"
                      startIcon={<SaveIcon />}
                    >
                      {/* <span>{patchUserLoading ? '儲存中' : '儲存草稿'}</span> */}
                      <span>儲存草稿</span>
                    </LoadingButton>
                  )}

                  {activeStep === 0 && (
                    <Button onClick={handleStep1} variant="contained" startIcon={<RedoIcon />}>
                      {`下一步：${steps[activeStep + 1]}`}
                    </Button>
                  )}
                  {activeStep > 0 && activeStep < steps.length - 2 && (
                    <Button onClick={handleNext} variant="contained" startIcon={<RedoIcon />}>
                      {`下一步：${steps[activeStep + 1]}`}
                    </Button>
                  )}

                  {activeStep === steps.length - 2 && (
                    <Button onClick={handleStep5} type="button" variant="contained" startIcon={<CheckIcon />}>
                      送出提案
                    </Button>
                  )}
                </div>
              </div>

              <MobileStepper
                className={clsxm(activeStep === 5 && proposalSuccess && 'hidden', 'md:hidden')}
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
                  activeStep === 0 ? (
                    <Button size="small" onClick={handleStep1}>
                      下一步
                      <KeyboardArrowRight />
                    </Button>
                  ) : activeStep >= steps.length - 2 ? (
                    <Button
                      className={clsxm(activeStep === steps.length - 1 && 'invisible')}
                      size="small"
                      onClick={handleStep5}
                    >
                      送出提案
                      <KeyboardArrowRight />
                    </Button>
                  ) : (
                    <Button size="small" onClick={handleNext}>
                      下一步
                      <KeyboardArrowRight />
                    </Button>
                  )
                }
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
