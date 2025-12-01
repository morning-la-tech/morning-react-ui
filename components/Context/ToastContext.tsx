'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Toast from 'morning-react-ui/components/utils/Toast';
import styles from 'morning-react-ui/components/utils/toast.module.css';
import {
  registerToastHandler,
  ToastMessageType,
} from 'morning-react-ui/services/toast.service';

export type ToastMessage = {
  id: string;
  type: ToastMessageType;
  message: string;
  onClose: () => void;
  delay?: number;
  closable?: boolean;
  maxWidth?: string;
};

type ToastContextProps = {
  addToast: (
    type: ToastMessageType,
    message: string,
    delay?: number,
    closable?: boolean,
    maxWidth?: string,
  ) => void;
};

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (
      type: ToastMessageType,
      message: string,
      delay: number = 3000,
      closable: boolean = false,
      maxWidth: string = 'initial',
    ) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const onClose = () => {
        setToasts((currentToasts) =>
          currentToasts.filter((toast) => toast.id !== id),
        );
      };
      setToasts((currentToasts) => [
        ...currentToasts,
        { id, type, message, onClose, delay, closable, maxWidth },
      ]);
    },
    [],
  );

  useEffect(() => {
    registerToastHandler(addToast);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className={styles.toastWrapper}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            delay={toast.delay}
            closable={toast.closable}
            onClose={toast.onClose}
            maxWidth={toast.maxWidth}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
