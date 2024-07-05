import { ReactNode, HTMLProps, FormEvent } from 'react';
import Button, {
  ButtonProps,
} from 'morning-react-ui/components/buttons/Button';
import styles from './form.module.css';

interface FormProps extends HTMLProps<HTMLFormElement> {
  children: ReactNode;
  buttons: ButtonProps[];
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  buttonContainerStyle?: React.CSSProperties;
}

const Form = ({
  children,
  buttons,
  onSubmit,
  buttonContainerStyle = {},
  ...props
}: FormProps) => {
  return (
    <form
      {...props}
      onSubmit={onSubmit}
      className={`${styles.form} ${props.className || ''}`}
    >
      {children}
      <div className={styles.buttons} style={buttonContainerStyle}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={button.onClick}
            variant={button.variant}
            type={button.type}
            {...button}
          >
            {button.children}
          </Button>
        ))}
      </div>
    </form>
  );
};

export default Form;
