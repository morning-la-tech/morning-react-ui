import {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  useEffect,
  KeyboardEvent,
  useRef,
  createRef,
} from 'react';
import { SelectOption } from 'morning-react-ui/types';
import { Size } from 'morning-react-ui/utils/Enum';
import { normalizeString } from 'morning-react-ui/utils/stringUtils';

type UseSelectInputProps = {
  options: SelectOption[];
  selectedOption: SelectOption | null;
  size: Size;
  onChange: (value: SelectOption) => void;
  rowToDisplay: number;
};

const useSelectInput = ({
  options,
  selectedOption,
  onChange,
  rowToDisplay,
  size,
}: UseSelectInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(0);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLDivElement>[]
  >([]);

  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownDisplayed, setIsDropdownDisplayed] =
    useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(0);

  const handleFocus = () => {
    setInputValue('');
    setIsDropdownDisplayed(true);
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);

  const handleBlur = () => {
    setInputValue(selectedOption ? selectedOption.label : '');
    setHighlightedIndex(0);
    setIsDropdownDisplayed(false);
  };

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue: string = e.target.value;
    setInputValue(newValue);
  };

  useEffect(() => {
    const normalizedSearchText = normalizeString(inputValue);
    const newFilteredOptions = options.filter((option) =>
      normalizeString(option.label).includes(normalizedSearchText),
    );
    setFilteredOptions(newFilteredOptions);
  }, [inputValue, options]);

  const handleArrowDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    if (highlightedIndex === null) {
      setHighlightedIndex(0);
      return;
    }
    setHighlightedIndex((highlightedIndex + 1) % filteredOptions.length);
  };

  const handleArrowUp = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    if (highlightedIndex === null) {
      setHighlightedIndex(0);
      return;
    }
    setHighlightedIndex(
      (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length,
    );
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    e.preventDefault();
    if (highlightedIndex === null) {
      return;
    }
    if (filteredOptions.length > 0) {
      onChange(filteredOptions[highlightedIndex]);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    switch (event.key) {
      case 'Tab':
      case 'ArrowDown':
        handleArrowDown(event);
        break;
      case 'ArrowUp':
        handleArrowUp(event);
        break;
      case 'Enter':
        handleEnter(event);
        break;
      case 'Escape':
        setIsDropdownDisplayed(false);
        if (inputRef.current) {
          inputRef.current.blur();
        }
        break;
    }
  };

  useEffect(() => {
    setInputValue(selectedOption ? selectedOption.label : '');
    setIsDropdownDisplayed(false);
  }, [selectedOption]);

  useEffect(() => {
    setOptionRefs(filteredOptions.map(() => createRef<HTMLDivElement>()));
  }, [filteredOptions.length]);

  // Make the highlighted index scroll into view
  useEffect(() => {
    if (highlightedIndex != null && highlightedIndex < optionRefs.length) {
      const ref = optionRefs[highlightedIndex];
      if (ref && ref.current) {
        ref.current.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
        });
      }
    }
  }, [highlightedIndex, optionRefs]);

  useEffect(() => {
    if (optionRefs.length < rowToDisplay) {
      return;
    }
    if (optionRefs[rowToDisplay + 1]?.current) {
      const last = optionRefs[rowToDisplay + 1].current?.offsetTop;
      const first = optionRefs[0]?.current?.offsetTop;
      if (last && first) {
        setMaxHeight(last - first);
      }
    }
  }, [size, rowToDisplay, optionRefs, isDropdownDisplayed]);

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
    maxHeight,
    optionRefs,
  };
};

export default useSelectInput;
