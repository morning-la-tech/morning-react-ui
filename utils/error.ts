export enum InputError {
  required = 'required',
}

export enum TimeError {
  required = InputError.required,
  formatTime = 'formatTime',
  timeBeforeMin = 'timeBeforeMin',
  timeAfterMax = 'timeAfterMax',
  timeWithinEdges = 'timeWithinEdges',
}

export enum DateError {
  required = InputError.required,
  dateBeforeMin = 'dateBeforeMin',
  dateAfterMax = 'dateAfterMax',
  dateWithinEdges = 'dateWithinEdges',
}

export enum EmailError {
  required = InputError.required,
  formatEmail = 'formatEmail',
}

export const enum PostalCodeError {
  required = InputError.required,
  formatPostalCode = 'formatPostalCode',
}
