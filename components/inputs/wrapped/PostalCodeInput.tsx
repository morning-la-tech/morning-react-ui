import { ChangeEvent, FocusEvent, forwardRef } from 'react';
import { TextInput } from 'morning-react-ui/components';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { isValidFrenchPostalCode } from 'morning-react-ui/utils';
import { PostalCodeError } from 'morning-react-ui/utils/error';

type PostalCodeInputProps = Omit<InputProps, 'type'> & {
  value: string;
  onChange: (value: string) => void;
  setPostalCodeError?: (error: PostalCodeError) => void;
  required?: boolean;
};

const PostalCodeInput = forwardRef<HTMLInputElement, PostalCodeInputProps>(
  ({ value, onChange, setPostalCodeError, required, ...props }, ref) => {
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (!setPostalCodeError) return;
      const inputValue = event.target.value.trim();

      if (required && !inputValue) {
        setPostalCodeError(PostalCodeError.required);
      } else if (inputValue && !isValidFrenchPostalCode(inputValue)) {
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
