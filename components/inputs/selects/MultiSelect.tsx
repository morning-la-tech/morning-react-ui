import classNames from 'classnames';
import { Size } from '@/utils/Enum';
import { atLeastOneTrue, setAllFalse } from '@/utils/selectionStateUtils';
import TextInput from '../textField/TextInput';
import MultiCheckbox from '../checkboxes/MultiCheckbox';
import styles from './selects.module.css';
import { SelectionState } from '../types';
import useMultiSelect from './hooks/useMultiSelect';

type MultiSelectProps = {
  label?: string;
  sublabel?: string;
  isLabelBold?: boolean;
  size?: Size;
  options: SelectionState;
  onChange: (newSelection: SelectionState) => void;
  placeholder?: string;
  rowToDisplay?: number;
};

const MultiSelect = ({
  label,
  sublabel,
  isLabelBold,
  size = Size.m,
  options,
  onChange,
  placeholder = 'MultiSelect',
  rowToDisplay = 8,
}: MultiSelectProps) => {
  const {
    keyboardNavigation,
    wrapperRef,
    checkboxRefs,
    setCheckboxRefs,
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
  } = useMultiSelect({ options, onChange, size, rowToDisplay });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <TextInput
        ref={inputRef}
        className={classNames(styles.textOverflowEllipsis, {
          [styles.focusedColor]: isDropdownDisplayed,
          [styles.oneTrueAndBlur]:
            atLeastOneTrue(options) && !isDropdownDisplayed,
          [styles.focus]: isDropdownDisplayed,
        })}
        placeholder={placeholder}
        label={label}
        sublabel={sublabel}
        isLabelBold={isLabelBold}
        size={size}
        value={inputValue}
        onChange={handleTextChange}
        onFocus={() => handleFocus()}
        onKeyDown={(e) => keyboardNavigation(e)}
        showClearButton={atLeastOneTrue(options)}
        showDropdownIcon
        isDropdownActive={isDropdownDisplayed}
        onClear={() => onChange(setAllFalse(options))}
        onCursorPositionChange={(position) => {
          setCursorPosition(position);
        }}
        setCursorPosition={adjustCursorPosition}
      />
      {isDropdownDisplayed && (
        <div
          className={styles.dropdown}
          style={{
            maxHeight: `${maxHeight}px`,
          }}
          onKeyDown={(e) => keyboardNavigation(e)}
          onMouseDown={handleDropdownMouseDown}
          onClick={makeHighlightedIndexSelected}
          tabIndex={-1}
        >
          <MultiCheckbox
            options={filteredOptions}
            size={size}
            onChange={(optionsToChange) => {
              onChange({ ...options, ...optionsToChange });
            }}
            styleCheckbox={{ padding: '6px 10px', cursor: 'pointer' }}
            hoveredIndex={highlightedIndex}
            setHoveredIndex={setHighlightedIndex}
            isSelectAll={displaySelectAll}
            checkboxRefs={checkboxRefs}
            setCheckboxRefs={setCheckboxRefs}
          />
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
