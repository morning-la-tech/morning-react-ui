import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Size } from '@/utils/Enum';
import Button, { ButtonVariant } from '@/components/buttons/Button';
import styles from './modal.module.css';

export type ModalButtonProps = {
  label: string;
  variant?: ButtonVariant;
  onClick: () => void;
};

type Props = {
  children: ReactNode;
  isModalShowing: boolean;
  hide: () => void;
  top?: string | false;
  title?: string;
  hasCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  size?: Size;
  className?: string;
  buttons?: ModalButtonProps[];
};

const Modal = ({
  children,
  isModalShowing,
  hide,
  top = '200px',
  title,
  hasCloseButton = true,
  closeOnClickOutside = true,
  className,
  buttons = [],
}: Props) => {
  const modalClass = classNames(styles.modal, className);
  return (
    isModalShowing &&
    createPortal(
      <div
        className={styles.overlay}
        onClick={closeOnClickOutside ? hide : (e) => e.stopPropagation()}
      >
        <div
          className={modalClass}
          style={top ? { top } : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            {hasCloseButton && (
              <button className={styles.closeButton} onClick={hide}></button>
            )}
          </div>
          {children}
          <div className={styles.footer}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                variant={button.variant}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>,
      document.body,
    )
  );
};

export default Modal;
