'use client';
import {
  createContext,
  useState,
  useContext,
  useCallback,
  PropsWithChildren,
} from 'react';
import Toast from '../../components/utils/Toast';

export type ToastMessageType = 'success' | 'error';

export interface ToastMessage {
  type: ToastMessageType;
  message: string;
  onClose: () => void;
}

type ToastContextProps = {
  addToast: (type: ToastMessageType, message: string) => void;
};

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastMessageType, message: string) => {
    const onClose = () => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.message !== message),
      );
    };
    setToasts((currentToasts) => [
      ...currentToasts,
      { type, message, onClose },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          type={toast.type}
          message={toast.message}
          onClose={toast.onClose}
        />
      ))}
    </ToastContext.Provider>
  );
};
