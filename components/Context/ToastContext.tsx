'use client';

import {
  createContext,
  useState,
  useContext,
  useCallback,
  PropsWithChildren,
} from 'react';
import uuid from 'react-uuid';
import Toast from '@/components/utils/Toast';

export type ToastMessageType = 'success' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastMessageType;
  message: string;
}

type ToastContextProps = {
  addToast: (type: ToastMessageType, message: string) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastMessageType, message: string) => {
    const id = uuid();
    setToasts((currentToasts) => [...currentToasts, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((currentToast) => currentToast.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          message={toast.message}
        />
      ))}
    </ToastContext.Provider>
  );
};
