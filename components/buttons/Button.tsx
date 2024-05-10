import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import Loading from 'morning-react-ui/components/utils/Loading';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
import styles from './button.module.css';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
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
  type = 'button',
  ...props
}: ButtonProps) => {
  const buttonClass = classNames(
    styles.button,
    styles[variant],
    styles[size],
    className,
  );
  return (
    <button className={buttonClass} type={type} {...props}>
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
