import { Size } from '@/utils/Enum';

export type BasicInputProps = {
  label?: string;
  sublabel?: string;
  size?: Size;
  isLabelBold?: boolean;
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

export const enum TriState {
  true = 'true',
  false = 'false',
  indeterminate = 'indeterminate',
}

export type SelectionState = {
  [key: string]: boolean;
};
