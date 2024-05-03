import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from '@/components/buttons/linkButton.module.css';
import { Size, sizeToNumber } from '@/utils/Enum';

type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  startImageURL?: string;
  endImageURL?: string;
  className?: string;
  size?: Size;
};

const LinkButton = ({
  children,
  startImageURL,
  endImageURL,
  size = Size.m,
  className,
  ...props
}: LinkButtonProps) => {
  const linkButtonClass = classNames(styles.linkButton, className);
  return (
    <button
      className={classNames(linkButtonClass, `font-size-${size}`)}
      style={{
        lineHeight: `${sizeToNumber(size)}px`,
      }}
      {...props}
    >
      {startImageURL && (
        <span
          className={styles.image}
          style={{
            maskImage: `url("${startImageURL}")`,
            width: `${sizeToNumber(size)}px`,
            height: `${sizeToNumber(size)}px`,
          }}
        ></span>
      )}
      {children}
      {endImageURL && (
        <span
          className={styles.image}
          style={{
            maskImage: `url("${endImageURL}")`,
            width: `${sizeToNumber(size)}px`,
            height: `${sizeToNumber(size)}px`,
          }}
        ></span>
      )}
    </button>
  );
};

export default LinkButton;
