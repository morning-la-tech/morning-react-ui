import { useEffect, useId } from 'react';
import Image from 'next/image';
import styles from './toast.module.css';

type ToastProps = {
  type: 'success' | 'error' | 'warning';
  message: string;
  iconUrl?: string;
  delay?: number;
  closable?: boolean;
  onClose: () => void;
};

/**
 * This component displays a toast message with an optional icon and close button.
 *
 * @param {string} type - The type of the toast message (success, error, warning).
 * @param {string} message - The message to display in the toast.
 * @param {string} iconUrl - The URL of the icon to display in the toast.
 * @param {number} delay - The duration in milliseconds before the toast closes. Defaults to 3000. If 0, the toast will not close and a cross will be displayed.
 * @param {boolean} closable - Whether the toast is closable. Defaults to false. A toast can have delay and be closable
 * @param {() => void} onClose - The callback function to execute when the toast is closed.
 */
const Toast = ({
  type,
  message,
  iconUrl,
  delay = 3000,
  closable = false,
  onClose,
}: ToastProps) => {
  const toastId = useId();

  useEffect(() => {
    if (delay !== 0) {
      const timer = setTimeout(() => {
        onClose();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [onClose, delay, closable]);

  const defaultIconUrl =
    iconUrl ||
    (type === 'success'
      ? `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/success.svg`
      : type === 'error'
        ? `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/circle-xmark.svg`
        : `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/cross.svg`);

  return (
    <div
      className={`${styles.toastContainer} ${styles[type]} ${closable || delay === 0 ? styles.toastClosable : styles.toastDelay}`}
      id={toastId}
    >
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
      {(closable || delay === 0) && (
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Toast;
