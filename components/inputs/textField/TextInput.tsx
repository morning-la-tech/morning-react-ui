import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  InputHTMLAttributes,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import ParentInput from '../../../components/inputs/ParentInput';
import { InputProps } from '../../../components/inputs/propsTypes';
import { Size, sizeToNumber } from '../../../utils/Enum';
import styles from '../input.module.css';
import useInput from './useInput';

type TextInputProps = InputProps & {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCursorPositionChange?: (position: number | null) => void;
  setCursorPosition?: (input: HTMLInputElement) => void;
  imageSrc?: string;
  imageAlt?: string;
  showClearButton?: boolean;
  showDropdownIcon?: boolean;
  onClear?: () => void;
  isDropdownActive?: boolean;
};

type TextInputHtmlProps = TextInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof TextInputProps>;

const TextInput = forwardRef<HTMLInputElement, TextInputHtmlProps>(
  (
    {
      label,
      sublabel,
      isLabelBold,
      size = Size.m,
      value,
      onChange,
      onCursorPositionChange,
      setCursorPosition,
      placeholder,
      isError,
      disabled,
      imageSrc,
      imageAlt,
      showClearButton,
      showDropdownIcon,
      onClear = () =>
        onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>),
      isDropdownActive,
      className,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [lastCursorPosition, setLastCursorPosition] = useState<number | null>(
      null,
    );

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (setCursorPosition && inputRef.current) {
        setCursorPosition(inputRef.current);
      }
    }, [setCursorPosition]);

    const handleCursorChange = (position: number | null) => {
      if (position !== lastCursorPosition) {
        setLastCursorPosition(position);
        if (onCursorPositionChange) {
          onCursorPositionChange(position);
        }
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event);
      handleCursorChange(event.target.selectionStart);
    };

    const handleKeyUpOrClick = (
      event: MouseEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    ) => {
      handleCursorChange(event.currentTarget.selectionStart);
    };

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
            styles.flex,
            `padding-${size}`,
            { ['cursorText']: !disabled },
            {
              [styles.error]: isError,
            },
          )}
          onClick={handleWrapperClick}
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt || 'input icon'}
              width={sizeToNumber(size)}
              height={sizeToNumber(size)}
            />
          )}
          <input
            type='text'
            {...props}
            className={classNames(
              styles.input,
              `font-size-${size}`,
              `height-${size}`,
              className,
            )}
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onClick={handleKeyUpOrClick}
          />
          {showClearButton && (
            <Image
              src='https://cdn.morning.fr/icons/clear-button.svg'
              alt='Clear'
              onClick={onClear}
              width={sizeToNumber(size)}
              height={sizeToNumber(size)}
              className='cursorPointer'
            />
          )}
          {showDropdownIcon && (
            <Image
              src='https://cdn.morning.fr/icons/arrow.svg'
              alt='Dropdown'
              width={sizeToNumber(size)}
              height={sizeToNumber(size)}
              className={classNames(styles.dropdownIcon, {
                [styles.dropdownIconActive]: isDropdownActive,
              })}
            />
          )}
        </div>
      </ParentInput>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
