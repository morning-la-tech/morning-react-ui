export const enum TriState {
  true = 'true',
  false = 'false',
  indeterminate = 'indeterminate',
}

export const enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

/**
 * Represents a selectable option in a dropdown or multi-select component.
 */
export type SelectOption = {
  /**
   * Unique identifier for the option (used internally for selection logic).
   */
  id: string;

  /**
   * Text label displayed to the user.
   */
  label: string;

  /**
   * Optional image source URL to display alongside the label (e.g., avatar, icon).
   */
  imgSrc?: string;
};

export type OptionalDate = Date | null | undefined;
