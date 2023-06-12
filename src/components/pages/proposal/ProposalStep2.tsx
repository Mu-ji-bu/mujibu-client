import { useState, useEffect } from 'react';
import { Typography, FormLabel, Button, IconButton } from '@mui/material';
import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  InputText,
  InputTextMultiline,
  InputSelect,
  InputDatepicker,
  InputTextDeco,
  InputRadio,
  Editor,
} from '@/components/block/form';

const projectTypes = ['實體產品類', '虛擬計畫類'];
const categoryItems = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

interface ProposalStep2Props {
  setValue: any;
  errors: any;
  control: any;
}
const ProposalStep2: React.FC<ProposalStep2Props> = ({ control, errors, setValue }) => {
  const [imageUploaded, setImageUploaded] = useState<string>('');

  useEffect(() => {
    if (imageUploaded) {
      setValue('planImage', imageUploaded);
    }
  }, [imageUploaded, setValue]);

  return (
    <div className="text-center py-5 md:py-10 px-5 md:px-20  bg-white w-full rounded-md md:border md:border-solid md:border-secondary-10">
      <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
        質感好回饋
      </Typography>
      <Typography className="text-secondary-66 mb-5 md:mb-10 text-center" component="p" variant="caption">
        在這個區塊您將制定本次募資專案提供的回饋項目，回饋內容可以十分多元，但是必須清楚寫明回饋金額、募資內容、募資時間等必要資訊。並請
        <b> 至少填寫一種方案。</b>
      </Typography>

      <div className="relative mb-10 w-full p-5 md:p-10 border border-solid border-secondary-10 rounded-md bg-green-accent-10 bg-opacity-40">
        <div className="grid grid-cols-2 gap-3">
          <InputText
            control={control}
            error={!!errors.planName}
            helperText={errors.planName?.message}
            name={'planName'}
            label={'方案名稱 *'}
            defaultValue={''}
            placeholder={'20個字以內的方案名稱'}
            className="col-span-full"
          />

          <div className="col-span-full flex flex-col mb-3">
            <FormLabel className="mb-3">
              方案圖片 *{' '}
              <span className="text-primary text-sm">
                請提供 JPEG或PNG 檔，圖片尺寸至少 650 x 145 px (9:2)； 2MB 以內
              </span>
            </FormLabel>
            <div className="flex flex-col items-center p-5 justify-center bg-gray-light rounded-md">
              <PhotoUpload isProposal={true} setImageUploaded={setImageUploaded} />
            </div>
          </div>

          <InputText
            control={control}
            error={!!errors.planName}
            helperText={errors.planName?.message}
            name={'planName'}
            label={'方案類型 *'}
            defaultValue={''}
            placeholder={'8個字以內的方案類型'}
          />

          <InputText
            control={control}
            error={!!errors.planQuantity}
            helperText={errors.planQuantity?.message}
            name={'planQuantity'}
            label={'方案數量 *'}
            defaultValue={0}
          />

          <InputTextDeco
            control={control}
            error={!!errors.planDiscountPrice}
            helperText={errors.planDiscountPrice?.message}
            name={'planDiscountPrice'}
            label={'方案金額 *'}
            deco={'NT$'}
            defaultValue={0}
          />

          <InputTextDeco
            control={control}
            error={!!errors.planOriginalPrice}
            helperText={errors.planOriginalPrice?.message}
            name={'planOriginalPrice'}
            label={'未來售價 *'}
            deco={'NT$'}
            defaultValue={0}
          />

          <InputDatepicker
            control={control}
            error={!!errors.planStartTime}
            helperText={errors.planStartTime?.message}
            name={'planStartTime'}
            label={'方案開始時間 *'}
            disablePast={true}
          />

          <InputDatepicker
            control={control}
            error={!!errors.planEndTime}
            helperText={errors.planEndTime?.message}
            name={'planEndTime'}
            label={'方案結束時間 *'}
            disablePast={true}
          />

          <InputTextMultiline
            control={control}
            error={!!errors.planDescription}
            helperText={errors.planDescription?.message}
            name={'planDescription'}
            label={'方案描述 *'}
            defaultValue={''}
            rows={3}
            placeholder={'30個字以內的方案介紹'}
            className="col-span-full"
          />
          <div className="col-span-full flex justify-between items-center">
            <FormLabel>
              其他備註 <span className="text-primary text-sm ml-2">* 畫面為條列式呈現，最多建立三條</span>
            </FormLabel>
            <IconButton aria-label="add" size="medium">
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="col-span-full flex justify-between items-center space-x-2 relative">
            <InputText
              control={control}
              error={!!errors.planNotes}
              helperText={errors.planNotes?.message}
              name={'planNotes'}
              placeholder={'ex: 內容物：筆記電腦本體x1，充電器x1'}
              label={'備註 1'}
              defaultValue={''}
              className="col-span-full"
            />
            <IconButton aria-label="add" size="medium" className="absolute right-0">
              <CancelIcon />
            </IconButton>
          </div>

          <div className="col-span-full flex justify-between items-center space-x-2 relative">
            <InputText
              control={control}
              error={!!errors.planNotes}
              helperText={errors.planNotes?.message}
              name={'planNotes'}
              placeholder={'ex: 內容物：筆記電腦本體x1，充電器x1'}
              label={'備註 2'}
              defaultValue={''}
              className="col-span-full"
            />
            <IconButton aria-label="add" size="medium" className="absolute right-0">
              <CancelIcon />
            </IconButton>
          </div>
        </div>
        <IconButton aria-label="add" className="absolute -right-6 -top-6">
          <CancelIcon sx={{ fontSize: 32 }} color="primary" />
        </IconButton>
      </div>

      <Button className="text-center" variant="outlined" startIcon={<AddCircleOutlineIcon />}>
        新增方案
      </Button>
    </div>
  );
};

export default ProposalStep2;
