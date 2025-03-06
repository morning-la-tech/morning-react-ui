'use client';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import Toast from 'morning-react-ui/components/utils/Toast';
import styles from 'morning-react-ui/components/utils/toast.module.css';

export type ToastMessageType = 'success' | 'error' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastMessageType;
  message: string;
  onClose: () => void;
  delay?: number;
  closable?: boolean;
}

type ToastContextProps = {
  addToast: (
    type: ToastMessageType,
    message: string,
    delay?: number,
    closable?: boolean,
  ) => void;
};

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (
      type: ToastMessageType,
      message: string,
      delay: number = 3000,
      closable: boolean = false,
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
        { id, type, message, onClose, delay, closable },
      ]);
    },
    [],
  );

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
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
