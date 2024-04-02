import React, {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  useState,
  useEffect,
  forwardRef,
} from 'react';
import classNames from 'classnames';
import { Size, sizeToNumber } from '@/utils/Enum';
import TextInput from '@/components/inputs/textField/TextInput';
import styles from '@/components/inputs/selectField/selectInput.module.css';
import { InputProps } from '@/components/inputs/types';
import { normalizeString } from '@/utils/stringUtils';

type SelectInputProps = InputProps & {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      label,
      sublabel,
      isLabelBold,
      size = Size.m,
      options,
      placeholder,
      disabled,
      onChange,
      value,
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [searchText, setSearchText] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isDropdownDisplayed, setIsDropdownDisplayed] =
      useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');

    const resetSearch = () => {
      setIsDropdownDisplayed(false);
      setHighlightedIndex(0);
      setSearchText('');
    };

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (
      e: ChangeEvent<HTMLInputElement>,
    ): void => {
      const text = e.target.value;
      setSearchText(text);
      if (text === '') {
        resetSearch();
      }
    };

    const selectOption = (option: string) => {
      onChange(option);
      resetSearch();
    };

    useEffect(() => {
      setInputValue(searchText);
    }, [searchText]);

    useEffect(() => {
      setSelectedOption(value);
    }, [value]);

    useEffect(() => {
      setInputValue(selectedOption);
    }, [selectedOption]);

    const handleFocus = () => {
      setIsDropdownDisplayed(true);
      if (selectedOption) {
        setInputValue('');
      }
      setSearchText('');
    };

    const handleBlur = () => {
      if (selectedOption) {
        setInputValue(selectedOption);
        setIsDropdownDisplayed(false);
      } else {
        resetSearch();
      }
      setHighlightedIndex(0);
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
    ) => {
      if (!isDropdownDisplayed) {
        return;
      }
      let newIndex = highlightedIndex;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          newIndex = (highlightedIndex + 1) % filteredOptions.length;
          break;
        case 'ArrowUp':
          event.preventDefault();
          newIndex =
            (highlightedIndex - 1 + filteredOptions.length) %
            filteredOptions.length;
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions.length > 0) {
            const selected = filteredOptions[newIndex];
            selectOption(selected);
          }
          break;
        case 'Escape':
          setIsDropdownDisplayed(false);
          break;
      }
      setHighlightedIndex(newIndex);
    };

    useEffect(() => {
      setFilteredOptions(options);
      setHighlightedIndex(0);
    }, [options]);

    useEffect(() => {
      if (!searchText) {
        setFilteredOptions(options);
      } else {
        const normalizedSearchText = normalizeString(searchText);
        const newFilteredOptions = options.filter((option) =>
          normalizeString(option).includes(normalizedSearchText),
        );
        setFilteredOptions(newFilteredOptions);
      }
    }, [searchText, options]);

    return (
      <div className={styles.wrapper} tabIndex={-1}>
        <TextInput
          placeholder={value || placeholder}
          size={size}
          value={inputValue}
          label={label}
          sublabel={sublabel}
          isLabelBold={isLabelBold}
          onChange={handleTextChange}
          onFocus={handleFocus}
          disabled={disabled}
          onBlur={handleBlur}
          showDropdownIcon
          isDropdownActive={isDropdownDisplayed}
          onKeyDown={(e) => handleKeyDown(e)}
          ref={ref}
        />
        {isDropdownDisplayed && (
          <div className={styles.dropdown}>
            {filteredOptions?.map((option, index) => (
              <div
                className={classNames(
                  styles.option,
                  `font-size-${size}`,
                  `padding-${size}`,
                  {
                    [styles.selectedOption]: value === option,
                    [styles.highlightedOption]: index === highlightedIndex,
                  },
                )}
                key={index}
                onMouseDown={() => selectOption(option)}
                onMouseMove={() => setHighlightedIndex(index)}
              >
                {option}
                {value === option && (
                  <span
                    className={styles.selectedOptionIcon}
                    style={{
                      width: `${sizeToNumber(size)}px`,
                      height: `${sizeToNumber(size)}px`,
                    }}
                  ></span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;
