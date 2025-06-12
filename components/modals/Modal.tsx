import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { Button } from 'morning-react-ui/components';
import { ButtonProps } from 'morning-react-ui/components/buttons/Button';
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
  autoCenterThreshold?: number;
  buttons?: ButtonProps[];
  buttonContainerStyle?: React.CSSProperties;
  footerContent?: ReactNode;
  maxWidth?: string;
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
  autoCenterThreshold = 500,
  footerContent,
  buttons = [],
  buttonContainerStyle = {},
  maxWidth = '600px',
}: Props) => {
  const { handleMouseDown, handleMouseUp } = useModals(
    closeOnClickOutside,
    hide,
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const [shouldCenter, setShouldCenter] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (isModalShowing && modalRef.current) {
      const checkHeight = () => {
        const modalHeight = modalRef.current?.scrollHeight || 0;
        setShouldCenter(modalHeight > autoCenterThreshold);
      };

      checkHeight();

      const resizeObserver = new ResizeObserver(checkHeight);
      resizeObserver.observe(modalRef.current);

      return () => {
        if (modalRef.current) {
          resizeObserver.unobserve(modalRef.current);
        }
      };
    }
  }, [isModalShowing, autoCenterThreshold, children]);

  // Prevent body scroll when modal is open
  useLayoutEffect(() => {
    if (isModalShowing) {
      const previousOverflow = document.body.style.overflow;
      const previousPosition = document.body.style.position;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';

      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.style.position = previousPosition;
      };
    }
  }, [isModalShowing]);

  const getModalStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = { maxWidth };

    if (top !== '200px' && !shouldCenter) {
      if (typeof top === 'string') {
        baseStyle.marginTop = top;
      }
    }

    return baseStyle;
  };

  const renderFooter = () => {
    const hasButtons = buttons && buttons.length > 0;
    const hasFooterContent = footerContent;

    if (!hasButtons && !hasFooterContent) return null;

    return (
      <div className={styles.modalFooter}>
        {hasButtons && (
          <div className={styles.buttonContainer} style={buttonContainerStyle}>
            {buttons.map((button, index) => (
              <Button key={index} {...button} />
            ))}
          </div>
        )}
        {hasFooterContent && (
          <div className={styles.footerContent}>{footerContent}</div>
        )}
      </div>
    );
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
          ref={modalRef}
          className={classNames(
            styles.modal,
            { [styles.modalCentered]: top === false || shouldCenter },
            className,
          )}
          style={getModalStyle()}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader
            hide={hide}
            title={title}
            hasCloseButton={!noCloseButton}
          />

          <div className={styles.modalContent}>{children}</div>

          {renderFooter()}
        </div>
      </div>,
      document.body,
    )
  );
};

export default Modal;
