import { forwardRef } from 'react';
import { NumberInput } from 'morning-react-ui/components';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { LongitudeError } from 'morning-react-ui/utils/error';

type LongitudeInputProps = Omit<InputProps, 'type'> & {
  value?: number | null;
  onChange: (value: number | null) => void;
  setLongitudeError?: (error: LongitudeError) => void;
  required?: boolean;
};

const LongitudeInput = forwardRef<HTMLInputElement, LongitudeInputProps>(
  ({ value, onChange, setLongitudeError, required, ...props }, ref) => {
    const handleBlur = () => {
      if (setLongitudeError) {
        if (required && (value === null || value === undefined)) {
          setLongitudeError(LongitudeError.required);
        } else if (
          value !== null &&
          value !== undefined &&
          (value < -180 || value > 180)
        ) {
          setLongitudeError(LongitudeError.longitudeRange);
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

LongitudeInput.displayName = 'LongitudeInput';

export default LongitudeInput;
