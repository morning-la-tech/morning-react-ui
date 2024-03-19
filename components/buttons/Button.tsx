import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import classNames from 'classnames';
import Loading from '@/components/utils/Loading';
import { Size, sizeToNumber } from '@/utils/Enum';
import styles from './button.module.css';

const inter = Inter({
  weight: 'variable',
  subsets: ['latin'],
});

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  startImage?: ReactElement;
  endImage?: ReactElement;
  isLoading?: boolean;
  variant?: ButtonVariant;
  className?: string;
  size?: Size;
};

const Button = ({
  children,
  startImage,
  endImage,
  isLoading = false,
  size = Size.m,
  variant = ButtonVariant.Primary,
  className,
  ...props
}: ButtonProps) => {
  const buttonClass = classNames(
    styles.button,
    styles[variant],
    styles[size],
    className,
    inter.className,
  );
  return (
    <button className={buttonClass} {...props}>
      <div
        className={styles.content}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        {startImage && <span className={styles.image}>{startImage}</span>}
        {children}
        {endImage && <span className={styles.image}>{endImage}</span>}
      </div>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Loading
            radius={sizeToNumber(size)}
            color={variant == ButtonVariant.Primary ? 'white' : 'black'}
          />
        </div>
      )}
    </button>
  );
};

export default Button;
