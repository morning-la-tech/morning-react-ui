import { forwardRef } from 'react';
import { NumberInput } from 'morning-react-ui/components';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { LatitudeError } from 'morning-react-ui/utils/error';

type LatitudeInputProps = Omit<InputProps, 'type'> & {
  value?: number | null;
  onChange: (value: number | null) => void;
  setLatitudeError?: (error: LatitudeError) => void;
  required?: boolean;
};

const LatitudeInput = forwardRef<HTMLInputElement, LatitudeInputProps>(
  ({ value, onChange, setLatitudeError, required, ...props }, ref) => {
    const handleBlur = () => {
      if (setLatitudeError) {
        if (required && (value === null || value === undefined)) {
          setLatitudeError(LatitudeError.required);
        } else if (
          value !== null &&
          value !== undefined &&
          (value < -90 || value > 90)
        ) {
          setLatitudeError(LatitudeError.latitudeRange);
        }
      }
    };

    return (
      <NumberInput
        ref={ref}
        {...props}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        inputMode='decimal'
        step={0.000001}
        allowFloat
        allowNegative
        required={required}
      />
    );
  },
);

LatitudeInput.displayName = 'LatitudeInput';

export default LatitudeInput;
