import { SelectOption } from 'morning-react-ui/types';

const selectedOptionToString = (
  options: SelectOption[] | undefined,
  values: string[],
): string => {
  if (options === undefined) {
    return '';
  }

  const stringRepresentation = options
    .filter((option) => values.includes(option.id))
    .map((option) => option.label)
    .join(', ');

  return stringRepresentation.length > 0 ? `${stringRepresentation}, ` : '';
};

export { selectedOptionToString };
