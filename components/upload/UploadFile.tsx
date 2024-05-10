'use client';

import {
  ChangeEvent,
  Dispatch,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Button, ButtonVariant } from '../../components/buttons';
import { useToast } from '../../components/Context/ToastContext';
import { uploadFile } from '../../services/googleCloudStorage';
import { generateFileName } from '../../utils/file';
import styles from './uploadFile.module.css';

interface UploadFileProps {
  buttonLabel: string;
  fileUrl?: string;
  destinationBucket: string;
  destinationPath: string;
  onChange: Dispatch<string>;
  isError?: boolean;
  fileType?: string;
  errorMessage?: string;
  maxFileSize?: number;
  maxSizeErrorMessage?: string;
}

const UploadFile = ({
  buttonLabel,
  fileUrl = '',
  destinationBucket,
  destinationPath,
  onChange,
  isError = false,
  fileType,
  errorMessage = 'Upload Error',
  maxFileSize = 10,
  maxSizeErrorMessage = 'Uploaded file is too large',
}: UploadFileProps) => {
  const { addToast } = useToast();
  const [hasError, setHasError] = useState<boolean>(isError);
  const [file, setFile] = useState<string>(fileUrl);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const openFileDialog = () => fileInputRef.current?.click();

  useEffect(() => {
    if (fileInputRef.current && hasError) {
      fileInputRef.current.value = '';
    }
  }, [file, hasError]);

  const handleFileUpload = async (
    fileContent: string,
    selectedFileName: string,
  ) => {
    const generatedFileName = generateFileName(
      destinationPath,
      selectedFileName,
    );
    const base64Data = fileContent.split(',')[1]; // Extract base64 data
    const response = await uploadFile(
      destinationBucket,
      base64Data,
      generatedFileName,
    );
    setHasError(!response);
    if (!response) {
      addToast('error', errorMessage);
      setFile(fileUrl);
      return;
    }
    onChange(`${destinationBucket}/${generatedFileName}`);
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const selectedFile = files[0];
    // check size in megabytes, abort if too large
    if (selectedFile.size > maxFileSize * 1024 * 1024) {
      addToast('error', maxSizeErrorMessage);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result?.toString() || '';
      setFile(content);
      startTransition(() => handleFileUpload(content, selectedFile.name));
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className={styles.upload}>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={onUpload}
        accept={fileType}
      />
      <div
        aria-label='preview'
        className={classNames(styles.uploadAera, {
          [styles.pending]: isPending,
          ['error']: hasError,
        })}
      >
        {file ? (
          <Image
            src={file}
            alt='Uploaded file'
            fill
            sizes='true'
            className={styles.selectedImage}
          />
        ) : (
          <span className={styles.imageIcon} />
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
            className={styles.uploadIcon}
            fill
            sizes={'true'}
          />
        }
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default UploadFile;
