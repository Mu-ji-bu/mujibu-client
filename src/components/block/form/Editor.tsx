import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import clsxm from '@/libraries/utils/clsxm';
import 'react-quill/dist/quill.snow.css';
import { useUploadPhotoMutation } from '../../../store/services/uploadPhotoApi';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false, loading: () => <p>Loading ...</p> },
);

interface EditorProps {
  control: any;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ control, name, defaultValue, placeholder, className }) => {
  const [value, setValue] = useState('');
  const [uploadPhoto, { isLoading: uploadPhotoLoading }] = useUploadPhotoMutation();

  const modules = {
    toolbar: [
      [{ header: [2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', { color: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            className={clsxm(className)}
            placeholder={placeholder}
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </>
  );
};

export default Editor;

// import parse from 'html-react-parser';
{
  /* <div>{parse(value)}</div> */
}
