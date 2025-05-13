import { ButtonHTMLAttributes } from 'react';
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
};

const RotatingButton = ({
  collapsed,
  toggle,
  rotationDeg,
  baseRotationDeg = 0,
  src,
  alt = 'toggle',
  ...props
}: RotatingIconButtonProps) => {
  const appliedRotation = collapsed
    ? baseRotationDeg
    : baseRotationDeg + rotationDeg;

  return (
    <button
      type='button'
      className={styles.iconButton}
      onClick={toggle}
      {...props}
    >
      <Image
        className={classNames(styles.icon, {
          [styles.iconExpanded]: !collapsed,
        })}
        src={src}
        alt={alt}
        width={20}
        height={20}
        style={{
          transform: `rotate(${appliedRotation}deg)`,
        }}
      />
    </button>
  );
};

export default RotatingButton;
