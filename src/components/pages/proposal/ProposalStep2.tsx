import { useEffect, useState, useMemo, ReactNode } from 'react';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import clsxm from '@/libraries/utils/clsxm';
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
  Radio,
  RadioGroup,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import PhotoUpload from '@/components/block/photoUpload/PhotoUpload';

const categoryOptions = ['藝術', '設計', '電影', '音樂', '科技', '出版'];

interface ProposalStep2Props {
  setValue: any;
  control: any;
}
const ProposalStep2: React.FC<ProposalStep2Props> = ({ setValue, control }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [patchUser, { isLoading: patchUserLoading }] = usePatchUserMutation();

  const userData = useAppSelector(selectUser);

  const [imageUploaded, setImageUploaded] = useState<string>('');

  useEffect(() => {
    dispatch(setUserTabsPage(0));
  }, [dispatch]);

  return (
    <div className="py-5 md:py-10 px-5 md:px-20  bg-white w-full rounded-md md:border md:border-solid md:border-secondary-10">
      <Typography className="text-secondary mb-2 text-center" component="h3" variant="h6">
        質感好回饋
      </Typography>
      <Typography className="text-secondary-66 mb-5 md:mb-10 text-center" component="p" variant="caption">
        在這個區塊您將制定本次募資專案提供的回饋項目，回饋內容可以十分多元，但是必須清楚寫明回饋金額、內容說明、運費及寄送時間等必要資訊。
      </Typography>

      <div className="mb-10 w-full">
        <div className="grid grid-cols-2 gap-3">
          <Controller
            control={control}
            name="planName"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                className="col-span-full"
                id="planName"
                label="方案名稱 *"
                autoComplete="方案名稱"
                size="small"
                name="planName"
                placeholder="25 個字以內的方案名稱"
                value={value}
                onChange={onChange}
                // error={!!errors.planName}
                // helperText={errors.planName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="projectDescription"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                multiline
                rows={3}
                className="col-span-full"
                id="projectDescription"
                label="專案介紹 *"
                autoComplete="專案介紹"
                size="small"
                name="projectDescription"
                placeholder="50個字以內的專案介紹"
                value={value}
                onChange={onChange}
                // error={!!errors.projectDescription}
                // helperText={errors.projectDescription?.message}
              />
            )}
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

          <Controller
            control={control}
            name="goalAmount"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <FormControl className="col-span-full flex flex-row items-center justify-start space-x-2">
                <FormLabel>專案形式 *</FormLabel>
                <RadioGroup row name="projectType" value={value} onChange={onChange} aria-labelledby="projectType">
                  <FormControlLabel
                    className="mr-2 md:mr-5"
                    value="實體產品類"
                    control={<Radio />}
                    label="實體產品類"
                  />
                  <FormControlLabel className="mr-0" value="虛擬計畫類" control={<Radio />} label="虛擬計畫類" />
                </RadioGroup>
              </FormControl>
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                id="category"
                label="專案類型 *"
                autoComplete="category"
                size="small"
                // error={!!errors.category}
                // helperText={errors.category?.message}
                select
                value={value}
                onChange={onChange}
              >
                <MenuItem value="" disabled>
                  請選擇
                </MenuItem>

                {categoryOptions.map((category, i) => (
                  <MenuItem key={category} value={i}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="goalAmount"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <InputLabel htmlFor="goalAmount">目標金額 *</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="goalAmount"
                  size="small"
                  startAdornment={<InputAdornment position="start">NT$</InputAdornment>}
                  label="目標金額 *"
                  value={value}
                  onChange={onChange}
                  // error={!!errors.goalAmount}
                  // helperText={errors.goalAmount?.message}
                />
              </FormControl>
            )}
          />

          <Controller
            name="startTime"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                className="w-full"
                label="開始時間 *"
                disablePast
                value={dayjs(value)}
                onChange={(newValue) => onChange(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    // error: !!error,
                    // helperText: error?.message,
                  },
                }}
              />
            )}
          />

          <Controller
            name="endTime"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                className="w-full"
                label="結束時間 *"
                disablePast
                value={dayjs(value)}
                onChange={(newValue) => onChange(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    // error: !!error,
                    // helperText: error?.message,
                  },
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="officialPage"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                className="col-span-full"
                fullWidth
                id="officialPage"
                label="品牌、組織或專案官方網站"
                autoComplete="officialPage"
                size="small"
                value={value}
                onChange={onChange}
                // error={!!errors.officialPage}
                // helperText={errors.officialPage?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="fanPage"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                className="col-span-full"
                fullWidth
                id="fanPage"
                label="品牌、組織或專案粉絲專頁"
                autoComplete="fanPage"
                size="small"
                value={value}
                onChange={onChange}
                // error={!!errors.fanPage}
                // helperText={errors.fanPage?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="attachmentLink"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                className="col-span-full"
                fullWidth
                id="attachmentLink"
                label="附件連結"
                autoComplete="attachmentLink"
                size="small"
                value={value}
                onChange={onChange}
                // error={!!errors.attachmentLink}
                // helperText={errors.attachmentLink?.message}
              />
            )}
          />
          <span className="text-primary text-sm col-span-full">
            * 專案企劃書、簡報或任何可以補充說明專案內容之文件（請確認雲端連結權限已開啟）。
          </span>

          <FormLabel className="mb-3 col-span-full">
            專案內文編輯器 * <span className="text-primary text-sm">請提供至少一張介紹圖、200字以上的介紹</span>
          </FormLabel>

          <div className="col-span-full h-40 border border-solid border-secondary-10">編輯器位置</div>
        </div>
      </div>
    </div>
  );
};

export default ProposalStep2;
