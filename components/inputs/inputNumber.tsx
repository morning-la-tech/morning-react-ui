import React, { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Size } from '@/util/Enum';
import ParentInput from '@/components/inputs/ParentInput';
import styles from './input.module.css';

type InputProps = {
  label?: string;
  sublabel?: string;
  size?: Size;
  value?: number;
  min?: number;
  max?: number;
  isLabelBold?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
};

const InputNumber = forwardRef<HTMLInputElement, InputProps>(
  ({ label, sublabel, isLabelBold, size = Size.m, value, min, max, isError, isDisabled }, ref) => {
    const [inputValue, setInputValue] = useState<number | undefined>(value);

    const getValidValue = (val: number | undefined): number => {
      if (val === undefined) {
        return NaN;
      }
      return isNaN(val) ? NaN : val;
    };

    const validateAndSet = (val: number) => {
      if ((min !== undefined && val < min) || (max !== undefined && val > max)) {
        return;
      }
      setInputValue(val);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (newValue === '') {
        setInputValue(NaN);
      } else {
        const parsedValue = parseInt(newValue, 10);
        if (!isNaN(parsedValue)) {
          validateAndSet(parsedValue);
        }
      }
    };

    const handleBlur = () => {
      const validValue = getValidValue(inputValue);
      setInputValue(validValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const testedValue = getValidValue(inputValue);
        let newValue = isNaN(testedValue) ? 0 : testedValue;
        const increment = 1;
        if (event.key === 'ArrowUp') {
          newValue += increment;
        } else if (event.key === 'ArrowDown') {
          newValue -= increment;
        }

        validateAndSet(newValue);
      }
    };

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <ParentInput label={label} sublabel={sublabel} isLabelBold={isLabelBold} size={size}>
        <input
          type='number'
          className={classNames(
            styles.input,
            styles[size],
            { [styles.error]: isError },
            { [styles.disabled]: isDisabled },
          )}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          ref={ref}
          value={isNaN(getValidValue(inputValue)) ? '' : inputValue}
          min={min}
          max={max}
          disabled={isDisabled}
        />
      </ParentInput>
    );
  },
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
