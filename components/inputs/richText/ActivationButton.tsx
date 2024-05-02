import React from 'react';
import classNames from 'classnames';
import { Button, ButtonVariant } from '@/components/buttons';
import styles from './richText.module.css';

type ButtonProp = {
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const ActivationButton = ({
  isActive,
  onClick,
  disabled,
  children,
}: ButtonProp) => {
  return (
    <Button
      variant={ButtonVariant.Secondary}
      className={classNames(styles.control, {
        [styles.active]: isActive,
      })}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ActivationButton;
