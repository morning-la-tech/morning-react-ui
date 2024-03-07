import { Size } from '@/util/Enum';

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
