import { useState } from 'react';
import { useUploadPhotoMutation } from '../../../store/services/uploadPhotoApi';
import { Button, Avatar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Image from 'next/image';
import clsxm from '@/libraries/utils/clsxm';

interface PhotoUploadProps {
  isProposal?: boolean;
  isPlan?: boolean;
  index?: number;
  originalName?: string;
  originalAvatar?: string;
  setImageUploaded?: React.Dispatch<React.SetStateAction<string>>;
  setImageUploadedList?: React.Dispatch<React.SetStateAction<string[]>>;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  isProposal,
  isPlan,
  index,
  originalName,
  originalAvatar,
  setImageUploaded,
  setImageUploadedList,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSaved, setImageSaved] = useState<boolean>(false);
  const [uploadPhoto, { isLoading: uploadPhotoLoading }] = useUploadPhotoMutation();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImageFile(file);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadPhoto(formData).unwrap();
      console.log(res.fileUrl);
      if (isPlan) {
        setImageUploadedList &&
          setImageUploadedList((prev) => {
            const newList = [...prev];
            index !== undefined && (newList[index] = res.fileUrl);
            return newList;
          });
      } else {
        setImageUploaded && setImageUploaded(res.fileUrl);
      }
      setImageSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isPlan && (
        <div className="w-full md:w-2/3 aspect-[2/1] rounded-md overflow-hidden mb-5">
          <Image
            className="w-full h-full object-cover"
            alt={originalName ?? 'unknown name'}
            width={400}
            height={200}
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : originalAvatar ??
                  'https://firebasestorage.googleapis.com/v0/b/mujibu.appspot.com/o/images%2Fdefault%2Fdefault_image.jpg?alt=media&token=eafe76e5-ea42-4eb2-9fb0-dde5b3fd7dd4'
            }
          />
        </div>
      )}

      {isPlan && imageFile && (
        <div className="flex space-x-2 w-full md:w-2/3">
          <Button
            className="w-1/2 bg-white"
            onClick={() => {
              setImageSaved(false);
              setImageFile(null);
            }}
            variant="outlined"
            component="label"
            startIcon={<CancelIcon />}
          >
            重選圖片
          </Button>
          <LoadingButton
            className="w-1/2 shadow-none"
            loading={uploadPhotoLoading}
            loadingPosition="start"
            onClick={() => imageFile && handleImageUpload(imageFile)}
            variant="contained"
            component="label"
            startIcon={<CheckCircleIcon />}
            disabled={imageSaved}
          >
            <span>{imageSaved ? '上傳完成' : '確認上傳'}</span>
          </LoadingButton>
        </div>
      )}
      {isPlan && !imageFile && (
        <div className="w-full md:w-2/3">
          <Button
            className="w-full bg-white"
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
          >
            請選擇上傳圖片
            <input type="file" hidden onChange={handleImageSelect} />
          </Button>
        </div>
      )}

      {isProposal && !isPlan && (
        <div className="w-full md:w-2/3 aspect-[4/3] rounded-md overflow-hidden mb-5">
          <Image
            className="w-full h-full object-cover"
            alt={originalName ?? 'unknown name'}
            width={400}
            height={300}
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : originalAvatar ??
                  'https://firebasestorage.googleapis.com/v0/b/mujibu.appspot.com/o/images%2Fdefault%2Fdefault_image.jpg?alt=media&token=eafe76e5-ea42-4eb2-9fb0-dde5b3fd7dd4'
            }
          />
        </div>
      )}

      {isProposal && !isPlan && imageFile && (
        <div className="flex space-x-2 w-full md:w-2/3">
          <Button
            className="w-1/2 bg-white"
            onClick={() => {
              setImageSaved(false);
              setImageFile(null);
            }}
            variant="outlined"
            component="label"
            startIcon={<CancelIcon />}
          >
            重選圖片
          </Button>
          <LoadingButton
            className="w-1/2 shadow-none"
            loading={uploadPhotoLoading}
            loadingPosition="start"
            onClick={() => imageFile && handleImageUpload(imageFile)}
            variant="contained"
            component="label"
            startIcon={<CheckCircleIcon />}
            disabled={imageSaved}
          >
            <span>{imageSaved ? '上傳完成' : '確認上傳'}</span>
          </LoadingButton>
        </div>
      )}
      {isProposal && !isPlan && !imageFile && (
        <div className="w-full md:w-2/3">
          <Button
            className="w-full bg-white"
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
          >
            請選擇上傳圖片
            <input type="file" hidden onChange={handleImageSelect} />
          </Button>
        </div>
      )}

      {!isProposal && !isPlan && (
        <Avatar
          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] mb-5"
          alt={originalName ?? 'unknown name'}
          src={imageFile ? URL.createObjectURL(imageFile) : originalAvatar ?? ''}
        ></Avatar>
      )}
      {!isProposal && !isPlan && imageFile && (
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              setImageSaved(false);
              setImageFile(null);
            }}
            variant="outlined"
            component="label"
            startIcon={<CancelIcon />}
          >
            重選圖片
          </Button>
          <LoadingButton
            loading={uploadPhotoLoading}
            loadingPosition="start"
            onClick={() => imageFile && handleImageUpload(imageFile)}
            variant="contained"
            component="label"
            startIcon={<CheckCircleIcon />}
            disabled={imageSaved}
          >
            <span>{imageSaved ? '上傳完成' : '確認上傳'}</span>
          </LoadingButton>
        </div>
      )}
      {!isProposal && !isPlan && !imageFile && (
        <Button className="mb-2" variant="outlined" component="label" startIcon={<AddPhotoAlternateIcon />}>
          請選擇上傳圖片
          <input type="file" hidden onChange={handleImageSelect} />
        </Button>
      )}
    </>
  );
};

export default PhotoUpload;
