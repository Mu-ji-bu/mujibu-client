import { useState, useEffect, Key } from 'react';
import dayjs from 'dayjs';
import { Typography, FormLabel, Button, IconButton, CardMedia } from '@mui/material';
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
import { useFieldArray } from 'react-hook-form';

interface ProposalStep2Props {
  setValue?: any;
  getValues?: any;
  errors?: any;
  control?: any;
  fields?: any;
  append?: any;
  remove?: any;
  nestIndex?: any;
  isPreview?: boolean;
}

const OtherNotes: React.FC<ProposalStep2Props> = ({ nestIndex, control }) => {
  const {
    fields: otherFields,
    append: otherAppend,
    remove: otherRemove,
  } = useFieldArray({
    control,
    name: `projectPlans.${nestIndex}.otherNotes`,
  });

  return (
    <>
      <div className="col-span-full flex justify-between items-center">
        <FormLabel>
          其他備註(非必填) <span className="text-primary text-sm ml-2">* 畫面為條列式呈現，最多三條</span>
        </FormLabel>
        {otherFields.length < 3 && (
          <IconButton onClick={() => otherAppend('')} aria-label="add" size="medium">
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </div>
      {otherFields &&
        otherFields.map((note, noteIndex) => (
          <div key={noteIndex} className="col-span-full flex justify-between items-center space-x-2 relative">
            <InputText
              control={control}
              // error={!!errors.otherNotes?.[index]?.[noteIndex]}
              // helperText={errors.otherNotes?.[index]?.[noteIndex]?.message}
              name={`projectPlans.${nestIndex}.otherNotes.${noteIndex}`}
              label={`備註 ${noteIndex + 1}`}
              placeholder={'ex: 內容物：筆記電腦本體x1，充電器x1'}
              className="col-span-full"
            />
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => otherRemove(noteIndex)}
              className="absolute right-0"
            >
              <CancelIcon />
            </IconButton>
          </div>
        ))}
    </>
  );
};
const ProposalStep2: React.FC<ProposalStep2Props> = ({
  control,
  errors,
  setValue,
  isPreview,
  getValues,
  fields,
  append,
  remove,
}) => {
  const [imageUploadedList, setImageUploadedList] = useState<string[]>([]);

  useEffect(() => {
    if (imageUploadedList.length !== 0) {
      // console.log(imageUploadedList);
      imageUploadedList.forEach((imageUploaded, index) => {
        if (imageUploaded) {
          setValue(`projectPlans.${index}.planImage`, imageUploaded);
        }
      });
    }
  }, [imageUploadedList, setValue]);

  return (
    <div className="text-center py-5 md:py-10 px-5 md:px-20  bg-white w-full rounded-md md:border md:border-solid md:border-secondary-10">
      <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
        質感好回饋
      </Typography>
      <Typography className="text-secondary-66 mb-5 md:mb-10 text-center" component="p" variant="caption">
        在這個區塊您將制定本次募資專案提供的回饋項目，回饋內容可以十分多元，但是必須清楚寫明回饋金額、募資內容、募資時間等必要資訊。並請
        <b> 至少填寫一種方案。</b>
      </Typography>
      {fields.map(
        (
          field: {
            [x: string]: any;
            id: Key | null | undefined;
          },
          index: any,
        ) => (
          <div key={field.id}>
            <div className="relative mb-10 w-full p-5 md:p-10 border border-solid border-secondary-10 rounded-md bg-green-accent-10 bg-opacity-40">
              <div className="grid grid-cols-2 gap-3">
                <InputText
                  control={control}
                  error={!!errors.projectPlans?.[index]?.planName}
                  helperText={errors.projectPlans?.[index]?.planName?.message}
                  name={`projectPlans.${index}.planName`}
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
                  {isPreview ? (
                    <div className="aspect-[9/2] w-full md:w-1/2 mx-auto overflow-hidden">
                      <CardMedia
                        className="w-full h-full hover:scale-105 transition-all"
                        component="img"
                        image={
                          getValues(`projectPlans.${index}.planImage`) ||
                          'https://firebasestorage.googleapis.com/v0/b/mujibu.appspot.com/o/images%2Fdefault%2Fdefault_image.jpg?alt=media&token=eafe76e5-ea42-4eb2-9fb0-dde5b3fd7dd4'
                        }
                        alt="preview"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-5 justify-center bg-gray-light rounded-md">
                      <PhotoUpload isPlan={true} index={index} setImageUploadedList={setImageUploadedList} />
                    </div>
                  )}
                </div>

                <InputText
                  control={control}
                  error={!!errors.projectPlans?.[index]?.planType}
                  helperText={errors.projectPlans?.[index]?.planType?.message}
                  name={`projectPlans.${index}.planType`}
                  label={'方案類型 *'}
                  defaultValue={''}
                  placeholder={'8個字以內的方案類型'}
                />

                <InputText
                  control={control}
                  error={!!errors.projectPlans?.[index]?.planQuantity}
                  helperText={errors.projectPlans?.[index]?.planQuantity?.message}
                  name={`projectPlans.${index}.planQuantity`}
                  label={'方案數量 *'}
                  type={'number'}
                  defaultValue={0}
                />

                <InputTextDeco
                  control={control}
                  error={!!errors.projectPlans?.[index]?.planDiscountPrice}
                  helperText={errors.projectPlans?.[index]?.planDiscountPrice?.message}
                  name={`projectPlans.${index}.planDiscountPrice`}
                  label={'方案金額 *'}
                  deco={'NT$'}
                  defaultValue={0}
                />

                <InputTextDeco
                  control={control}
                  error={!!errors.projectPlans?.[index]?.planOriginalPrice}
                  helperText={errors.projectPlans?.[index]?.planOriginalPrice?.message}
                  name={`projectPlans.${index}.planOriginalPrice`}
                  label={'未來售價 *'}
                  deco={'NT$'}
                  defaultValue={0}
                />

                <InputDatepicker
                  control={control}
                  error={!!errors.projectPlans?.[index]?.planStartTime}
                  helperText={errors.projectPlans?.[index]?.planStartTime?.message}
                  name={`projectPlans.${index}.planStartTime`}
                  label={'方案開始時間 *'}
                  disablePast={true}
                />

                <InputDatepicker
                  control={control}
                  error={!!errors.projectPlans?.[index]?.planEndTime}
                  helperText={errors.projectPlans?.[index]?.planEndTime?.message}
                  name={`projectPlans.${index}.planEndTime`}
                  label={'方案結束時間 *'}
                  disablePast={true}
                />

                <InputTextMultiline
                  control={control}
                  error={!!errors.projectPlans?.[index]?.planDescription}
                  helperText={errors.projectPlans?.[index]?.planDescription?.message}
                  name={`projectPlans.${index}.planDescription`}
                  label={'方案描述 *'}
                  defaultValue={''}
                  rows={3}
                  placeholder={'30個字以內的方案介紹'}
                  className="col-span-full"
                />

                <OtherNotes nestIndex={index} control={control} />
              </div>

              {index !== 0 && (
                <IconButton onClick={() => remove(index)} aria-label="add" className="absolute -right-6 -top-6">
                  <CancelIcon sx={{ fontSize: 32 }} color="primary" />
                </IconButton>
              )}
            </div>
          </div>
        ),
      )}

      <Button
        onClick={() =>
          append({
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
          })
        }
        className="text-center"
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
      >
        新增方案
      </Button>
    </div>
  );
};

export default ProposalStep2;
