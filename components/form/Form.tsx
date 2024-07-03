import { ReactNode, HTMLProps } from 'react';
import Button, {
  ButtonProps,
} from 'morning-react-ui/components/buttons/Button';
import styles from './form.module.css';

interface FormProps extends HTMLProps<HTMLFormElement> {
  children: ReactNode;
  buttons: ButtonProps[];
}

const Form = ({ children, buttons, ...props }: FormProps) => {
  return (
    <form {...props} className={`${styles.form} ${props.className || ''}`}>
      {children}
      <div className={styles.buttons}>
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
