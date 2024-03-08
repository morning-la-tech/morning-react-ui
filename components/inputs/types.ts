import { Size } from '@/utils/Enum';

export type BasicInputProps = {
  label?: string;
  sublabel?: string;
  size?: Size;
  isLabelBold?: boolean;
};

export type InputProps = BasicInputProps & {
  isError?: boolean;
  isDisabled?: boolean;
};

export type SelectionState = {
  [key: string]: boolean;
};
