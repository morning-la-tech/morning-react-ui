import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Size, sizeToNumber } from '@/utils/Enum';
import styles from './modal.module.css';

type Props = {
  children: ReactNode;
  isModalShowing: boolean;
  hide: () => void;
  top?: string;
  title?: string;
  hasCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  size?: Size;
  className?: string;
};

const Modal = ({
  children,
  isModalShowing,
  hide,
  top = '50%',
  title,
  hasCloseButton = true,
  closeOnClickOutside = true,
  size = Size.m,
  className,
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
          style={{ top: top }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <span className={classNames(styles.title, `font-size-${size}`)}>
              {title}
            </span>
            {hasCloseButton && (
              <button
                className={styles.closeButton}
                style={{
                  width: `${sizeToNumber(size)}px`,
                  height: `${sizeToNumber(size)}px`,
                }}
                onClick={hide}
              ></button>
            )}
          </div>
          {children}
        </div>
      </div>,
      document.body,
    )
  );
};

export default Modal;
