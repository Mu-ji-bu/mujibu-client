import { useState } from 'react';
import { useUploadPhotoMutation } from '../../../store/services/uploadPhotoApi';
import { Button, Avatar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface PhotoUploadProps {
  originalName: string;
  originalAvatar: string;
  setImageUploaded: React.Dispatch<React.SetStateAction<string>>;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ originalName, originalAvatar, setImageUploaded }) => {
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
      setImageUploaded(res.fileUrl);
      setImageSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Avatar
        className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] mb-5"
        alt={originalName ?? 'unknown name'}
        src={imageFile ? URL.createObjectURL(imageFile) : originalAvatar ?? ''}
      ></Avatar>
      {imageFile ? (
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
          >
            <span>{imageSaved ? '上傳完成' : '確認上傳'}</span>
          </LoadingButton>
        </div>
      ) : (
        <Button className="mb-2" variant="outlined" component="label" startIcon={<AddPhotoAlternateIcon />}>
          請選擇上傳圖片
          <input type="file" hidden onChange={handleImageSelect} />
        </Button>
      )}
    </>
  );
};

export default PhotoUpload;