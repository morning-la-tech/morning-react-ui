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
};

export const enum TriState {
  true = 'true',
  false = 'false',
  indeterminate = 'indeterminate',
}

export type SelectionState = {
  [key: string]: boolean;
};
