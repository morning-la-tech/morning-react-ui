import { useEffect, useId } from 'react';
import Image from 'next/image';
import styles from './toast.module.css';

type ToastProps = {
  type: 'success' | 'error';
  message: string;
  delay?: number;
  onClose: () => void;
};

const Toast = ({ type, message, delay = 3000, onClose }: ToastProps) => {
  const toastId = useId();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, delay);
    return () => clearTimeout(timer);
  }, [onClose, delay]);

  const imageSrc =
    type === 'success'
      ? `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/success.svg`
      : `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/cross.svg`;

  return (
    <div className={`${styles.toastContainer} ${styles[type]}`} id={toastId}>
      <span className={styles.toastMessage}>
        <Image
          src={imageSrc}
          alt={type}
          width={24}
          height={24}
          className={styles.toastMessageImage}
        />
        {message}
      </span>
    </div>
  );
};

export default Toast;
