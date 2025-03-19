export enum InputError {
  required = 'required',
  valid = '',
}

export enum TimeError {
  valid = InputError.valid,
  required = InputError.required,
  formatTime = 'formatTime',
  timeBeforeMin = 'timeBeforeMin',
  timeAfterMax = 'timeAfterMax',
  timeWithinEdges = 'timeWithinEdges',
}

export enum DateError {
  valid = InputError.valid,
  required = InputError.required,
  formatDate = 'formatDate',
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

export enum LatitudeError {
  required = InputError.required,
  latitudeRange = 'latitudeRange',
}

export enum LongitudeError {
  required = InputError.required,
  longitudeRange = 'longitudeRange',
}
