import { FormEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Size } from '@/utils/Enum';
import { ButtonProps } from '@/components/buttons/Button';
import styles from './modal.module.css';
import useModals from './utils/useModals';
import ModalHeader from './utils/ModalHeader';
import Form from '../form/Form';

type Props = {
  children: ReactNode;
  isModalShowing: boolean;
  hide: () => void;
  top?: string | false;
  title?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  hasCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  size?: Size;
  className?: string;
  buttons?: ButtonProps[];
};

const Modal = ({
  children,
  isModalShowing,
  hide,
  top = '200px',
  title,
  onSubmit,
  hasCloseButton = true,
  closeOnClickOutside = true,
  className,
  buttons = [],
}: Props) => {
  const { handleMouseDown, handleMouseUp } = useModals(
    closeOnClickOutside,
    hide,
  );

  return (
    isModalShowing &&
    createPortal(
<<<<<<< HEAD
      <div className={styles.wrapper}>
        <div
          className={styles.overlay}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
=======
      <div
        className={styles.overlay}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
>>>>>>> 2b76e52 (Text area & Modal changement)
        <div
          className={classNames(styles.modal, className)}
          style={top ? { top } : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader
            hide={hide}
            title={title}
            hasCloseButton={hasCloseButton}
          />
          <Form onSubmit={onSubmit} buttons={buttons}>
            {children}
          </Form>
        </div>
      </div>,
      document.body,
    )
  );
};

export default Modal;
