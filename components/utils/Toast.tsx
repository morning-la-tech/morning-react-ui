import { useEffect, useId } from 'react';
import Image from 'next/image';
import styles from './toast.module.css';

type ToastProps = {
  type: 'success' | 'error' | 'warning';
  message: string;
  iconUrl?: string;
  delay?: number;
  onClose: () => void;
};

const Toast = ({
  type,
  message,
  iconUrl,
  delay = 3000,
  onClose,
}: ToastProps) => {
  const toastId = useId();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, delay);
    return () => clearTimeout(timer);
  }, [onClose, delay]);

  const defaultIconUrl =
    iconUrl ||
    (type === 'success'
      ? `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/success.svg`
      : type === 'error'
        ? `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/circle-xmark.svg`
        : `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/cross.svg`);

  return (
    <div className={`${styles.toastContainer} ${styles[type]}`} id={toastId}>
      <span className={styles.toastMessage}>
        <Image
          src={defaultIconUrl}
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
