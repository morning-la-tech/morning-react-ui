import {
  ChangeEvent,
  Dispatch,
  forwardRef,
  KeyboardEventHandler,
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
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import {
  isStringValidAsTime,
  isTimeWithinEdges,
  stringToTime,
} from 'morning-react-ui/utils/datetimeUtils';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from '../input.module.css';
import { BasicInputProps, InputProps } from '../propsTypes';
import useInput from '../textField/useInput';

type TimeInputProps = BasicInputProps &
  InputProps & {
    value?: Date | null;
    min?: string;
    max?: string;
    onChange: Dispatch<Date | null>;
  };

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      label,
      sublabel,
      placeholder = 'HH:mm',
      bold,
      size = Size.m,
      value,
      disabled,
      isError,
      min,
      max,
      onChange,
    },
    ref,
  ) => {
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

      const validAsTime = isStringValidAsTime(reformatedNewValue);
      setError(!validAsTime);

      if (validAsTime) {
        setError(!isTimeWithinEdges(reformatedNewValue, min, max));
        setInputValue(reformatedNewValue);
      }
    };

    const handleBlur = () => {
      if (!inputValue) {
        onChange(null);
        setError(false);
        return;
      }

      setError(!isTimeWithinEdges(inputValue, min, max));
      const [hours, minutes] = stringToTime(inputValue);
      onChange(
        isTimeWithinEdges(inputValue, min, max)
          ? setMilliseconds(
              setSeconds(setMinutes(setHours(new Date(), hours), minutes), 0),
              0,
            )
          : null,
      );
    };

    const handlePress: KeyboardEventHandler<HTMLInputElement> = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === 'Tab') {
        setInputValue(value ? format(value, 'HH:mm') : null);
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
            styles.flex,
            `padding-${size}`,
            { ['cursorText']: !disabled },
            {
              [styles.error]: isError || error,
            },
          )}
          onClick={handleWrapperClick}
        >
          <input
            className={classNames(styles.input, `font-size-${size}`)}
            ref={inputRef}
            placeholder={placeholder}
            disabled={disabled}
            type='text'
            value={inputValue ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyUp={handleBlur}
            onKeyDown={handlePress}
          />
        </div>
      </ParentInput>
    );
  },
);

TimeInput.displayName = 'TimeInput';

export default TimeInput;
