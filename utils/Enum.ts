export const enum Size {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

export function sizeToNumber(size: Size): number {
  switch (size) {
    case Size.xl:
      return 26;
    case Size.l:
      return 24;
    case Size.m:
      return 20;
    case Size.s:
      return 16;
    case Size.xs:
      return 12;
  }
}

export function sizeToHeight(size: Size) {
  switch (size) {
    case Size.xl:
      return 42;
    case Size.l:
      return 36;
    case Size.m:
      return 30;
    case Size.s:
      return 24;
    case Size.xs:
      return 18;
  }
}

export const enum Color {
  blue = 'blue',
  pink = 'pink',
  yellow = 'yellow',
  green = 'green',
  gray = 'gray',
  orange = 'orange',
  red = 'red',
  teal = 'teal',
  purple = 'purple',
}
