import { UTCDate } from '@date-fns/utc';

export const enum TriState {
  true = 'true',
  false = 'false',
  indeterminate = 'indeterminate',
}

export const enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type SelectionState = {
  [key: string]: boolean;
};

export type SelectOption = {
  id: string;
  label: string;
};

export type Datez = UTCDate | null | undefined;
