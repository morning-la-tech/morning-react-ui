import {
  createRef,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SelectOption } from 'morning-react-ui/types';
import { Size } from 'morning-react-ui/utils/Enum';
import { InputError } from 'morning-react-ui/utils/error';
import { normalizeString } from 'morning-react-ui/utils/stringUtils';

type UseSelectInputProps = {
  options: SelectOption[];
  selectedOption?: SelectOption | null;
  size: Size;
  onChange: (value: SelectOption) => void;
  rowToDisplay: number;
  required?: boolean;
  setSelectError?: (error: InputError) => void;
};

const useSelectInput = ({
  options,
  selectedOption,
  onChange,
  required,
  setSelectError,
}: UseSelectInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(0);
  const [inputValue, setInputValue] = useState<string>(
    selectedOption?.label || '',
  );

  useEffect(() => {
    setInputValue(selectedOption?.label || '');
  }, [selectedOption]);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        normalizeString(option.label).includes(normalizeString(inputValue)),
      ),
    [inputValue, options],
  );

  const optionRefs = useMemo(
    () => filteredOptions.map(() => createRef<HTMLDivElement>()),
    [filteredOptions],
  );

  const handleTextChange = (value: string) => {
    setInputValue(value);
    setHighlightedIndex(0);
  };

  const handleFocus = () => {
    handleTextChange('');
    setIsDropdownDisplayed(true);
  };

  const handleBlur = (nextSelectedOption?: SelectOption | null) => {
    setIsDropdownDisplayed(false);
    handleTextChange(nextSelectedOption?.label || '');
    if (setSelectError) {
      if (required && !nextSelectedOption) {
        setSelectError(InputError.required);
      }
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    let newHighlightedIndex = highlightedIndex;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newHighlightedIndex =
          ((highlightedIndex ?? -1) + 1) % filteredOptions.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        newHighlightedIndex = (highlightedIndex ?? filteredOptions.length) - 1;
        if (newHighlightedIndex < 0)
          newHighlightedIndex = filteredOptions.length - 1;
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex !== null && filteredOptions[highlightedIndex]) {
          handleSelect();
        }
        return;
      case 'Escape':
        setIsDropdownDisplayed(false);
        handleBlur();
        return;
    }

    console.log('toto');
    setHighlightedIndex(newHighlightedIndex);
    if (newHighlightedIndex)
      optionRefs[newHighlightedIndex]?.current?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
  };

  const handleSelect = () => {
    if (highlightedIndex === null) return;
    inputRef.current?.blur();
    onChange(filteredOptions[highlightedIndex]);
    handleTextChange(filteredOptions[highlightedIndex].label);
    setIsDropdownDisplayed(false);
  };

  return {
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
    handleSelect,
    optionRefs,
    setIsDropdownDisplayed,
  };
};

export default useSelectInput;
