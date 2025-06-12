import { SelectOption, TriState } from 'morning-react-ui/types/dataTypes';

/**
 * Returns true if all options are selected.
 *
 * @param options - The full list of selectable options.
 * @param values - The list of currently selected option IDs.
 * @returns True if all option IDs are included in values.
 */
const isAllSelected = (options: SelectOption[], values: string[]): boolean => {
  return options.every((option) => values.includes(option.id));
};

/**
 * Computes the current selection status as a TriState value.
 *
 * @param options - The full list of options.
 * @param values - The list of selected option IDs.
 * @returns TriState.true if all are selected, TriState.false if none, otherwise TriState.indeterminate.
 */
const getSelectedStatus = (
  options: SelectOption[],
  values: string[],
): TriState => {
  if (isAllSelected(options, values)) {
    return TriState.true;
  } else if (!isAllSelected(options, values)) {
    return TriState.false;
  } else {
    return TriState.indeterminate;
  }
};

/**
 * Returns the label of the option under the current cursor position in the input.
 *
 * @param options - All available options.
 * @param values - Currently selected option IDs.
 * @param cursorPosition - Current cursor index in the input string.
 * @returns The label of the option at the cursor, or null if not found.
 */
const getCurrentElementFromCursorPosition = (
  options: SelectOption[],
  values: string[] | undefined,
  cursorPosition: number | null,
): string | null => {
  if (!(values && cursorPosition)) return null;
  let cumulativeLength = 0;
  const activeOptions = options.filter((option) => values.includes(option.id));
  for (const option of activeOptions) {
    const nextCumulativeLength = cumulativeLength + option.label.length + 2;
    if (cursorPosition <= nextCumulativeLength) {
      return option.label;
    }
    cumulativeLength = nextCumulativeLength;
  }
  return null;
};

/**
 * Finds the start and end indices of a given label in the input string representation of selected options.
 *
 * @param options - All available options.
 * @param values - Currently selected option IDs.
 * @param element - The label of the element to locate.
 * @returns An object with 'start' and 'end' positions, or null if not found.
 */
const getElementPositionInSelectOption = (
  options: SelectOption[],
  values: string[],
  element: string,
): { start: number; end: number } | null => {
  const activeOptionsString = options
    .filter((option) => values.includes(option.id))
    .map((option) => `${option.label}, `)
    .join('');
  const startIndex = activeOptionsString.indexOf(`${element}, `);
  if (startIndex === -1) return null;
  const endIndex = startIndex + element.length + 2;
  return { start: startIndex, end: endIndex };
};

export {
  isAllSelected,
  getSelectedStatus,
  getCurrentElementFromCursorPosition,
  getElementPositionInSelectOption,
};
