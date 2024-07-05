import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { SelectsProps } from 'morning-react-ui/components/inputs/propsTypes';
import TextInput from 'morning-react-ui/components/inputs/textField/TextInput';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
import useSelectInput from './hooks/useSelectInput';
import styles from './selects.module.css';

type SelectInputProps = SelectsProps & {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
};

const SelectInput = ({
  label,
  sublabel,
  isLabelBold,
  size = Size.m,
  options,
  placeholder,
  disabled,
  onChange,
  selectedOption,
  rowToDisplay = 8,
  isError = false,
  emptyStateText = 'Aucun résultat dans la liste',
}: SelectInputProps) => {
  const {
    isDropdownDisplayed,
    inputValue,
    handleTextChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    filteredOptions,
    inputRef,
    setHighlightedIndex,
    highlightedIndex,
    maxHeight,
    optionRefs,
  } = useSelectInput({ options, selectedOption, size, onChange, rowToDisplay });

  const optionsRef = useRef(options);
  useEffect(() => {
    if (options !== optionsRef.current) {
      optionsRef.current = options;
    }
  }, [options]);

  return (
    <div className={styles.wrapper} tabIndex={-1}>
      <TextInput
        placeholder={selectedOption || placeholder}
        size={size}
        value={inputValue}
        label={label}
        sublabel={sublabel}
        isLabelBold={isLabelBold}
        onChange={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        showDropdownIcon
        isDropdownActive={isDropdownDisplayed}
        onKeyDown={(e) => handleKeyDown(e)}
        onMouseDown={(e) => e.preventDefault()}
        ref={inputRef}
        isError={isError}
      />
      {isDropdownDisplayed && (
        <div
          className={classNames(styles.dropdown, styles.selectList)}
          onKeyDown={(e) => handleKeyDown(e)}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            maxHeight: maxHeight ? `${maxHeight}px` : '',
          }}
        >
          {filteredOptions.length === 0 && (
            <span
              className={classNames(
                styles.option,
                `font-size-${size}`,
                `padding-${size}`,
                styles.emptyState,
              )}
            >
              {emptyStateText}
            </span>
          )}
          {filteredOptions.map((option, index) => (
            <div
              className={classNames(
                styles.option,
                `font-size-${size}`,
                `padding-${size}`,
                styles[`padding-${size}`],
                {
                  [styles.highlightedOption]: index === highlightedIndex,
                },
              )}
              key={index}
              onClick={() => {
                onChange(option);
                if (inputRef.current) {
                  inputRef.current.blur();
                }
              }}
              onMouseMove={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(null)}
              ref={optionRefs[index]}
            >
              <span className={classNames(`height-${size}`, styles.option)}>
                {option}
              </span>
              {selectedOption === option && (
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
};

export default SelectInput;
