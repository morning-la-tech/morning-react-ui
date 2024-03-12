import { useEffect } from 'react';
import Image from 'next/image';
import styles from './toast.module.css';

interface ToastProps {
  onClose: () => void;
  type: 'success' | 'error';
  message: string;
  delay?: number;
}

export const Toast = ({ type, onClose, message, delay = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, delay);

    return () => clearTimeout(timer);
  }, [onClose]);

  const imageSrc =
    type === 'success'
      ? 'https://cdn.morning.fr/icons/success.svg'
      : 'https://cdn.morning.fr/icons/cross.svg';

  return (
    <div className={`${styles.toastContainer} ${styles[type]}`}>
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
