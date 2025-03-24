import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import TextInput from 'morning-react-ui/components/inputs/textField/TextInput';
import MultiCheckbox from 'morning-react-ui/components/inputs/toggleInputs/MultiCheckbox';
import { ComplexOption } from 'morning-react-ui/types/dataTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import { InputError } from 'morning-react-ui/utils/error';
import { SelectsProps } from '../propsTypes';
import useMultiSelect from './hooks/useMultiSelect';
import styles from './selects.module.css';

type MultiSelectProps = SelectsProps & {
  options: ComplexOption[];
  values: string[];
  onChange: (newSelection: string[]) => void;
  required?: boolean;
  setMultiSelectError?: (error: InputError) => void;
  placeholder?: string;
  errorText?: string;
  rowToDisplay?: number;
  emptyStateText?: string;
  isError?: boolean;
  disabled?: boolean;
};

const MultiSelect = ({
  label,
  sublabel,
  bold,
  size,
  disabled = false,
  options,
  values,
  onChange,
  isError,
  placeholder = 'MultiSelect',
  rowToDisplay = 8,
  emptyStateText = 'Aucun résultat dans la liste',
  errorText,
  required,
  setMultiSelectError,
}: MultiSelectProps) => {
  const isMobile = useIsMobile();
  const finalSize = size ?? (isMobile ? Size.l : Size.m);

  const {
    keyboardNavigation,
    wrapperRef,
    checkboxRefs,
    inputRef,
    inputValue,
    handleTextChange,
    isDropdownDisplayed,
    setCursorPosition,
    adjustCursorPosition,
    filteredOptions,
    highlightedIndex,
    setHighlightedIndex,
    displaySelectAll,
    makeHighlightedIndexSelected,
    handleDropdownMouseDown,
    maxHeight,
    handleFocus,
    handleBlur,
  } = useMultiSelect({
    options,
    values,
    onChange,
    size: finalSize,
    rowToDisplay,
    required,
    setMultiSelectError,
  });

  const hasAtLeastOneSelected = values.length > 0;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <TextInput
        ref={inputRef}
        className={classNames(styles.textOverflowEllipsis, {
          [styles.focusedColor]: isDropdownDisplayed,
          [styles.oneTrueAndBlur]:
            hasAtLeastOneSelected && !isDropdownDisplayed,
          [styles.focus]: isDropdownDisplayed,
        })}
        placeholder={placeholder}
        label={label}
        sublabel={sublabel}
        bold={bold}
        size={finalSize}
        value={inputValue}
        onChange={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={(e) => keyboardNavigation(e)}
        showClearButton={hasAtLeastOneSelected}
        showDropdownIcon
        isDropdownActive={isDropdownDisplayed}
        onClear={() => onChange([])}
        onCursorPositionChange={(position) => {
          setCursorPosition(position);
        }}
        setCursorPosition={adjustCursorPosition}
        isError={isError}
        disabled={disabled}
        errorText={errorText}
        required={required}
      />
      {isDropdownDisplayed && (
        <div
          className={styles.dropdown}
          style={{ maxHeight: `${maxHeight}px` }}
          onKeyDown={(e) => keyboardNavigation(e)}
          onMouseDown={handleDropdownMouseDown}
          onClick={makeHighlightedIndexSelected}
          tabIndex={-1}
        >
          {filteredOptions.length > 0 ? (
            <MultiCheckbox
              options={filteredOptions}
              selectedValues={values}
              size={finalSize}
              onChange={(newSelectedValues) => {
                onChange(newSelectedValues);
              }}
              styleCheckbox={{ padding: '6px 10px', cursor: 'pointer' }}
              hoveredIndex={highlightedIndex}
              setHoveredIndex={setHighlightedIndex}
              isSelectAll={displaySelectAll}
              checkboxRefs={checkboxRefs}
            />
          ) : (
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
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
