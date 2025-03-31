import { SelectOption, TriState } from 'morning-react-ui/types/dataTypes';

const isAllSelected = (options: SelectOption[], values: string[]): boolean => {
  return options.every((option) => values.includes(option.id));
};

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
