export type ToastMessageType = 'success' | 'error' | 'warning';

export interface ToastParams {
  type: ToastMessageType;
  message: string;
  delay?: number;
  closable?: boolean;
}

let toastHandler:
  | ((
      type: ToastMessageType,
      message: string,
      delay: number,
      closable: boolean,
    ) => void)
  | null = null;

export function registerToastHandler(
  handler: (
    type: ToastMessageType,
    message: string,
    delay: number,
    closable: boolean,
  ) => void,
) {
  toastHandler = handler;
}

export function showToast(
  type: ToastMessageType,
  message: string,
  delay: number = 3000,
  closable: boolean = false,
) {
  if (toastHandler) {
    toastHandler(type, message, delay, closable);
  } else {
    console.warn(
      'No toast handler registered. Make sure ToastProvider is mounted.',
    );
  }
}
