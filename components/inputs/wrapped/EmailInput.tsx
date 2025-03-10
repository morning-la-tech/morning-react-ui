import { FocusEvent, forwardRef } from 'react';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { EmailError, InputError } from 'morning-react-ui/utils/error';
import { isValidEmail } from 'morning-react-ui/utils/stringUtils';
import TextInput from '../textField/TextInput';

type EmailInputProps = Omit<InputProps, 'type'> & {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setEmailError?: (error: EmailError) => void;
  required?: boolean;
};

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ value, onChange, setEmailError, required, ...props }, ref) => {
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (!setEmailError) return;
      const inputValue = event.target.value.trim();
      if (required && !inputValue) {
        setEmailError(EmailError.required);
      } else if (inputValue && !isValidEmail(inputValue)) {
        setEmailError(EmailError.formatEmail);
      }
    };

    const handleTextError = (error: InputError) => {
      if (setEmailError) {
        setEmailError(error as unknown as EmailError);
      }
    };

    return (
      <TextInput
        ref={ref}
        {...props}
        inputMode='email'
        autoComplete='email'
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        setTextError={handleTextError}
      />
    );
  },
);

EmailInput.displayName = 'EmailInput';

export default EmailInput;
