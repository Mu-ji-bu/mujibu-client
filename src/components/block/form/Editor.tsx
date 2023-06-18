import dynamic from 'next/dynamic';
import React, { useState, useMemo, useRef } from 'react';
import { Controller } from 'react-hook-form';
import clsxm from '@/libraries/utils/clsxm';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  async () => {
    const Quill = (await import('react-quill')).default;

    const DynamicReactQuill = ({ forwardedRef, ...rest }: { forwardedRef: React.Ref<any> }) => (
      <Quill ref={forwardedRef} {...rest} />
    );
    DynamicReactQuill.displayName = 'ReactQuill';
    return DynamicReactQuill;
  },
  {
    ssr: false,
  },
);

interface EditorProps {
  control: any;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ control, name, defaultValue, placeholder, className }) => {
  const quillRef = useRef<any>(null);
  const [value, setValue] = useState<string>('');

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );
  function imageHandler() {
    if (!quillRef.current) return;

    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    const value = prompt('Please enter the image URL');

    if (value && range) {
      editor.insertEmbed(range.index, 'image', value, 'user');
    }
  }

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
            forwardedRef={quillRef}
            // @ts-ignore 找不到type解法 先註解
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
