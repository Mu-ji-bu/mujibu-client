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
} from '@/components/block/form';

const projectTypes = ['實體產品類', '虛擬計畫類'];
const categoryItems = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

interface ProposalStep1Props {
  setValue: any;
  errors: any;
  control: any;
}
const ProposalStep1: React.FC<ProposalStep1Props> = ({ control, errors, setValue }) => {
  const [imageUploaded, setImageUploaded] = useState<string>('');

  useEffect(() => {
    if (imageUploaded) {
      setValue('avatar', imageUploaded);
    }
  }, [imageUploaded, setValue]);

  return (
    <div className="py-5 md:py-10 px-5 md:px-20  bg-white w-full rounded-md md:border md:border-solid md:border-secondary-10">
      <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
        基本資料
      </Typography>
      <Typography className="text-secondary-66 mb-5 md:mb-10 text-center" component="p" variant="caption">
        打造良好的第一印象，介紹一下你的提案吧!
      </Typography>

      <div className="mb-10 w-full">
        <div className="grid grid-cols-2 gap-3">
          <InputRadio
            control={control}
            error={!!errors.projectType}
            helperText={errors.projectType?.message}
            name={'projectType'}
            label={'專案形式 *'}
            defaultValue={0}
            items={projectTypes}
            classNameForm={'col-span-full flex flex-row flex-wrap items-center justify-start space-x-2'}
            classNameRadio={'mr-2 md:mr-5'}
          />

          <InputText
            control={control}
            error={!!errors.projectName}
            helperText={errors.projectName?.message}
            name={'projectName'}
            label={'專案標題 *'}
            defaultValue={''}
            placeholder={'40個字以內的專案標題'}
            className="col-span-full"
          />

          <InputTextMultiline
            control={control}
            error={!!errors.projectDescription}
            helperText={errors.projectDescription?.message}
            name={'projectDescription'}
            label={'專案介紹 *'}
            defaultValue={''}
            rows={3}
            placeholder={'50個字以內的專案介紹'}
            className="col-span-full"
          />

          <div className="col-span-full flex flex-col mb-3">
            <FormLabel className="mb-3">
              專案封面 *{' '}
              <span className="text-primary text-sm">
                請提供 JPEG或PNG 檔，圖片尺寸至少 1024 x 768 px (4:3)； 2MB 以內
              </span>
            </FormLabel>
            <div className="flex flex-col items-center p-5 justify-center bg-gray-light rounded-md">
              <PhotoUpload isProposal={true} setImageUploaded={setImageUploaded} />
            </div>
          </div>

          <InputSelect
            control={control}
            error={!!errors.projectCategory}
            helperText={errors.projectCategory?.message}
            name={'projectCategory'}
            label={'專案類型 *'}
            items={categoryItems}
            isNumber={true}
          />

          <InputTextDeco
            control={control}
            error={!!errors.goalAmount}
            helperText={errors.goalAmount?.message}
            name={'goalAmount'}
            label={'目標金額 *'}
            deco={'NT$'}
            defaultValue={''}
          />

          <InputDatepicker
            control={control}
            error={!!errors.startTime}
            helperText={errors.startTime?.message}
            name={'startTime'}
            label={'開始時間 *'}
            disablePast={true}
          />

          <InputDatepicker
            control={control}
            error={!!errors.endTime}
            helperText={errors.endTime?.message}
            name={'endTime'}
            label={'結束時間 *'}
            disablePast={true}
          />

          <InputText
            control={control}
            error={!!errors.officialPage}
            helperText={errors.officialPage?.message}
            name={'officialPage'}
            label={'品牌、組織或專案官方網站'}
            defaultValue={''}
            className="col-span-full"
          />

          <InputText
            control={control}
            error={!!errors.fanPage}
            helperText={errors.fanPage?.message}
            name={'fanPage'}
            label={'品牌、組織或專案粉絲專頁'}
            defaultValue={''}
            className="col-span-full"
          />

          <InputText
            control={control}
            error={!!errors.attachmentLink}
            helperText={errors.attachmentLink?.message}
            name={'attachmentLink'}
            label={'附件連結'}
            defaultValue={''}
            className="col-span-full"
          />
          <span className="text-primary text-sm col-span-full">
            * 專案企劃書、簡報或任何可以補充說明專案內容之文件（請確認雲端連結權限已開啟）。
          </span>

          <FormLabel className="mb-3 col-span-full">
            專案內文編輯器 * <span className="text-primary text-sm">請提供至少一張介紹圖、200字以上的介紹</span>
          </FormLabel>

          <div className="editor-container col-span-full">
            <Editor control={control} name={'projectContent'} placeholder={'請提供至少一張介紹圖、200字以上的介紹'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalStep1;
