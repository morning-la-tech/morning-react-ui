import { ButtonHTMLAttributes } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
import { ButtonVariant } from './Button';
import styles from './button.module.css';

export type SquareButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  imageURL: string;
  imageAlt?: string;
  variant?: ButtonVariant;
  className?: string;
  size?: Size;
};

const SquareButton = ({
  imageURL,
  imageAlt = 'icon',
  size = Size.m,
  variant = ButtonVariant.Primary,
  className,
  type = 'button',
  ...props
}: SquareButtonProps) => {
  const buttonClass = classNames(
    styles.button,
    styles.squareButton,
    styles[variant],
    styles[size],
    className,
  );
  return (
    <button className={buttonClass} type={type} {...props}>
      <Image
        className={styles.image}
        src={imageURL}
        alt={imageAlt}
        width={sizeToNumber(size)}
        height={sizeToNumber(size)}
      />
    </button>
  );
};

export default SquareButton;
