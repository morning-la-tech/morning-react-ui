import { Size } from 'morning-react-ui/utils/Enum';

export type BasicInputProps = {
  label?: string;
  sublabel?: string;
  size?: Size;
  bold?: boolean;
  disabled?: boolean;
  errorText?: string;
};

export type InputProps = BasicInputProps & {
  isError?: boolean;
  placeholder?: string;
  centerPlaceholder?: boolean;
};

export type SelectsProps = InputProps & {
  rowToDisplay?: number;
  emptyStateText?: string;
};
