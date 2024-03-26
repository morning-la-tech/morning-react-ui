import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { Size, sizeToFontSize, sizeToNumber } from '@/utils/Enum';
import styles from '@/components/buttons/linkButton.module.css';

type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  startImage?: ReactElement;
  endImage?: ReactElement;
  className?: string;
  size?: Size;
};

const LinkButton = ({
  children,
  startImage,
  endImage,
  size = Size.m,
  className,
  ...props
}: LinkButtonProps) => {
  const linkButtonClass = classNames(styles.linkButton, className);
  return (
    <button
      className={linkButtonClass}
      style={{
        lineHeight: `${sizeToNumber(size)}px`,
        fontSize: `${sizeToFontSize(size)}px`,
      }}
      {...props}
    >
      {startImage && <span className={styles.image}>{startImage}</span>}
      {children}
      {endImage && <span className={styles.image}>{endImage}</span>}
    </button>
  );
};

export default LinkButton;
