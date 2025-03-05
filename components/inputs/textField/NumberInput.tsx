import {
  ChangeEvent,
  ClipboardEvent,
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useImperativeHandle,
  useRef,
} from 'react';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from '../input.module.css';
import useInput from './useInput';

type NumberInputProps = InputProps & {
  value?: number | null;
  onChange: Dispatch<number | null>;
  allowFloat?: boolean;
  allowNegative?: boolean;
  step?: number;
};

type NumberInputHtmlProps = NumberInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof NumberInputProps>;

const NumberInput = forwardRef<HTMLInputElement, NumberInputHtmlProps>(
  (
    {
      label,
      sublabel,
      bold,
      size,
      value,
      onChange,
      isError,
      disabled,
      placeholder,
      allowFloat = false,
      allowNegative = true,
      step = allowFloat ? 0.1 : 1,
      errorText,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const isMobile = useIsMobile();
    const finalSize = size ?? (isMobile ? Size.l : Size.m);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const inputMode = allowFloat ? 'decimal' : 'numeric';

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.trim();
      if (newValue === '') {
        onChange(null);
        return;
      }

      const parsedValue = allowFloat
        ? parseFloat(newValue.replace(',', '.'))
        : parseInt(newValue, 10);

      if (!isNaN(parsedValue) && (allowNegative || parsedValue >= 0)) {
        onChange(parsedValue);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const blockedKeys = ['e', 'E'];
      if (!allowFloat) blockedKeys.push('.');
      if (!allowNegative) blockedKeys.push('-');

      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const newValue =
          (value ?? 0) + (event.key === 'ArrowUp' ? step : -step);
        if (!allowNegative && newValue < 0) return;
        onChange(parseFloat(newValue.toFixed(10)));
      }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      const paste = event.clipboardData.getData('text');
      const regex = allowFloat ? /^[-]?\d*([,.]?\d*)?$/ : /^[-]?\d*$/;
      if (!regex.test(paste)) {
        event.preventDefault();
      }
    };

    const { handleWrapperClick } = useInput({ inputRef });

    return (
      <ParentInput
        label={label}
        sublabel={sublabel}
        bold={bold}
        size={finalSize}
        inputRef={inputRef}
        disabled={disabled}
        errorText={errorText}
      >
        <div
          className={classNames(
            styles.wrapper,
            `padding-${finalSize}`,
            { ['cursorText']: !disabled },
            {
              [styles.error]: isError,
            },
          )}
          onClick={handleWrapperClick}
        >
          <input
            type='number'
            inputMode={inputMode}
            step={step}
            className={classNames(
              styles.input,
              `font-size-${finalSize}`,
              `height-${finalSize}`,
            )}
            ref={inputRef}
            value={value ?? ''}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            {...props}
          />
        </div>
      </ParentInput>
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
