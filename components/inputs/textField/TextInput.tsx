import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import { InputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
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
      bold,
      size,
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
    const isMobile = useIsMobile();
    const finalSize = size ?? (isMobile ? Size.l : Size.m);
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
        bold={bold}
        size={finalSize}
        inputRef={inputRef}
        disabled={disabled}
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
          onClick={handleWrapperClick}
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt || 'input icon'}
              width={sizeToNumber(finalSize)}
              height={sizeToNumber(finalSize)}
            />
          )}
          <input
            type='text'
            {...props}
            className={classNames(
              styles.input,
              `font-size-${finalSize}`,
              `height-${finalSize}`,
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
              src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/clear-button.svg`}
              alt='Clear'
              onClick={onClear}
              width={sizeToNumber(finalSize)}
              height={sizeToNumber(finalSize)}
              className='cursorPointer'
            />
          )}
          {showDropdownIcon && (
            <Image
              src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/arrow.svg`}
              alt='Dropdown'
              width={sizeToNumber(finalSize)}
              height={sizeToNumber(finalSize)}
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
