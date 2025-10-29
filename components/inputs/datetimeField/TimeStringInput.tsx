import {
  ChangeEvent,
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import {
  isStringValidAsTime,
  isTimeStringWithinEdges,
  stringToTime,
} from 'morning-react-ui/utils/datetimeUtils';
import { Size, sizeToHeight } from 'morning-react-ui/utils/Enum';
import { TimeError } from 'morning-react-ui/utils/error';
import styles from '../input.module.css';
import { BasicInputProps, InputProps } from '../propsTypes';
import useInput from '../textField/useInput';

type TimeStringInputProps = {
  value?: string | null;
  min?: string | null;
  max?: string | null;
  setTimeError?: (error: TimeError) => void;
  onChange: Dispatch<string | null>;
} & BasicInputProps &
  InputProps;

type TimeStringInputHtmlProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof TimeStringInputProps
> &
  TimeStringInputProps;

const TimeStringInput = forwardRef<HTMLInputElement, TimeStringInputHtmlProps>(
  (
    {
      label,
      sublabel,
      placeholder = 'HH:mm',
      bold,
      size,
      value,
      disabled,
      isError,
      setTimeError,
      min,
      max,
      onChange,
      errorText,
      required,
      centerPlaceholder = false,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const finalSize = size ?? (isMobile ? Size.l : Size.m);
    const [inputValue, setInputValue] = useState<string | null>(value ?? null);
    const [error, setError] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const inputStyle = {
      height: `${sizeToHeight(finalSize)}px`,
    };

    useEffect(() => {
      const input = inputRef.current;
      if (!input || !setTimeError) return;

      const handleInvalid = () => {
        if (!inputValue) {
          setTimeError(TimeError.required);
          setError(true);
        }
      };

      input.addEventListener('invalid', handleInvalid);
      return () => input.removeEventListener('invalid', handleInvalid);
    }, [inputValue, setTimeError]);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      setInputValue(value ?? null);
      if (value) {
        edgesValidation();
      }
    }, [value]);

    /**
     * Function used to reformat the input value to a readable time value
     * Function is called on every change in input value
     */
    const reformatTime = (
      time: string | null,
      event: ChangeEvent<HTMLInputElement>,
    ): string | null => {
      if (time == null || time == '') {
        return null;
      }

      // First try to find a ':' in the input value to match a pattern like 'HH:mm'
      if (time.match(/:/g)) {
        // If matched, will then split the string using ':' to get an hour value and a minute value
        const [hours, minutes] = time.split(':');
        // Will reformat the string value using the first 2 char of each part locking the date in place
        // i.e. if a date if fully formed, the input will not change. User will have to erase char to change time value.
        return `${hours.slice(0, 2)}:${minutes.length ? minutes.slice(0, 2) : ''}`;
      }

      // If the pattern 'HH:mm' is not matched, will try to see if a ':' was in previous value
      if (inputValue != null && inputValue.match(/:/g)) {
        // If that was the case, means that the ':' was erased
        // Will then split the previous value using ':' to get a previous hour value and previous minute value
        // Erasing a ':' means that user tried to erased last digit of hour value, will reformat a time value accordingly
        const [previousHours, previousMinutes] = inputValue.split(':');
        // Reposition cursor depending on whether or not a char is  present in the hour value
        setTimeout(() => {
          event.target.focus();
          event.target.setSelectionRange(
            previousHours.slice(0, -1).length,
            previousHours.slice(0, -1).length,
          );
        }, 0);
        return (
          previousHours.slice(0, -1) +
          (previousMinutes.length ? `:${previousMinutes.slice(-2)}` : '')
        );
      }

      // If nothing neither current nor previous values have ':', then proceed as normal
      return time.length < 2
        ? time
        : parseInt(time) >= 24
          ? `${time[0]}:${time[1]}`
          : `${time}:`;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const newValue = event.target.value;
      const reformatedNewValue = reformatTime(newValue, event);

      if (reformatedNewValue == null) {
        setInputValue(reformatedNewValue);
        setError(false);
        return;
      }

      if (isStringValidAsTime(reformatedNewValue)) {
        setInputValue(reformatedNewValue);
      }
    };

    const edgesValidation = () => {
      const input = inputRef.current;
      if (!inputValue) return;

      const timeValue = stringToTime(inputValue);
      if (!timeValue) return;

      const validationError = isTimeStringWithinEdges(
        inputValue,
        min ?? undefined,
        max ?? undefined,
      );

      if (validationError) {
        setError(true);
        setTimeError?.(validationError);
        input?.setCustomValidity(errorText || ' ');
        return;
      }

      setError(false);
      setTimeError?.(TimeError.valid);
      input?.setCustomValidity('');
    };

    const handleBlur = () => {
      if (!inputValue) {
        onChange(null);
        edgesValidation();
        setError(!!required);
        if (setTimeError && required) {
          setTimeError(TimeError.required);
        }
        return;
      }

      const timeValue = stringToTime(inputValue);
      if (!timeValue) {
        setError(true);
        setTimeError?.(TimeError.formatTime);
        return;
      }

      edgesValidation();
      if (!error) {
        // Ensure the time string is properly formatted as HH:mm
        const [hours, minutes] = timeValue;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        onChange(formattedTime);
      }
    };

    useEffect(() => {
      edgesValidation();
    }, [min, max]);

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
            styles.flex,
            `padding-${finalSize}`,
            { ['cursorText']: !disabled },
            {
              [styles.error]: isError || error,
            },
          )}
          style={inputStyle}
          onClick={handleWrapperClick}
        >
          <input
            className={classNames(styles.input, `font-size-${finalSize}`, {
              [styles.centerPlaceholder]: centerPlaceholder,
            })}
            ref={inputRef}
            placeholder={placeholder}
            disabled={disabled}
            inputMode='numeric'
            type='text'
            value={inputValue ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            min={min ?? undefined}
            max={max ?? undefined}
            {...props}
          />
        </div>
      </ParentInput>
    );
  },
);

TimeStringInput.displayName = 'TimeStringInput';

export default TimeStringInput;
