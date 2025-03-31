import { forwardRef } from 'react';
import { NumberInput } from 'morning-react-ui/components';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { LongitudeError } from 'morning-react-ui/utils/error';

type LongitudeInputProps = Omit<InputProps, 'type'> & {
  value?: number | null;
  onChange: (value: number | null) => void;
  setLongitudeError?: (error: LongitudeError) => void;
  required?: boolean;
  isError?: boolean;
};

const LongitudeInput = forwardRef<HTMLInputElement, LongitudeInputProps>(
  (
    { value, onChange, setLongitudeError, required, isError, ...props },
    ref,
  ) => {
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
        setNumberError={(error) => {
          setLongitudeError?.(error as unknown as LongitudeError);
        }}
        isError={isError}
        inputMode='decimal'
        step={0.000001}
        allowFloat
        allowNegative
        required={required}
        onInvalid={(e) => e.preventDefault()}
        min={-180}
        max={180}
      />
    );
  },
);

LongitudeInput.displayName = 'LongitudeInput';

export default LongitudeInput;
