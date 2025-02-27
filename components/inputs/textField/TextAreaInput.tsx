import {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useRef,
} from 'react';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from '../input.module.css';
import ParentInput from '../ParentInput';
import { InputProps } from '../propsTypes';

type TextAreaInputProps = InputProps & {
  label?: string;
  sublabel?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
            className={classNames(styles.textArea, `font-size-${finalSize}`, {
              [styles.error]: isError,
            })}
            disabled={disabled}
            maxLength={maxLength}
            {...restProps}
          />
        </div>
      </ParentInput>
    );
  },
);

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
