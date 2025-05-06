import { ButtonHTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';
import { Size } from 'morning-react-ui/utils/Enum';
import { ButtonVariant } from './Button';
import styles from './button.module.css';

export type SquareButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  Image?: ReactElement;
  variant?: ButtonVariant;
  className?: string;
  size?: Size;
};

const SquareButton = ({
  Image,
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
      {Image && <span className={styles.image}>{Image}</span>}
    </button>
  );
};

export default SquareButton;
