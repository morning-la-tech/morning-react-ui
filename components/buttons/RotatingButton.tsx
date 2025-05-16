import { ButtonHTMLAttributes, CSSProperties } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './rotatingButton.module.css';

type RotatingIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  collapsed: boolean;
  toggle?: () => void;
  rotationDeg: number;
  baseRotationDeg?: number;
  src: string;
  alt?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
};

const RotatingButton = ({
  collapsed,
  toggle,
  rotationDeg,
  baseRotationDeg = 0,
  src,
  className,
  alt = 'toggle',
  imageClassName,
  imageStyle,
  ...props
}: RotatingIconButtonProps) => {
  const appliedRotation = collapsed
    ? baseRotationDeg
    : baseRotationDeg + rotationDeg;

  return (
    <button
      type='button'
      className={classNames(styles.iconButton, className)}
      onClick={toggle}
      {...props}
    >
      <Image
        className={classNames(styles.icon, imageClassName)}
        src={src}
        alt={alt}
        width={20}
        height={20}
        style={{
          transform: `rotate(${appliedRotation}deg)`,
          ...imageStyle,
        }}
      />
    </button>
  );
};

export default RotatingButton;
