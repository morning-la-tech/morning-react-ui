import { SelectOption } from 'morning-react-ui/types';
import { normalizeString } from '../stringUtils';

/**
 * Sorts a list of options to put selected items first, then options starting with digits,
 * then the rest in alphabetical order.
 *
 * @param opts - The list of options to sort.
 * @param selectedIds - The IDs of currently selected options.
 * @returns A new sorted array of options.
 */
const sortOptionsWithSelectedFirst = (
  options: SelectOption[],
  selectedIds: string[],
): SelectOption[] => {
  return [...options].sort((a, b) => {
    const aSelected = selectedIds.includes(a.id);
    const bSelected = selectedIds.includes(b.id);

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;

    const aStartsWithDigit = /^\d/.test(a.label);
    const bStartsWithDigit = /^\d/.test(b.label);

    if (aStartsWithDigit && !bStartsWithDigit) return -1;
    if (!aStartsWithDigit && bStartsWithDigit) return 1;

    return a.label.localeCompare(b.label);
  });
};

/**
 * Filters a list of options by checking if the search string matches either the label or the id.
 * Matching is done using normalized strings (case and accent insensitive).
 *
 * @param options - The list of available options to filter.
 * @param search - The input string to filter by.
 * @returns The filtered list of options matching the search.
 */
const filterOptionsByKey = (
  options: SelectOption[],
  search: string,
): SelectOption[] => {
  const inputValueLower = normalizeString(search);
  return options.filter(
    (o) =>
      normalizeString(o.label).includes(inputValueLower) ||
      normalizeString(o.id).includes(inputValueLower),
  );
};

export { sortOptionsWithSelectedFirst, filterOptionsByKey };
