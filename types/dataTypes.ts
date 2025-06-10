export const enum TriState {
  true = 'true',
  false = 'false',
  indeterminate = 'indeterminate',
}

export const enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type SelectOption = {
  id: string;
  label: string;
  imgSrc?: string;
};

export type OptionalDate = Date | null | undefined;
