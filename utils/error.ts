export enum InputError {
  required = 'required',
}

export enum EmailError {
  required = InputError.required,
  formatEmail = 'formatEmail',
}
