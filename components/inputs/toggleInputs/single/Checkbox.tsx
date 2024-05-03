import { CSSProperties, forwardRef, HTMLProps } from 'react';
import classNames from 'classnames';
import { TriState } from '@/types/dataTypes';
import { Size, sizeToNumber } from '@/utils/Enum';
import styles from './checkbox.module.css';

type CheckboxProps = {
  label: string;
  onChange: (value: TriState) => void;
  size?: Size;
  disabled?: boolean;
  value: TriState;
  isError?: boolean;
  style?: CSSProperties;
};

type CheckboxHTMLProps = Omit<HTMLProps<HTMLDivElement>, keyof CheckboxProps>;

const Checkbox = forwardRef<HTMLDivElement, CheckboxProps & CheckboxHTMLProps>(
  (
    {
      label,
      onChange,
      size = Size.m,
      value,
      disabled = false,
      isError = false,
      className,
      ...props
    },
    ref,
  ) => {
    const checkboxClass = classNames({
      [styles.checkbox]: true,
      [styles.active]: value === TriState.true,
      [styles.empty]: value === TriState.false,
      [styles.minus]: value === TriState.indeterminate,
      ['disabled']: disabled,
    });
    const handleClick = () => {
      if (disabled) {
        return;
      }
      onChange(value === TriState.false ? TriState.true : TriState.false);
    };
    return (
      <div
        className={classNames(styles.wrapper, `font-size-${size}`, className)}
        ref={ref}
        {...props}
      >
        <span
          className={classNames(checkboxClass, {
            ['disabled']: disabled,
            ['cursorPointer']: !disabled,
          })}
          onClick={handleClick}
          style={{
            width: `${sizeToNumber(size)}px`,
            height: `${sizeToNumber(size)}px`,
          }}
        ></span>
        <label
          className={classNames({
            [styles.error]: isError,
            [styles.label]: !isError,
            ['disabled']: disabled,
            ['cursorPointer']: !disabled,
          })}
          onClick={handleClick}
        >
          {label}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
