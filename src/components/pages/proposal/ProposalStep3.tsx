import { useState, useEffect } from 'react';
import { Typography, FormLabel } from '@mui/material';
import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';
import {
  InputText,
  InputTextMultiline,
  InputSelect,
  InputDatepicker,
  InputTextDeco,
  InputRadio,
  Editor,
  InputCheckbox,
} from '@/components/block/form';
import clsxm from '@/libraries/utils/clsxm';
import Link from 'next/link';
import routePath from '@/routes/routePath';

const projectTypes = ['實體產品類', '虛擬計畫類'];
const teamItems = ['新增團隊', '團隊名稱一', '團隊名稱二', '團隊名稱三'];

interface ProposalStep3Props {
  setValue: any;
  errors: any;
  control: any;
}
const ProposalStep3: React.FC<ProposalStep3Props> = ({ control, errors, setValue }) => {
  const [imageUploaded, setImageUploaded] = useState<string>('');

  useEffect(() => {
    if (imageUploaded) {
      setValue('projectTeam.teamAvatar', imageUploaded);
    }
  }, [imageUploaded, setValue]);

  return (
    <div className="py-5 md:py-10 px-5 md:px-20  bg-white w-full rounded-md md:border md:border-solid md:border-secondary-10">
      <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
        團隊基本資料
      </Typography>
      <Typography className="text-secondary-66 mb-5 md:mb-10 text-center" component="p" variant="caption">
        介紹一下你的團隊，將帶給大家怎樣的質感生活。
      </Typography>

      <div className="flex md:flex-row flex-col md:space-x-3 mb-10">
        <div className="w-full md:w-1/2 shrink-0 flex flex-col items-center mb-5 md:mb-0">
          <PhotoUpload isProposal={false} originalName={''} originalAvatar={''} setImageUploaded={setImageUploaded} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col space-y-3">
          <InputSelect
            control={control}
            // error={!!errors.projectTeam.teamName}
            // helperText={errors.projectTeam.teamName?.message}
            name={''}
            label={'選擇團隊 *'}
            items={teamItems}
            isNumber={true}
          />

          <InputText
            control={control}
            error={!!errors.teamName}
            helperText={errors.teamName?.message}
            name={'teamName'}
            label={'團隊名稱 *'}
            defaultValue={''}
            className="col-span-full"
          />

          <InputTextMultiline
            control={control}
            error={!!errors.teamDescription}
            helperText={errors.teamDescription?.message}
            name={'teamDescription'}
            label={'團隊介紹 *'}
            defaultValue={''}
            rows={6}
            placeholder={'50個字以內的專案介紹'}
            className="col-span-full"
          />
        </div>
      </div>

      <Typography className="text-secondary mb-5 text-center" component="h3" variant="h6">
        代表人資料
      </Typography>
      <div className="grid grid-cols-2 gap-3 mb-10">
        <InputText
          control={control}
          error={!!errors.representativeName}
          helperText={errors.representativeName?.message}
          name={'representativeName'}
          label={'代表人姓名 *'}
          defaultValue={''}
          className="col-span-full"
        />

        <div className="col-span-full">
          <InputCheckbox
            control={control}
            name={'isTaiwan'}
            label={'具有台灣國籍'}
            defaultValue={false}
            className="text-secondary"
          />
          <InputCheckbox
            control={control}
            name={'isOver18'}
            label={'法定年齡超過18歲'}
            defaultValue={false}
            className="text-secondary"
          />
        </div>

        <InputText
          control={control}
          error={!!errors.representativeMobile}
          helperText={errors.representativeMobile?.message}
          name={'representativeMobile'}
          label={'手機號碼 *'}
          defaultValue={''}
        />

        <InputText
          control={control}
          error={!!errors.representativePhone}
          helperText={errors.representativePhone?.message}
          name={'representativePhone'}
          label={'市內電話 *'}
          defaultValue={''}
        />

        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.representativeEmail}
          helperText={errors.representativeEmail?.message}
          name={'representativeEmail'}
          label={'代表人Email *'}
          defaultValue={''}
        />

        <div className="col-span-full flex items-center">
          <InputCheckbox
            control={control}
            name={'isAgreeTerms'}
            label={'已閱讀並同意'}
            defaultValue={false}
            className="text-secondary mr-1"
          />
          <Link
            className="text-primary no-underline hover:text-secondary visited:text-primary"
            href={routePath.userTerms}
          >
            <Typography component="p" variant="body16">
              使用者資訊條款
            </Typography>
          </Link>
        </div>
      </div>

      <Typography className="text-secondary mb-5 text-center" component="h3" variant="h6">
        公司資料(非必填)
      </Typography>
      <div className="grid grid-cols-2 gap-3 mb-10">
        <InputText
          control={control}
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          name={'companyName'}
          label={'公司登記名稱'}
          defaultValue={''}
          className="col-span-full"
        />

        <InputText
          control={control}
          error={!!errors.companyPhone}
          helperText={errors.companyPhone?.message}
          name={'companyPhone'}
          label={'公司電話'}
          defaultValue={''}
        />

        <InputText
          control={control}
          error={!!errors.companyRegistrationNumber}
          helperText={errors.companyRegistrationNumber?.message}
          name={'companyRegistrationNumber'}
          label={'統一編號'}
          defaultValue={''}
        />

        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.companyAddress}
          helperText={errors.companyAddress?.message}
          name={'companyAddress'}
          label={'公司所在地'}
          defaultValue={''}
        />
      </div>

      <Typography className="text-secondary mb-5 text-center" component="h3" variant="h6">
        社群資料(非必填)
      </Typography>
      <div className="grid grid-cols-2 gap-3 mb-10">
        <InputText
          control={control}
          error={!!errors.socialWebsite}
          helperText={errors.socialWebsite?.message}
          name={'socialWebsite'}
          label={'官方網站'}
          defaultValue={''}
          className="col-span-full"
        />
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.socialEmail}
          helperText={errors.socialEmail?.message}
          name={'socialEmail'}
          label={'客服Email'}
          defaultValue={''}
        />
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.socialFb}
          helperText={errors.socialFb?.message}
          name={'socialFb'}
          label={'Facebook'}
          defaultValue={''}
        />{' '}
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.socialLine}
          helperText={errors.socialLine?.message}
          name={'socialLine'}
          label={'Line ID'}
          defaultValue={''}
        />{' '}
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.socialIg}
          helperText={errors.socialIg?.message}
          name={'socialIg'}
          label={'Instagram'}
          defaultValue={''}
        />
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.socialYoutube}
          helperText={errors.socialYoutube?.message}
          name={'socialYoutube'}
          label={'Youtube'}
          defaultValue={''}
        />
      </div>
    </div>
  );
};

export default ProposalStep3;
