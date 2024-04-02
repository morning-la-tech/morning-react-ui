import classNames from 'classnames';
import { Size, sizeToNumber } from '@/utils/Enum';
import TextInput from '@/components/inputs/textField/TextInput';
import { InputProps } from '@/components/inputs/types';
import styles from './selects.module.css';
import useSelectInput from './hooks/useSelectInput';

type SelectInputProps = InputProps & {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
  rowToDisplay?: number;
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
          {filteredOptions?.map((option, index) => (
            <div
              className={classNames(
                styles.option,
                `font-size-${size}`,
                `padding-${size}`,
                {
                  [styles.selectedOption]: selectedOption === option,
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
              <span style={{ height: '20px' }}>{option}</span>
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
