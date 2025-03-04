import {
  ChangeEvent,
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  format,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import {
  isStringValidAsTime,
  isTimeWithinEdges,
  stringToTime,
} from 'morning-react-ui/utils/datetimeUtils';
import { Size } from 'morning-react-ui/utils/Enum';
import { TimeError } from 'morning-react-ui/utils/error';
import styles from '../input.module.css';
import { BasicInputProps, InputProps } from '../propsTypes';
import useInput from '../textField/useInput';

type TimeInputProps = {
  value?: Date | null;
  min?: string;
  max?: string;
  setTimeError?: (error: TimeError | null) => void;
  onChange: Dispatch<Date | null>;
} & BasicInputProps &
  InputProps;

type TimeInputHtmlProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof TimeInputProps
> &
  TimeInputProps;

const TimeInput = forwardRef<HTMLInputElement, TimeInputHtmlProps>(
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
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const finalSize = size ?? (isMobile ? Size.l : Size.m);
    const [inputValue, setInputValue] = useState<string | null>(
      value ? format(value, 'HH:mm') : null,
    );
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const [error, setError] = useState<boolean>(false);

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

    const handleBlur = () => {
      if (!inputValue) {
        onChange(null);
        setError(false);
        if (setTimeError) setTimeError(null);
        return;
      }

      const edgesError = isTimeWithinEdges(inputValue, min, max);
      if (setTimeError) {
        if (edgesError) {
          setTimeError(edgesError);
        }
        if (
          !isStringValidAsTime(inputValue) ||
          inputValue.split(':').some((part) => part.length !== 2)
        ) {
          setTimeError(TimeError.formatTime);
        }
      }

      const hasError =
        // First we check if the input is valid as time
        !isStringValidAsTime(inputValue) ||
        // Second we check if the input has 2 digits in the hour and minute part
        inputValue.split(':').some((part) => part.length !== 2) ||
        // Then we check if the input is within the min and max values
        !!isTimeWithinEdges(inputValue, min, max);

      setError(hasError);
      const [hours, minutes] = stringToTime(inputValue);
      onChange(
        !hasError
          ? setMilliseconds(
              setSeconds(setMinutes(setHours(new Date(), hours), minutes), 0),
              0,
            )
          : null,
      );
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
            styles.flex,
            `padding-${finalSize}`,
            { ['cursorText']: !disabled },
            {
              [styles.error]: isError || error,
            },
          )}
          onClick={handleWrapperClick}
        >
          <input
            className={classNames(styles.input, `font-size-${finalSize}`)}
            ref={inputRef}
            placeholder={placeholder}
            disabled={disabled}
            type='text'
            value={inputValue ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          />
        </div>
      </ParentInput>
    );
  },
);

TimeInput.displayName = 'TimeInput';

export default TimeInput;
