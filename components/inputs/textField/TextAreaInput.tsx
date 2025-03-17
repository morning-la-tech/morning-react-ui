import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import { Size } from 'morning-react-ui/utils/Enum';
import { InputError } from 'morning-react-ui/utils/error';
import styles from '../input.module.css';
import ParentInput from '../ParentInput';
import { InputProps } from '../propsTypes';

type TextAreaInputProps = InputProps & {
  label?: string;
  sublabel?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  setTextAreaError?: (error: InputError) => void;
  required?: boolean;
  value: string;
  size?: Size;
  disabled?: boolean;
  maxLength?: number;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>;

type TextAreaInputHtmlProps = TextAreaInputProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextAreaInputProps>;

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputHtmlProps>(
  (
    {
      placeholder,
      label,
      sublabel,
      onChange,
      setTextAreaError,
      required,
      value,
      isError = false,
      size,
      disabled = false,
      maxLength,
      className,
      errorText,
      ...restProps
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const finalSize = size ?? (isMobile ? Size.l : Size.m);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!maxLength || event.target.value.length <= maxLength) {
        onChange(event);
      }
    };

    const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      if (setTextAreaError && required && !event.target.value.trim()) {
        setTextAreaError(InputError.required);
      }
    };

    useEffect(() => {
      const textarea = textAreaRef.current;
      if (!textarea) return;

      const handleInvalid = (event: Event) => {
        event.preventDefault();
        if (setTextAreaError) {
          setTextAreaError(InputError.required);
        }
      };

      textarea.addEventListener('invalid', handleInvalid);
      return () => textarea.removeEventListener('invalid', handleInvalid);
    }, [setTextAreaError]);

    return (
      <ParentInput
        label={label}
        sublabel={sublabel}
        size={finalSize}
        disabled={disabled}
        inputRef={textAreaRef}
        style={{ height: '100%' }}
        fullHeight
        errorText={errorText}
      >
        <div
          className={classNames(
            styles.wrapper,
            styles.wrapperTextArea,
            styles.flex,
            `font-size-${finalSize}`,
            { [styles.error]: isError },
            { ['disabled']: disabled },
            className,
          )}
        >
          <textarea
            ref={textAreaRef}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classNames(styles.textArea, `font-size-${finalSize}`, {
              [styles.error]: isError,
            })}
            disabled={disabled}
            maxLength={maxLength}
            required={required}
            {...restProps}
          />
        </div>
      </ParentInput>
    );
  },
);

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
