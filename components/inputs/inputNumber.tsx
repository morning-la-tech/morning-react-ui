import React, { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Size } from '@/util/Enum';
import ParentInput from '@/components/inputs/ParentInput';
import { InputProps } from '@/components/inputs/types';
import styles from './input.module.css';

type InputNumberProps = InputProps & {
  value: number | undefined;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      label,
      sublabel,
      isLabelBold,
      size = Size.m,
      value,
      onChange,
      min,
      max,
      isError,
      isDisabled,
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<number | undefined>(value);

    const getValidValue = (val: number | undefined): number => {
      if (val === undefined) {
        return NaN;
      }
      return isNaN(val) ? NaN : val;
    };

    const validateAndSet = (val: number) => {
      if (
        (min !== undefined && val < min) ||
        (max !== undefined && val > max)
      ) {
        return;
      }
      setInputValue(val);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (newValue === '') {
        setInputValue(NaN);
        return;
      }
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue)) {
        validateAndSet(parsedValue);
      }
    };

    const handleBlur = () => {
      const validValue = getValidValue(inputValue);
      onChange(validValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!(event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        return;
      }
      event.preventDefault();
      const testedValue = getValidValue(inputValue);
      let newValue = isNaN(testedValue) ? 0 : testedValue;
      event.key === 'ArrowUp' ? newValue++ : newValue--;
      validateAndSet(newValue);
    };

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    return (
      <ParentInput
        label={label}
        sublabel={sublabel}
        isLabelBold={isLabelBold}
        size={size}
      >
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
