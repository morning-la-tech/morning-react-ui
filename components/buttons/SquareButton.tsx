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
  imageClassName?: string;
};

const SquareButton = ({
  imageURL,
  imageAlt = 'icon',
  size = Size.m,
  variant = ButtonVariant.Primary,
  className,
  imageClassName,
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
        className={classNames(styles.image, imageClassName)}
        src={imageURL}
        alt={imageAlt}
        width={sizeToNumber(size)}
        height={sizeToNumber(size)}
      />
    </button>
  );
};

export default SquareButton;
