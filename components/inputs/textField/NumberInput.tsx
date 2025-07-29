import {
  ChangeEvent,
  ClipboardEvent,
  Dispatch,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { Size, sizeToHeight } from 'morning-react-ui/utils/Enum';
import { InputError } from 'morning-react-ui/utils/error';
import styles from '../input.module.css';
import useInput from './useInput';

type NumberInputProps = InputProps & {
  value?: number | null;
  onChange: Dispatch<number | null>;
  setNumberError?: (error: InputError) => void;
  allowFloat?: boolean;
  allowNegative?: boolean;
  step?: number;
  legend?: string;
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
      setNumberError,
      isError,
      disabled,
      placeholder,
      allowFloat = false,
      allowNegative = true,
      step = 1,
      errorText,
      required,
      legend,
      centerPlaceholder = false,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const isMobile = useIsMobile();
    const finalSize = size ?? (isMobile ? Size.l : Size.m);
    const { handleWrapperClick } = useInput({ inputRef });
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const inputStyle = {
      height: `${sizeToHeight(finalSize)}px`,
    };

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

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (setNumberError && required && !event.target.value.trim()) {
        setNumberError(InputError.required);
      }

      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const blockedKeys = ['e', 'E'];
      if (!allowFloat) blockedKeys.push('.');
      if (!allowNegative) blockedKeys.push('-');

      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
        return;
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const newValue =
          (value ?? 0) + (event.key === 'ArrowUp' ? step : -step);
        if (!allowNegative && newValue < 0) return;
        onChange(newValue);
      }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
      const paste = event.clipboardData.getData('text');
      const regex = allowFloat ? /^[-]?\d*([,.]?\d*)?$/ : /^[-]?\d*$/;
      if (!regex.test(paste)) {
        event.preventDefault();
      }
    };

    useEffect(() => {
      const input = inputRef.current;
      if (!input) return;

      const handleInvalid = () => {
        if (setNumberError && input.validity.valueMissing) {
          setNumberError(InputError.required);
        }
      };

      input.addEventListener('invalid', handleInvalid);
      return () => input.removeEventListener('invalid', handleInvalid);
    }, [setNumberError]);

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
            styles.flex,
            `padding-${finalSize}`,
            { ['cursorText']: !disabled },
            {
              [styles.error]: isError,
            },
          )}
          style={inputStyle}
          onClick={handleWrapperClick}
        >
          <input
            type='number'
            inputMode={inputMode}
            step={allowFloat ? 'any' : step}
            className={classNames(styles.input, `font-size-${finalSize}`, {
              [styles.centerPlaceholder]: centerPlaceholder,
            })}
            ref={inputRef}
            value={value ?? ''}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            required={required}
            {...props}
          />
          {legend && (
            <div
              style={{ height: `${sizeToHeight(finalSize) - 2}px` }}
              className={styles.legend}
            >
              {legend}
            </div>
          )}
        </div>
      </ParentInput>
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
