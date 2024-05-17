import { CSSProperties, forwardRef } from 'react';
import classNames from 'classnames';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
import styles from './radio.module.scss';

type RadioProps = {
  label: string;
  onChange: (value: boolean) => void;
  size?: Size;
  disabled?: boolean;
  value: boolean;
  style?: CSSProperties;
};

type RadioHTMLProps = Omit<React.HTMLProps<HTMLLabelElement>, keyof RadioProps>;

const Radio = forwardRef<HTMLDivElement, RadioProps & RadioHTMLProps>(
  (
    {
      label,
      onChange,
      size = Size.m,
      value,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const radioClass = classNames({
      [styles.radio]: true,
      [styles.active]: value,
      [styles.empty]: !value,
      ['disabled']: disabled,
    });

    const labelClass = classNames({
      [styles.label]: true,
      [styles.active]: value,
      [styles.empty]: !value,
      ['disabled']: disabled,
    });

    const handleClick = () => {
      if (disabled) {
        return;
      }
      onChange(value);
    };

    return (
      <div
        className={classNames(styles.wrapper, `font-size-${size}`, className)}
        ref={ref}
      >
        <span
          className={classNames(radioClass, {
            ['cursorPointer']: !disabled,
            ['disabled']: disabled,
          })}
          onClick={handleClick}
          style={{
            width: `${sizeToNumber(size)}px`,
            height: `${sizeToNumber(size)}px`,
          }}
        ></span>
        <label
          className={classNames(labelClass, {
            ['cursorPointer']: !disabled,
            ['disabled']: disabled,
          })}
          onClick={handleClick}
          {...props}
        >
          {label}
        </label>
      </div>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;
