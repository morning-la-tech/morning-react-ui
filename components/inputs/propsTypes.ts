import { Size } from 'morning-react-ui/utils/Enum';

export type BasicInputProps = {
  label?: string;
  sublabel?: string;
  size?: Size;
  bold?: boolean;
  disabled?: boolean;
};

export type InputProps = BasicInputProps & {
  isError?: boolean;
  placeholder?: string;
};

export type SelectsProps = InputProps & {
  rowToDisplay?: number;
  emptyStateText?: string;
};
