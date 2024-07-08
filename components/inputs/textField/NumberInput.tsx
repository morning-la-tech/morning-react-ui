import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from '../input.module.css';
import useInput from './useInput';

type NumberInputProps = InputProps & {
  value?: number | null;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      sublabel,
      isLabelBold,
      size = Size.m,
      value,
      onChange,
      min = 0,
      max,
      isError,
      disabled,
      placeholder,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<number | undefined | null>(
      value,
    );
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const getValidValue = (val: number | undefined | null): number => {
      if (val === undefined || val === null) {
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
        onChange(NaN);
        setInputValue(undefined);
        return;
      }
      const parsedValue = parseInt(newValue, 10);
      if (
        !isNaN(parsedValue) &&
        parsedValue >= min &&
        (max === undefined || parsedValue <= max)
      ) {
        setInputValue(parsedValue);
        onChange(parsedValue);
      }
    };

    const handleBlur = () => {
      const validValue = getValidValue(inputValue);
      onChange(validValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const blockedKeys = ['e', 'E', '+', '-'];
      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
        return;
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const testedValue = getValidValue(inputValue);
        let newValue = isNaN(testedValue) ? 0 : testedValue;
        event.key === 'ArrowUp' ? newValue++ : newValue--;
        validateAndSet(newValue);
      }
    };

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const { handleWrapperClick } = useInput({ inputRef });

    return (
      <ParentInput
        label={label}
        sublabel={sublabel}
        isLabelBold={isLabelBold}
        size={size}
        inputRef={inputRef}
        disabled={disabled}
      >
        <div
          className={classNames(
            styles.wrapper,
            `padding-${size}`,
            { ['cursorText']: !disabled },
            {
              [styles.error]: isError,
            },
          )}
          onClick={handleWrapperClick}
        >
          <input
            type='number'
            className={classNames(
              styles.input,
              `font-size-${size}`,
              `height-${size}`,
            )}
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            value={isNaN(getValidValue(inputValue)) ? '' : inputValue ?? ''}
            min={min}
            max={max}
            disabled={disabled}
            placeholder={placeholder}
          />
        </div>
      </ParentInput>
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
