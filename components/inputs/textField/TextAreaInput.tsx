import {
  forwardRef,
  useRef,
  useImperativeHandle,
  ChangeEvent,
  useEffect,
  TextareaHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from '../input.module.css';
import ParentInput from '../ParentInput';

type TextAreaInputProps = {
  placeholder: string;
  label?: string;
  sublabel?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  isError?: boolean;
  size?: Size;
  disabled?: boolean;
  maxLength?: number;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>;

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      placeholder,
      label,
      sublabel,
      onChange,
      value,
      isError = false,
      size = Size.m,
      disabled = false,
      maxLength,
      className,
      ...props
    },
    ref,
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement);

    useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }, [value]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && event.target.value.length > maxLength) {
        return;
      }
      onChange(event);
    };

    return (
      <ParentInput
        label={label}
        sublabel={sublabel}
        size={size}
        disabled={disabled}
        inputRef={textAreaRef}
      >
        <div
          className={classNames(
            styles.wrapper,
            styles.flex,
            { [styles.error]: isError },
            { [`font-size-${size}`]: size },
            { ['disabled']: disabled },
            className,
          )}
        >
          <textarea
            ref={textAreaRef}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={classNames(
              styles.textArea,
              { [styles.error]: isError },
              `font-size-${size}`,
            )}
            disabled={disabled}
            maxLength={maxLength}
            {...props}
          />
        </div>
      </ParentInput>
    );
  },
);

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
