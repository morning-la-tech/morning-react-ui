import {
  ChangeEvent,
  ChangeEventHandler,
  createRef,
  KeyboardEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SelectionState } from 'morning-react-ui/types/dataTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import { InputError } from 'morning-react-ui/utils/error';
import { selectionStateTrueToString } from 'morning-react-ui/utils/selectionState/selectionStateConverters';
import {
  atLeastOneTrue,
  getCurrentElementFromCursorPosition,
  getElementPositionInSelectionState,
  mergeAndValidateStates,
} from 'morning-react-ui/utils/selectionState/selectionStateInfo';
import {
  setAllFalse,
  setAllTrue,
  toggleSelectionStateAtIndex,
  updateSelectionState,
} from 'morning-react-ui/utils/selectionState/selectionStateModifiers';
import { normalizeString } from 'morning-react-ui/utils/stringUtils';

type UseMultiSelectProps = {
  options: SelectionState;
  onChange: (newSelection: SelectionState) => void;
  size: Size;
  rowToDisplay: number;
  required?: boolean;
  setMultiSelectError?: (error: InputError) => void;
};

const useMultiSelect = ({
  options,
  onChange,
  rowToDisplay,
  required,
  setMultiSelectError,
}: UseMultiSelectProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] =
    useState<SelectionState>(options);
  const validatedOptions = mergeAndValidateStates(options, options);
  const validatedOptionsString = selectionStateTrueToString(validatedOptions);
  const [isDropdownDisplayed, setIsDropdownDisplayed] =
    useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [displaySelectAll, setDisplaySelectAll] = useState(true);
  const [checkboxRefs, setCheckboxRefs] = useState<
    RefObject<HTMLInputElement | null>[]
  >(Array.from({ length: Object.keys(options).length + 1 }, () => createRef()));
  const [savedCursorPosition, setSavedCursorPosition] = useState<number | null>(
    null,
  );
  const [maxHeight, setMaxHeight] = useState(0);

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue: string = e.target.value;
    setInputValue(newValue);
    setCursorPosition(savedCursorPosition ?? newValue.length);
    setSavedCursorPosition(null);

    const newFilteredOptions = filterSelectionStateByKey(
      newValue.replace(validatedOptionsString, ''),
    );
    setFilteredOptions(newFilteredOptions);

    setDisplaySelectAll(
      JSON.stringify(options) === JSON.stringify(newFilteredOptions),
    );
  };

  // Filter options with a string
  const filterSelectionStateByKey = (value: string): SelectionState => {
    const inputValueLower = normalizeString(value);
    return Object.keys(options)
      .filter((key) => normalizeString(key).includes(inputValueLower))
      .reduce((acc: SelectionState, key) => {
        acc[key] = options[key];
        return acc;
      }, {});
  };

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

  // Move cursor & camera
  const adjustCursorPosition = useCallback(() => {
    const input = inputRef.current;
    if (input && cursorPosition !== null && isDropdownDisplayed) {
      // Assurez-vous que le curseur est défini correctement
      input.setSelectionRange(cursorPosition, cursorPosition);

      // Définition d'un "padding" pour le défilement, ici 20% de la largeur de l'input
      const scrollPadding = input.offsetWidth * 0.05;

      // Calcul du défilement nécessaire pour maintenir le curseur dans le "padding" visuel
      // La position du curseur en proportion de la longueur totale du texte
      const cursorProportion = cursorPosition / inputValue.length;

      // Calcul de la position de défilement idéale en fonction de la proportion du curseur
      const idealScrollPosition =
        input.scrollWidth * cursorProportion - scrollPadding;

      // Ajustement du défilement pour essayer de centrer le curseur dans le "padding" visuel
      if (
        idealScrollPosition < input.scrollLeft + scrollPadding ||
        idealScrollPosition >
          input.scrollLeft + input.offsetWidth - scrollPadding
      ) {
        input.scrollLeft =
          idealScrollPosition - input.offsetWidth / 2 + scrollPadding;
      }
    }
  }, [cursorPosition, inputValue.length, isDropdownDisplayed]);

  const updateHighlightedIndex = (index: number | null) => {
    setHighlightedIndex(index);

    if (index != null && checkboxRefs[index]?.current) {
      checkboxRefs[index].current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
    }
  };

  // Calculate the height to display the right number of elements before scrolling
  useEffect(() => {
    console.log('===== [DEBUG] Calcul de maxHeight lancé =====');
    console.log('isDropdownDisplayed :', isDropdownDisplayed);
    console.log('Nombre de checkboxRefs :', checkboxRefs.length);
    console.log('rowToDisplay :', rowToDisplay);

    if (!isDropdownDisplayed || checkboxRefs.length === 0) {
      console.log(
        '🚨 Pas de refs disponibles ou dropdown fermé. maxHeight = 0',
      );
      setMaxHeight(0);
      return;
    }

    const rafId = requestAnimationFrame(() => {
      const refs = checkboxRefs
        .map((ref, index) => {
          console.log(`🔎 Vérification de ref ${index} :`, ref.current);
          return ref.current;
        })
        .filter((el): el is HTMLInputElement => el !== null);

      console.log('✅ Nombre total de refs valides trouvées :', refs.length);

      if (refs.length < rowToDisplay) {
        console.log(
          "⚠️ Nombre de refs insuffisant, attendons qu'ils soient attachés.",
        );
        return;
      }

      const firstRef = refs[0];
      const lastRef = refs[Math.min(rowToDisplay, refs.length) - 1];

      console.log('🔍 Première ref :', firstRef);
      console.log('🔍 Dernière ref :', lastRef);

      if (!firstRef || !lastRef || lastRef.offsetTop === 0) {
        console.log(
          '🚨 Problème : les refs ne sont pas encore bien attachées !',
        );
        return;
      }

      const paddingBottom = 15;
      const calculatedHeight =
        lastRef.offsetTop -
        firstRef.offsetTop +
        lastRef.offsetHeight +
        paddingBottom;

      console.log('📏 Hauteur calculée :', calculatedHeight);
      setMaxHeight(calculatedHeight);
    });

    return () => {
      console.log('🧹 Annulation du calcul de maxHeight (cleanup)');
      cancelAnimationFrame(rafId);
    };
  }, [checkboxRefs.length, isDropdownDisplayed, rowToDisplay, options]);

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

  const handleBlur = () => {
    setIsDropdownDisplayed(false);
    setHighlightedIndex(null);
    if (setMultiSelectError) {
      if (required && !validatedOptionsString) {
        setMultiSelectError(InputError.required);
      }
    }
  };

  const handleTabOrArrowDown = () => {
    if (highlightedIndex === null) {
      updateHighlightedIndex(0);
    } else {
      const newIndex =
        (highlightedIndex + 1) %
        (Object.keys(filteredOptions).length + +displaySelectAll);
      updateHighlightedIndex(newIndex);
    }
  };

  const handleArrowUp = () => {
    if (highlightedIndex === null) return;
    const optionsLength =
      Object.keys(filteredOptions).length + (displaySelectAll ? 1 : 0);
    const newIndex = (highlightedIndex + optionsLength - 1) % optionsLength;
    updateHighlightedIndex(newIndex);
  };

  const makeHighlightedIndexSelected = () => {
    // Ensure the input field is focused if it's not already the active element
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus();
    }

    // Do nothing if no index is highlighted
    if (highlightedIndex === null || Object.keys(filteredOptions).length < 1) {
      return;
    }

    // Handle the "select all" functionality, if applicable
    if (displaySelectAll && highlightedIndex === 0) {
      // Toggle between selecting all options and deselecting all, based on current state
      if (atLeastOneTrue(options)) {
        onChange(setAllFalse(options)); // Deselect all options if at least one is currently selected
      } else {
        onChange(setAllTrue(options)); // Select all options if none are currently selected
      }
      return; // Exit the function after handling "select all"
    }

    // Update the selection state for a specific highlighted option, adjusting for "select all" option presence
    onChange({
      ...options,
      ...toggleSelectionStateAtIndex(
        filteredOptions,
        highlightedIndex - +displaySelectAll, // Adjust index if "select all" is displayed
      ),
    });
  };

  const handleEnter = () => {
    if (highlightedIndex === null || Object.keys(filteredOptions).length < 1) {
      return;
    }
    makeHighlightedIndexSelected();
  };

  const handleArrowLeft = () => {
    if (!inputRef.current) {
      return;
    }

    // Case where validated options exist and the cursor is within or at the start of these options
    if (
      validatedOptions &&
      cursorPosition &&
      validatedOptionsString.length >= cursorPosition
    ) {
      const currentElementKey = getCurrentElementFromCursorPosition(
        validatedOptions,
        cursorPosition,
      );
      if (currentElementKey) {
        const newCursorPosition = getElementPositionInSelectionState(
          validatedOptions,
          currentElementKey,
        )?.start;
        if (newCursorPosition !== undefined) {
          setCursorPosition(newCursorPosition);
        }
      }
    } else if (cursorPosition) {
      // Case for simply moving the cursor to the left
      setCursorPosition(cursorPosition - 1);
    }
  };

  const handleArrowRight = () => {
    if (cursorPosition === null || !inputRef.current) {
      return;
    }

    // Case where validated options exist and the cursor is not at the end of these options
    if (validatedOptions && cursorPosition < validatedOptionsString.length) {
      const currentElementKey = getCurrentElementFromCursorPosition(
        validatedOptions,
        cursorPosition + 1,
      );
      if (currentElementKey) {
        const newCursorPosition = getElementPositionInSelectionState(
          validatedOptions,
          currentElementKey,
        )?.end;
        if (newCursorPosition !== undefined) {
          setCursorPosition(newCursorPosition);
          return;
        }
      }
    }
    // Case for simply moving the cursor to the right
    if (cursorPosition < inputValue.length) {
      setCursorPosition(cursorPosition + 1);
    }
  };

  const handleKeyAction = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>, // Event from the keyboard action
    getPosition: () => string | null, // Function to get the current element's key based on the cursor's position
  ) => {
    const currentElementKey = getPosition(); // Attempt to retrieve the current element's key
    // Exit if no validated options are available or the cursor position is not set
    if (!validatedOptions || cursorPosition === null) {
      return;
    }

    if (currentElementKey) {
      e.preventDefault(); // Prevent the default key action to manage cursor movement manually

      // Attempt to retrieve the start position of the current element in the selection state
      const elementStartPosition = getElementPositionInSelectionState(
        validatedOptions,
        currentElementKey,
      )?.start;

      if (elementStartPosition !== undefined) {
        // Update the saved cursor position to the start of the current element
        setSavedCursorPosition(elementStartPosition);
      }

      // Update the selection state based on the current action and adjust the cursor position accordingly
      onChange(updateSelectionState(options, currentElementKey, false));
      setCursorPosition(cursorPosition - currentElementKey.length - 2);
    }
  };

  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    handleKeyAction(e, () =>
      getCurrentElementFromCursorPosition(validatedOptions, cursorPosition),
    );
  };

  const handleDelete = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    if (!validatedOptions || cursorPosition === null) {
      return;
    }
    handleKeyAction(e, () =>
      getCurrentElementFromCursorPosition(validatedOptions, cursorPosition + 1),
    );
  };

  const handleEscape = () => {
    setIsDropdownDisplayed(false);
    inputRef?.current?.blur();
  };

  const handleDefault = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    if (cursorPosition === null) {
      return;
    }
    if (cursorPosition < inputValue.length) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const newValidatedOptions = mergeAndValidateStates(options, options);
    const newValidatedOptionsString =
      selectionStateTrueToString(newValidatedOptions);
    setFilteredOptions(options);
    setInputValue(newValidatedOptionsString);
    setCursorPosition(newValidatedOptionsString.length);
    setDisplaySelectAll(true);
    setCheckboxRefs(
      Array.from({ length: Object.keys(options).length + 1 }, () =>
        createRef(),
      ),
    );
  }, [options]);

  // Avoid click and dropdown to make the inputText blur
  const handleDropdownMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

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
