'use client';
import { ToastProvider } from 'morning-react-ui/components/Context/ToastContext';
import ThemeProvider from './ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
