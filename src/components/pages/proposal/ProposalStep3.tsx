import { useState, useEffect, ChangeEvent } from 'react';
import { Typography, Avatar } from '@mui/material';
import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';
import { InputText, InputTextMultiline, InputCheckbox } from '@/components/block/form';
import Link from 'next/link';
import routePath from '@/routes/routePath';

const projectTypes = ['實體產品類', '虛擬計畫類'];
const teamItems = ['新增團隊', '團隊名稱一', '團隊名稱二', '團隊名稱三'];

interface ProposalStep3Props {
  setValue?: any;
  getValues?: any;
  errors?: any;
  control?: any;
  isPreview?: boolean;
}
const ProposalStep3: React.FC<ProposalStep3Props> = ({ control, errors, setValue, getValues, isPreview }) => {
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
        {isPreview ? (
          <div className="w-full md:w-1/2 shrink-0 flex flex-col items-center mb-5 md:mb-0">
            <Avatar
              className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] mb-5"
              alt="preview"
              src={
                getValues('projectTeam.teamAvatar') ||
                'https://firebasestorage.googleapis.com/v0/b/mujibu.appspot.com/o/images%2Fdefault%2Fdefault_image.jpg?alt=media&token=eafe76e5-ea42-4eb2-9fb0-dde5b3fd7dd4'
              }
            ></Avatar>
          </div>
        ) : (
          <div className="w-full md:w-1/2 shrink-0 flex flex-col items-center mb-5 md:mb-0">
            <PhotoUpload isProposal={false} originalName={''} originalAvatar={''} setImageUploaded={setImageUploaded} />
          </div>
        )}

        <div className="w-full md:w-1/2 flex flex-col space-y-3 items-center justify-center">
          {/* <InputSelect
            control={control}
            // error={!!errors.projectTeam.teamName}
            // helperText={errors.projectTeam.teamName?.message}
            name={''}
            label={'選擇團隊 *'}
            items={teamItems}
            isNumber={true}
          /> */}

          <InputText
            control={control}
            error={!!errors.projectTeam?.teamName}
            helperText={errors.projectTeam?.teamName?.message}
            name={'projectTeam.teamName'}
            label={'團隊名稱 *'}
            defaultValue={''}
            className="col-span-full"
          />

          <InputTextMultiline
            control={control}
            error={!!errors.projectTeam?.teamIntroduction}
            helperText={errors.projectTeam?.teamIntroduction?.message}
            name={'projectTeam.teamIntroduction'}
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
          error={!!errors.projectTeam?.representativeName}
          helperText={errors.projectTeam?.representativeName?.message}
          name={'projectTeam.representativeName'}
          label={'代表人姓名 *'}
          defaultValue={''}
          className="col-span-full"
        />

        {/* <FormControlLabel
            className="text-secondary"
            control={<Checkbox checked={status.isTaiwan} onChange={handleStatusChange('isTaiwan')} />}
            name="isTaiwan"
            label="具有台灣國籍"
          />
          <FormControlLabel
            className="text-secondary"
            control={<Checkbox checked={status.isOver18} onChange={handleStatusChange('isOver18')} />}
            name="isOver18"
            label="法定年齡超過18歲"
          /> */}
        <div>
          <InputCheckbox
            control={control}
            error={!!errors.projectTeam?.isTaiwan}
            helperText={errors.projectTeam?.isTaiwan?.message}
            name={'projectTeam.isTaiwan'}
            label={'具有台灣國籍'}
            defaultValue={false}
            className="text-secondary"
          />
        </div>
        <div>
          <InputCheckbox
            control={control}
            error={!!errors.projectTeam?.isOver18}
            helperText={errors.projectTeam?.isOver18?.message}
            name={'projectTeam.isOver18'}
            label={'法定年齡超過18歲'}
            defaultValue={false}
            className="text-secondary"
          />
        </div>

        <InputText
          control={control}
          error={!!errors.projectTeam?.representativeMobile}
          helperText={errors.projectTeam?.representativeMobile?.message}
          name={'projectTeam.representativeMobile'}
          label={'手機號碼 *'}
          defaultValue={''}
        />

        <InputText
          control={control}
          error={!!errors.projectTeam?.representativePhone}
          helperText={errors.projectTeam?.representativePhone?.message}
          name={'projectTeam.representativePhone'}
          label={'市內電話'}
          defaultValue={''}
        />

        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.projectTeam?.representativeEmail}
          helperText={errors.projectTeam?.representativeEmail?.message}
          name={'projectTeam.representativeEmail'}
          label={'代表人Email *'}
          defaultValue={''}
        />

        <div className="col-span-full flex">
          {/* <FormControlLabel
            className="text-secondary mr-1"
            control={<Checkbox checked={status.isAgreeTerms} onChange={handleStatusChange('isAgreeTerms')} />}
            name="isAgreeTerms"
            label="已閱讀並同意"
          /> */}

          <div>
            <InputCheckbox
              control={control}
              error={!!errors.projectTeam?.isAgreeTerms}
              helperText={errors.projectTeam?.isAgreeTerms?.message}
              name={'projectTeam.isAgreeTerms'}
              label={'已閱讀並同意'}
              defaultValue={false}
              className="text-secondary mr-1"
            />
          </div>
          <Link
            className="text-primary no-underline hover:text-secondary visited:text-primary mt-[9px]"
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
          error={!!errors.projectTeam?.companyName}
          helperText={errors.projectTeam?.companyName?.message}
          name={'projectTeam.companyName'}
          label={'公司登記名稱'}
          defaultValue={''}
          className="col-span-full"
        />

        <InputText
          control={control}
          error={!!errors.projectTeam?.companyPhone}
          helperText={errors.projectTeam?.companyPhone?.message}
          name={'projectTeam.companyPhone'}
          label={'公司電話'}
          defaultValue={''}
        />

        <InputText
          control={control}
          error={!!errors.projectTeam?.companyRegistrationNumber}
          helperText={errors.projectTeam?.companyRegistrationNumber?.message}
          name={'projectTeam.companyRegistrationNumber'}
          label={'統一編號'}
          defaultValue={''}
        />

        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.projectTeam?.companyAddress}
          helperText={errors.projectTeam?.companyAddress?.message}
          name={'projectTeam.companyAddress'}
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
          error={!!errors.projectTeam?.socialWebsite}
          helperText={errors.projectTeam?.socialWebsite?.message}
          name={'projectTeam.socialWebsite'}
          label={'官方網站'}
          defaultValue={''}
          className="col-span-full"
        />
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.projectTeam?.socialEmail}
          helperText={errors.projectTeam?.socialEmail?.message}
          name={'projectTeam.socialEmail'}
          label={'客服Email'}
          defaultValue={''}
        />
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.projectTeam?.socialFb}
          helperText={errors.projectTeam?.socialFb?.message}
          name={'projectTeam.socialFb'}
          label={'Facebook'}
          defaultValue={''}
        />{' '}
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.projectTeam?.socialLine}
          helperText={errors.projectTeam?.socialLine?.message}
          name={'projectTeam.socialLine'}
          label={'Line ID'}
          defaultValue={''}
        />{' '}
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.projectTeam?.socialIg}
          helperText={errors.projectTeam?.socialIg?.message}
          name={'projectTeam.socialIg'}
          label={'Instagram'}
          defaultValue={''}
        />
        <InputText
          className="col-span-full"
          control={control}
          error={!!errors.projectTeam?.socialYoutube}
          helperText={errors.projectTeam?.socialYoutube?.message}
          name={'projectTeam.socialYoutube'}
          label={'Youtube'}
          defaultValue={''}
        />
      </div>
    </div>
  );
};

export default ProposalStep3;
