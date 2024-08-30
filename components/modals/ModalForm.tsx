import { FormEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { ButtonProps } from 'morning-react-ui/components/buttons/Button';
import { Size } from 'morning-react-ui/utils/Enum';
import Form from '../form/Form';
import styles from './modal.module.scss';
import ModalHeader from './utils/ModalHeader';
import useModals from './utils/useModals';

type Props = {
  children?: ReactNode;
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
  buttonContainerStyle?: React.CSSProperties;
  maxWidth?: string;
};

const ModalForm = ({
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
  buttonContainerStyle = {},
  maxWidth = '600px',
}: Props) => {
  const { handleMouseDown, handleMouseUp } = useModals(
    closeOnClickOutside,
    hide,
  );

  const modalStyle = {
    ...(top ? { top } : {}),
    maxWidth,
  };

  return (
    isModalShowing &&
    createPortal(
      <div className={styles.wrapper}>
        <div
          className={styles.overlay}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        <div
          className={classNames(styles.modal, className)}
          style={modalStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader
            hide={hide}
            title={title}
            hasCloseButton={hasCloseButton}
          />
          <Form
            onSubmit={onSubmit}
            buttons={buttons}
            buttonContainerStyle={buttonContainerStyle}
          >
            {children}
          </Form>
        </div>
      </div>,
      document.body,
    )
  );
};

export default ModalForm;
