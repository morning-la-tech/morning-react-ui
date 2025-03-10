export enum TimeError {
  required = 'required',
  formatTime = 'formatTime',
  timeBeforeMin = 'timeBeforeMin',
  timeAfterMax = 'timeAfterMax',
  timeWithinEdges = 'timeWithinEdges',
}

export enum EmailError {
  required = 'required',
  formatEmail = 'formatEmail',
}

export const enum PostalCodeError {
  required = 'required',
  formatPostalCode = 'formatPostalCode',
}
