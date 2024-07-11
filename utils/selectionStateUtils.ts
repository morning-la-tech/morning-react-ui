import { SelectionState, TriState } from 'morning-react-ui/types/dataTypes';

const atLeastOneTrue = (selectionState: SelectionState): boolean => {
  return Object.values(selectionState).some((value) => value === true);
};

const isAllTrue = (selectionState: SelectionState): boolean => {
  return Object.values(selectionState).every((value) => value === true);
};

const getSelectionStatus = (selectionState: SelectionState): TriState => {
  const values = Object.values(selectionState);
  if (values.every((value) => value === true)) {
    return TriState.true;
  } else if (values.every((value) => value === false)) {
    return TriState.false;
  } else {
    return TriState.indeterminate;
  }
};

const setAllTrue = (selectionState: SelectionState): SelectionState => {
  const updatedState: SelectionState = { ...selectionState };
  Object.keys(updatedState).forEach((key) => {
    updatedState[key] = true;
  });
  return updatedState;
};

const setAllFalse = (selectionState: SelectionState): SelectionState => {
  const updatedState: SelectionState = { ...selectionState };
  Object.keys(updatedState).forEach((key) => {
    updatedState[key] = false;
  });
  return updatedState;
};

const updateSelectionState = (
  currentState: SelectionState,
  keyToUpdate: string,
  newValue: boolean,
): SelectionState => {
  const updatedState: SelectionState = { ...currentState };
  updatedState[keyToUpdate] = newValue;
  return updatedState;
};

const setAtTrueAndOthersAtFalse = (
  selectionState: SelectionState,
  keyToUpdate: string,
): SelectionState => {
  const updatedState: SelectionState = { ...selectionState };
  Object.keys(updatedState).forEach((key) => {
    updatedState[key] = false;
  });

  updatedState[keyToUpdate] = true;
  return updatedState;
};

const selectionStateTrueToString = (
  selectionState: SelectionState | undefined,
): string => {
  if (selectionState === undefined) {
    return '';
  }

  const stringRepresentation = Object.entries(selectionState)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(', ');

  return stringRepresentation.length > 0 ? `${stringRepresentation}, ` : '';
};

const mergeAndValidateStates = (
  initialState: SelectionState | undefined,
  newState: SelectionState | undefined,
): SelectionState => {
  const validatedState: SelectionState = initialState
    ? { ...initialState }
    : {};
  if (!newState) {
    return validatedState;
  }

  const keysForUpdate: string[] = [];
  Object.keys(newState).forEach((key) => {
    if (newState[key] === false || newState[key] === undefined) {
      delete validatedState[key];
    } else if (newState[key] && !(key in validatedState)) {
      keysForUpdate.push(key);
    }
  });

  keysForUpdate.forEach((key) => {
    validatedState[key] = true;
  });
  return validatedState;
};

const toggleSelectionStateAtIndex = (
  state: SelectionState,
  position: number | null,
): SelectionState => {
  const keys = Object.keys(state);
  if (position === null || position < 0 || position >= keys.length) {
    return state;
  }

  const keyToToggle = keys[position];
  return {
    ...state,
    [keyToToggle]: !state[keyToToggle],
  };
};

const removeLastElement = (
  selectionStateToRemove: SelectionState,
): SelectionState => {
  const keys = Object.keys(selectionStateToRemove);
  const lastKey = keys[keys.length - 1];
  if (lastKey) {
    const { [lastKey]: _, ...remainingSelectionState } = selectionStateToRemove;
    return remainingSelectionState;
  }
  return selectionStateToRemove;
};

const getCurrentElementFromCursorPosition = (
  selectionState: SelectionState | undefined,
  cursorPosition: number | null,
): string | null => {
  if (!(selectionState && cursorPosition)) {
    return null;
  }
  let cumulativeLength = 0;
  const activeKeys = Object.entries(selectionState)
    .filter(([, value]) => value)
    .map(([key]) => key);

  for (const key of activeKeys) {
    const nextCumulativeLength = cumulativeLength + key.length + 2;

    if (cursorPosition <= nextCumulativeLength) {
      return key;
    }
    cumulativeLength = nextCumulativeLength;
  }
  return null;
};

const getElementPositionInSelectionState = (
  selectionState: SelectionState,
  element: string,
): { start: number; end: number } | null => {
  const stringRepresentation = Object.entries(selectionState)
    .filter(([, value]) => value)
    .map(([key]) => `${key}, `)
    .join('');
  const startIndex = stringRepresentation.indexOf(`${element}, `);
  if (startIndex === -1) {
    return null;
  }
  const endIndex = startIndex + element.length + 2;
  return { start: startIndex, end: endIndex };
};

const selectionStateToArray = (selectionState: SelectionState): string[] => {
  return Object.entries(selectionState)
    .filter(([_, value]) => value === true)
    .map(([key]) => key);
};

const selectionStateToString = (
  selectionState: SelectionState | undefined,
): string | undefined => {
  if (!selectionState) {
    return undefined;
  }
  const trueKeys = Object.entries(selectionState)
    .filter(([, value]) => value === true)
    .map(([key]) => key);
  return trueKeys.length === 1 ? trueKeys[0] : undefined;
};

export {
  atLeastOneTrue,
  isAllTrue,
  mergeAndValidateStates,
  setAllTrue,
  setAllFalse,
  getSelectionStatus,
  updateSelectionState,
  selectionStateTrueToString,
  removeLastElement,
  getCurrentElementFromCursorPosition,
  getElementPositionInSelectionState,
  toggleSelectionStateAtIndex,
  setAtTrueAndOthersAtFalse,
  selectionStateToArray,
  selectionStateToString,
};
