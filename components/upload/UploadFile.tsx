'use client';

import Image from 'next/image';
import { Dispatch, useRef, useState, useTransition } from 'react';
import classNames from 'classnames';
import { Button, ButtonVariant } from '@/components/buttons';
import { uploadFile } from '@/services/googleCloudStorage';
import { generateFileName } from '@/utils/file';
import styles from './uploadFile.module.css';

type UploadImageProps = {
  buttonLabel: string;
  fileUrl?: string | false;
  destinationBucket: string;
  destinationPath: string;
  onChange: Dispatch<string>;
  isError?: boolean;
};

const UploadFile = ({
  buttonLabel,
  fileUrl = false,
  destinationBucket,
  destinationPath,
  onChange,
  isError = false,
}: UploadImageProps) => {
  const [file, setFile] = useState<string | false>(fileUrl);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<null | HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  const onUpload = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    if (!changeEvent.target.files || changeEvent.target.files.length === 0) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (progressEvent) => {
      if (!progressEvent.target?.result || !changeEvent.target.files) {
        return;
      }
      const loadedFileContent = progressEvent.target.result.toString();
      setFile(loadedFileContent);
      const base64Data = loadedFileContent.split(',')[1]; // Extract base64 data
      const fileName = generateFileName(
        destinationPath,
        changeEvent.target.files[0].name,
      );
      startTransition(async () => {
        await uploadFile(destinationBucket, base64Data, fileName).then(() => {
          onChange(`${destinationBucket}/${fileName}`);
        });
      });
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  return (
    <div className={styles.upload}>
      <input
        type={'file'}
        style={{ display: 'none' }}
        ref={fileInputRef}
        onInput={onUpload}
      />
      <div
        aria-label={'image canvas'}
        className={classNames(styles.uploadAera, {
          [styles.pending]: isPending,
          ['error']: isError,
        })}
      >
        {file ? (
          <Image
            src={file}
            alt={'uploaded file'}
            fill={true}
            sizes={'33vw'}
            className={styles.selectedImage}
          />
        ) : (
          <span className={styles.imageIcon}></span>
        )}
      </div>
      <Button
        isLoading={isPending}
        onClick={openFileDialog}
        variant={ButtonVariant.Secondary}
        startImage={
          <Image
            src={'https://cdn.morning.fr/icons/file-upload.svg'}
            alt={'file upload'}
            width={14}
            height={14}
          />
        }
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default UploadFile;
