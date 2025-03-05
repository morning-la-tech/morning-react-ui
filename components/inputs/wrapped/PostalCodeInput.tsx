import { ChangeEvent, FocusEvent, forwardRef } from 'react';
import { TextInput } from 'morning-react-ui/components';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { PostalCodeError } from 'morning-react-ui/utils/error';

type PostalCodeInputProps = Omit<InputProps, 'type'> & {
  value: string;
  onChange: (value: string) => void;
  setPostalCodeError?: (error: PostalCodeError) => void;
  required?: boolean;
};
const isValidPostalCode = (code: string) => /^\d{5}$/.test(code);

const PostalCodeInput = forwardRef<HTMLInputElement, PostalCodeInputProps>(
  ({ value, onChange, setPostalCodeError, required, ...props }, ref) => {
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (!setPostalCodeError) return;
      const inputValue = event.target.value.trim();

      if (required && !inputValue) {
        setPostalCodeError(PostalCodeError.required);
      } else if (inputValue && !isValidPostalCode(inputValue)) {
        setPostalCodeError(PostalCodeError.formatPostalCode);
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value.replace(/\D/g, '');

      if (inputValue !== value) {
        onChange(inputValue);
      }
    };

    return (
      <TextInput
        ref={ref}
        {...props}
        type='text'
        inputMode='numeric'
        maxLength={5}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  },
);

PostalCodeInput.displayName = 'PostalCodeInput';

export default PostalCodeInput;
