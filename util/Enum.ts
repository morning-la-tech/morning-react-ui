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
