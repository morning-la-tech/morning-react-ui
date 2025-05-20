import { FormEvent, ReactNode } from 'react';
import { ButtonProps } from 'morning-react-ui/components/buttons/Button';
import { Size } from 'morning-react-ui/utils/Enum';
import Form from '../form/Form';
import Modal from './Modal';

type Props = {
  children?: ReactNode;
  isModalShowing: boolean;
  hide: () => void;
  top?: string | false;
  title?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  noCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  size?: Size;
  className?: string;
  buttons?: ButtonProps[];
  footerContent?: ReactNode;
  buttonContainerStyle?: React.CSSProperties;
  maxWidth?: string;
  autoCenterThreshold?: number;
};

const ModalForm = ({
  children,
  isModalShowing,
  hide,
  top = '200px',
  title,
  onSubmit,
  noCloseButton = false,
  closeOnClickOutside = true,
  className,
  buttons = [],
  footerContent,
  buttonContainerStyle = {},
  maxWidth = '600px',
  autoCenterThreshold = 500,
}: Props) => {
  return (
    <Modal
      isModalShowing={isModalShowing}
      hide={hide}
      top={top}
      title={title}
      noCloseButton={noCloseButton}
      closeOnClickOutside={closeOnClickOutside}
      className={className}
      buttons={buttons}
      footerContent={footerContent}
      buttonContainerStyle={buttonContainerStyle}
      maxWidth={maxWidth}
      autoCenterThreshold={autoCenterThreshold}
    >
      <Form onSubmit={onSubmit} buttons={[]}>
        {children}
      </Form>
    </Modal>
  );
};

export default ModalForm;
