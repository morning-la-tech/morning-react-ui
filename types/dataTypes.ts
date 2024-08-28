export const enum TriState {
  true = 'true',
  false = 'false',
  indeterminate = 'indeterminate',
}

export type SelectionState = {
  [key: string]: boolean;
};

export type SelectOption = {
  id: string;
  label: string;
};
