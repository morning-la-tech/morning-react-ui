import {
  ChangeEventHandler,
  createRef,
  KeyboardEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SelectOption } from 'morning-react-ui/types';
import { Size } from 'morning-react-ui/utils/Enum';
import { InputError } from 'morning-react-ui/utils/error';
import { normalizeString } from 'morning-react-ui/utils/stringUtils';

// Describes the props our useMultiSelect hook expects.
// 'options': full list of SelectOption items.
// 'values': the currently selected values (strings).
// 'onChange': callback to update the selected values.
// 'size': the size category for styling (not used in the logic here).
// 'rowToDisplay': number of options displayed before scrolling.
// 'required': if true, a validation error is shown if no selection.
// 'setMultiSelectError': method to set external error state.
type UseMultiSelectProps = {
  options: SelectOption[];
  values: string[];
  onChange: (newValues: string[]) => void;
  size: Size;
  rowToDisplay: number;
  required?: boolean;
  setMultiSelectError?: (error: InputError) => void;
};

// Represents the position of a selected label in the inputValue.
// 'label': the string label,
// 'start': start index in inputValue,
// 'end': end index (exclusive) in inputValue.
type LabelPosition = {
  label: string;
  start: number;
  end: number;
};

// Manages multi-select behavior via an input that displays selected labels.
const useMultiSelect = ({
  options,
  values,
  onChange,
  rowToDisplay,
  required,
  setMultiSelectError,
}: UseMultiSelectProps) => {
  // Reference to the main wrapper, for detecting outside clicks.
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Reference to the input element.
  const inputRef = useRef<HTMLInputElement>(null);

  // The current text state of the input.
  const [inputValue, setInputValue] = useState('');

  // The filtered list of options based on user-typed text.
  const [filteredOptions, setFilteredOptions] =
    useState<SelectOption[]>(options);

  // Indicates whether the dropdown is open.
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);

  // Index for keyboard highlighting in the dropdown.
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  // Tracks the cursor position within inputValue.
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  // If true, we show a "select all" item at the top of the dropdown.
  const [displaySelectAll, setDisplaySelectAll] = useState(true);

  // An array of refs for each checkbox in the dropdown (one for each option +1 for select all).
  const [checkboxRefs, setCheckboxRefs] = useState<
    RefObject<HTMLInputElement | null>[]
  >(Array.from({ length: options.length + 1 }, () => createRef()));

  // A place to store the cursor position in special cases.
  const [savedCursorPosition, setSavedCursorPosition] = useState<number | null>(
    null,
  );

  // Max height for the dropdown, computed dynamically.
  const [maxHeight, setMaxHeight] = useState(0);

  // A list of label positions for each selected label in the inputValue.
  const [labelPositions, setLabelPositions] = useState<LabelPosition[]>([]);

  // Builds a string containing all selected labels plus ", " at the end, if any.
  function buildSelectedLabelString() {
    const selectedLabels = options
      .filter((o) => values.includes(o.id))
      .map((o) => o.label);
    return selectedLabels.length ? selectedLabels.join(', ') + ', ' : '';
  }

  // Builds the labelPositions array by tracking each label's start/end in inputValue.
  function buildPositions() {
    const selectedOpts = options.filter((o) => values.includes(o.id));
    const positions: LabelPosition[] = [];
    let offset = 0;
    for (const opt of selectedOpts) {
      const piece = opt.label + ', ';
      positions.push({
        label: opt.label,
        start: offset,
        end: offset + piece.length,
      });
      offset += piece.length;
    }
    return positions;
  }

  // Extracts the typed part in the input, ignoring the portion that belongs to selected labels.
  function getTypedPart(inputVal: string) {
    const selectedLabelString = buildSelectedLabelString();
    if (inputVal.startsWith(selectedLabelString)) {
      return inputVal.slice(selectedLabelString.length);
    }
    return inputVal;
  }

  // Handler for text changes in the input.
  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setCursorPosition(savedCursorPosition ?? newValue.length);
    setSavedCursorPosition(null);

    // Filter out options based on the newly typed text.
    const typedPart = getTypedPart(newValue);
    const newFilteredOptions = filterOptionsByKey(typedPart);
    setFilteredOptions(newFilteredOptions);
    setDisplaySelectAll(newFilteredOptions.length === options.length);
  };

  // If required = true and no values are selected, set an error.
  useEffect(() => {
    if (setMultiSelectError) {
      setMultiSelectError(
        required && values.length === 0
          ? InputError.required
          : InputError.valid,
      );
    }
  }, [required, inputValue]);

  // Attach an 'invalid' listener if using HTML validations.
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInvalid = (event: Event) => {
      event.preventDefault();
      if (setMultiSelectError) {
        setMultiSelectError(InputError.required);
      }
    };

    input.addEventListener('invalid', handleInvalid);
    return () => {
      input.removeEventListener('invalid', handleInvalid);
    };
  }, [setMultiSelectError]);

  // Filters options by label or value, using a normalized substring match.
  const filterOptionsByKey = (search: string): SelectOption[] => {
    const inputValueLower = normalizeString(search);
    return options.filter(
      (o) =>
        normalizeString(o.label).includes(inputValueLower) ||
        normalizeString(o.id).includes(inputValueLower),
    );
  };

  // Closes the dropdown if the user clicks outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownDisplayed(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll the input so that the cursor remains visible.
  const adjustCursorPosition = useCallback(() => {
    const input = inputRef.current;
    if (input && cursorPosition !== null && isDropdownDisplayed) {
      input.setSelectionRange(cursorPosition, cursorPosition);

      const scrollPadding = input.offsetWidth * 0.05;
      const cursorProportion =
        inputValue.length > 0 ? cursorPosition / inputValue.length : 0;
      const idealScrollPosition =
        input.scrollWidth * cursorProportion - scrollPadding;

      if (
        idealScrollPosition < input.scrollLeft + scrollPadding ||
        idealScrollPosition >
          input.scrollLeft + input.offsetWidth - scrollPadding
      ) {
        input.scrollLeft =
          idealScrollPosition - input.offsetWidth / 2 + scrollPadding;
      }
    }
  }, [cursorPosition, inputValue, isDropdownDisplayed]);

  // Sets the new highlighted index, and scrolls to it.
  const updateHighlightedIndex = (index: number | null) => {
    setHighlightedIndex(index);
    if (index != null && checkboxRefs[index]?.current) {
      checkboxRefs[index].current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
    }
  };

  // Calculates dropdown maxHeight so only 'rowToDisplay' items are shown at once.
  useEffect(() => {
    if (checkboxRefs.length === 0 || !isDropdownDisplayed) {
      setMaxHeight(0);
      return;
    }

    const rafId = requestAnimationFrame(() => {
      const refs = checkboxRefs
        .map((r) => r.current)
        .filter(Boolean) as HTMLInputElement[];
      if (refs.length === 0) {
        setMaxHeight(0);
        return;
      }

      const paddingBottom = 15;
      const lastRef = refs[Math.min(rowToDisplay, refs.length) - 1];
      const firstRef = refs[0];

      if (lastRef && firstRef) {
        setMaxHeight(
          lastRef.offsetTop -
            firstRef.offsetTop +
            lastRef.offsetHeight +
            paddingBottom,
        );
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [checkboxRefs, isDropdownDisplayed, rowToDisplay]);

  // On focus, open the dropdown, highlight first item, and move cursor to the end.
  const handleFocus = () => {
    setIsDropdownDisplayed(true);
    setHighlightedIndex(0);
    setTimeout(() => {
      const input = inputRef.current;
      if (input) {
        const endOfText = input.value.length;
        input.setSelectionRange(endOfText, endOfText);
      }
    }, 0);
  };

  // On blur, close the dropdown and set an error if 'required' is true but nothing selected.
  const handleBlur = () => {
    setIsDropdownDisplayed(false);
    setHighlightedIndex(null);
    if (setMultiSelectError && required && values.length === 0) {
      setMultiSelectError(InputError.required);
    }
  };

  // Moves the highlight one step downward in the dropdown list.
  const handleTabOrArrowDown = () => {
    if (highlightedIndex === null) {
      updateHighlightedIndex(0);
    } else {
      const totalCount = filteredOptions.length + (displaySelectAll ? 1 : 0);
      const newIndex = (highlightedIndex + 1) % totalCount;
      updateHighlightedIndex(newIndex);
    }
  };

  // Moves the highlight one step upward in the dropdown list.
  const handleArrowUp = () => {
    if (highlightedIndex === null) return;
    const totalCount = filteredOptions.length + (displaySelectAll ? 1 : 0);
    const newIndex = (highlightedIndex + totalCount - 1) % totalCount;
    updateHighlightedIndex(newIndex);
  };

  // Selects the currently highlighted item.
  const makeHighlightedIndexSelected = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus();
    }
    if (highlightedIndex === null || filteredOptions.length < 1) {
      return;
    }
    // If 'select all' is visible and highlighted.
    if (displaySelectAll && highlightedIndex === 0) {
      if (values.length > 0) {
        onChange([]);
      } else {
        onChange(options.map((o) => o.id));
      }
      return;
    }
    const indexInFiltered = highlightedIndex - (displaySelectAll ? 1 : 0);
    if (indexInFiltered < 0 || indexInFiltered >= filteredOptions.length) {
      return;
    }
    const optionValue = filteredOptions[indexInFiltered].id;
    if (values.includes(optionValue)) {
      onChange(values.filter((v) => v !== optionValue));
    } else {
      onChange([...values, optionValue]);
    }
  };

  // On Enter, picks the highlighted item.
  const handleEnter = () => {
    if (highlightedIndex === null || filteredOptions.length < 1) {
      return;
    }
    makeHighlightedIndexSelected();
  };

  // Closes dropdown on Escape, and removes focus.
  const handleEscape = () => {
    setIsDropdownDisplayed(false);
    inputRef.current?.blur();
  };

  // Moves cursor left by 1 character.
  const handleArrowLeft = () => {
    if (cursorPosition === null) return;
    setCursorPosition(Math.max(0, cursorPosition - 1));
  };

  // Moves cursor right by 1 character.
  const handleArrowRight = () => {
    if (cursorPosition === null) return;
    setCursorPosition(Math.min(inputValue.length, cursorPosition + 1));
  };

  // On Backspace, remove an entire label if the cursor is within it, else remove one character.
  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    if (cursorPosition === null) return;
    if (cursorPosition === 0) return;
    e.preventDefault();
    const found = labelPositions.find(
      (pos) => cursorPosition > pos.start && cursorPosition <= pos.end,
    );
    if (found) {
      const optToRemove = options.find((o) => o.label === found.label);
      if (optToRemove) {
        onChange(values.filter((v) => v !== optToRemove.id));
      }
      setCursorPosition(found.start);
    } else {
      const newVal =
        inputValue.slice(0, cursorPosition - 1) +
        inputValue.slice(cursorPosition);
      setInputValue(newVal);
      setCursorPosition(cursorPosition - 1);

      // Re-filter the options based on the updated typed part.
      const typedPartAfter = getTypedPart(newVal);
      const newFiltered = filterOptionsByKey(typedPartAfter);
      setFilteredOptions(newFiltered);
      setDisplaySelectAll(newFiltered.length === options.length);
    }
  };

  // On Delete, remove an entire label if the cursor is within it, else remove one character.
  const handleDelete = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    if (cursorPosition === null) return;
    if (cursorPosition >= inputValue.length) return;
    e.preventDefault();
    const found = labelPositions.find(
      (pos) => cursorPosition >= pos.start && cursorPosition < pos.end,
    );
    if (found) {
      const optToRemove = options.find((o) => o.label === found.label);
      if (optToRemove) {
        onChange(values.filter((v) => v !== optToRemove.id));
      }
      setCursorPosition(found.start);
    } else {
      const newVal =
        inputValue.slice(0, cursorPosition) +
        inputValue.slice(cursorPosition + 1);
      setInputValue(newVal);

      // Re-filter the options based on the updated typed part.
      const typedPartAfter = getTypedPart(newVal);
      const newFiltered = filterOptionsByKey(typedPartAfter);
      setFilteredOptions(newFiltered);
      setDisplaySelectAll(newFiltered.length === options.length);
    }
  };

  // Default behavior if user types while the cursor is not at the end.
  const handleDefault = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    if (cursorPosition === null) return;
    if (cursorPosition < inputValue.length) {
      e.preventDefault();
    }
  };

  // Rebuilds everything when 'options' or 'values' change.
  useEffect(() => {
    setFilteredOptions(options);

    const labelList = options
      .filter((o) => values.includes(o.id))
      .map((o) => o.label)
      .join(', ');

    const newInputValue = labelList ? labelList + ', ' : '';
    setInputValue(newInputValue);
    setCursorPosition(newInputValue.length);
    setDisplaySelectAll(true);
    setCheckboxRefs(
      Array.from({ length: options.length + 1 }, () => createRef()),
    );

    const built = buildPositions();
    setLabelPositions(built);
  }, [options, values]);

  // Prevent blur if we click inside the dropdown.
  const handleDropdownMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Main keyboard navigation handler.
  const keyboardNavigation = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    switch (e.key) {
      case 'Tab':
      case 'ArrowDown':
        e.preventDefault();
        handleTabOrArrowDown();
        break;
      case 'ArrowUp':
        e.preventDefault();
        handleArrowUp();
        break;
      case 'Enter':
        e.preventDefault();
        handleEnter();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        handleArrowLeft();
        break;
      case 'ArrowRight':
        e.preventDefault();
        handleArrowRight();
        break;
      case 'Escape':
        handleEscape();
        break;
      case 'Backspace':
        handleBackspace(e);
        break;
      case 'Delete':
        handleDelete(e);
        break;
      default:
        handleDefault(e);
        break;
    }
  };

  return {
    checkboxRefs,
    setCheckboxRefs,
    keyboardNavigation,
    adjustCursorPosition,
    isDropdownDisplayed,
    filteredOptions,
    handleTextChange,
    wrapperRef,
    inputRef,
    inputValue,
    setCursorPosition,
    highlightedIndex,
    setHighlightedIndex,
    displaySelectAll,
    makeHighlightedIndexSelected,
    handleDropdownMouseDown,
    handleFocus,
    handleBlur,
    maxHeight,
  };
};

export default useMultiSelect;
