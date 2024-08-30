import { ReactNode } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from './modal.module.scss';
import ModalHeader from './utils/ModalHeader';
import useModals from './utils/useModals';

type Props = {
  children?: ReactNode;
  isModalShowing: boolean;
  hide: () => void;
  top?: string | false;
  title?: string;
  noCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  size?: Size;
  className?: string;
};

const Modal = ({
  children,
  isModalShowing,
  hide,
  top = '200px',
  title,
  noCloseButton = false,
  closeOnClickOutside = true,
  className,
}: Props) => {
  const { handleMouseDown, handleMouseUp } = useModals(
    closeOnClickOutside,
    hide,
  );
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
          style={top ? { top } : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader
            hide={hide}
            title={title}
            hasCloseButton={!noCloseButton}
          />
          {children}
        </div>
      </div>,
      document.body,
    )
  );
};

export default Modal;
