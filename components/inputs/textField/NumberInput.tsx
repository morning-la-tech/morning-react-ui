import {
  ChangeEvent,
  Dispatch,
  forwardRef,
  KeyboardEvent,
  useImperativeHandle,
  useRef,
} from 'react';
import classNames from 'classnames';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from '../input.module.css';
import useInput from './useInput';

type NumberInputProps = InputProps & {
  value?: number | null;
  onChange: Dispatch<number | null>;
  allowFloat?: boolean;
  step?: number;
};

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      sublabel,
      bold,
      size = Size.m,
      value,
      onChange,
      isError,
      disabled,
      placeholder,
      allowFloat = false,
      step = allowFloat ? 0.1 : 1,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.trim();

      if (newValue === '') {
        onChange(null);
        return;
      }

      const parsedValue = allowFloat
        ? parseFloat(newValue)
        : parseInt(newValue, 10);

      if (!isNaN(parsedValue)) {
        onChange(parsedValue);
      } else {
        onChange(null);
      }
    };

    const handleBlur = () => {
      onChange(value ?? null);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const blockedKeys = ['e', 'E'];
      if (!allowFloat) blockedKeys.push('.');
      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
        return;
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const newValue =
          (value ?? 0) + (event.key === 'ArrowUp' ? step : -step);
        onChange(parseFloat(newValue.toFixed(10)));
      }
    };

    const { handleWrapperClick } = useInput({ inputRef });

    return (
      <ParentInput
        label={label}
        sublabel={sublabel}
        bold={bold}
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
            step={step}
            className={classNames(
              styles.input,
              `font-size-${size}`,
              `height-${size}`,
            )}
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            value={value ?? ''}
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
