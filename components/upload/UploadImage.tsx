import Image from 'next/image';
import { Button, ButtonVariant } from '@/components/buttons';
import Column from '@/components/layout/Column';
import styles from './uploadimage.module.css';

type UploadImageProps = {
  buttonLabel: string;
};

const UploadImage = ({ buttonLabel }: UploadImageProps) => {
  return (
    <Column>
      <div aria-label={'image canvas'} className={styles.uploadAera}>
        <span className={styles.imageIcon}></span>
      </div>
      <Button
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
    </Column>
  );
};

export default UploadImage;
