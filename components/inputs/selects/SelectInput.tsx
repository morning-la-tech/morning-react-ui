import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import { SelectsProps } from 'morning-react-ui/components/inputs/propsTypes';
import TextInput from 'morning-react-ui/components/inputs/textField/TextInput';
import { SelectOption } from 'morning-react-ui/types';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
import { InputError } from 'morning-react-ui/utils/error';
import useSelectInput from './hooks/useSelectInput';
import styles from './selects.module.css';

type SelectInputProps = SelectsProps & {
  options: SelectOption[];
  selectedOption?: SelectOption | null;
  onChange: (value: SelectOption) => void;
  required?: boolean;
  setSelectError?: (error: InputError) => void;
};

const SelectInput = ({
  label,
  sublabel,
  bold,
  size,
  options,
  placeholder,
  disabled,
  onChange,
  selectedOption,
  rowToDisplay = 10,
  isError = false,
  errorText,
  emptyStateText = 'Aucun résultat dans la liste',
  required,
  setSelectError,
  centerPlaceholder = false,
}: SelectInputProps) => {
  const isMobile = useIsMobile();
  const finalSize = size ?? (isMobile ? Size.l : Size.m);

  const {
    isDropdownDisplayed,
    inputValue,
    handleSelect,
    handleTextChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    filteredOptions,
    inputRef,
    setHighlightedIndex,
    highlightedIndex,
    optionRefs,
    maxHeight,
  } = useSelectInput({
    options,
    selectedOption,
    size: finalSize,
    onChange,
    rowToDisplay,
    required,
    setSelectError,
  });

  return (
    <div className={styles.wrapper} tabIndex={-1}>
      <TextInput
        placeholder={selectedOption ? selectedOption.label : placeholder}
        size={finalSize}
        value={inputValue}
        label={label}
        sublabel={sublabel}
        bold={bold}
        onChange={(value) => handleTextChange(value.target.value)}
        onFocus={handleFocus}
        onBlur={() => handleBlur(selectedOption)}
        disabled={disabled}
        showDropdownIcon
        isDropdownActive={isDropdownDisplayed}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        isError={isError}
        errorText={errorText}
        required={required}
        centerPlaceholder={centerPlaceholder}
      />
      {isDropdownDisplayed && (
        <div
          className={classNames(styles.dropdown, styles.selectList)}
          onMouseDown={(e) => e.preventDefault()}
          style={{ maxHeight: maxHeight ? `${maxHeight}px` : 'auto' }}
        >
          {filteredOptions.length === 0 && (
            <span
              className={classNames(
                styles.option,
                `font-size-${finalSize}`,
                `padding-${finalSize}`,
                styles.emptyState,
              )}
            >
              {emptyStateText}
            </span>
          )}
          {filteredOptions.map((option, index) => (
            <div
              key={option.id}
              ref={optionRefs[index]}
              className={classNames(
                styles.option,
                `font-size-${finalSize}`,
                `padding-${finalSize}`,
                { [styles.highlightedOption]: index === highlightedIndex },
              )}
              onClick={() => handleSelect()}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(null)}
            >
              <span
                className={classNames(`height-${finalSize}`, styles.option)}
              >
                {option.label}
              </span>
              {selectedOption?.id === option.id && (
                <span
                  className={styles.selectedOptionIcon}
                  style={{
                    width: `${sizeToNumber(finalSize)}px`,
                    height: `${sizeToNumber(finalSize)}px`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
