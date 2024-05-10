import { ReactNode, FormEvent } from 'react';
import Button, {
  ButtonProps,
} from 'morning-react-ui/components/buttons/Button';
import styles from './form.module.css';

type FormProps = {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  buttons: ButtonProps[];
};

const Form = ({ children, onSubmit, buttons }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
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
