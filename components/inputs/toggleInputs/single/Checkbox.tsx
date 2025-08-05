import { CSSProperties, forwardRef, HTMLProps } from 'react';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import { Avatar } from 'morning-react-ui/components/login';
import { TriState } from 'morning-react-ui/types/dataTypes';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
import styles from './checkbox.module.scss';

type CheckboxProps = {
  label: string;
  imgSrc?: string;
  onChange: (value: TriState) => void;
  size?: Size;
  disabled?: boolean;
  value: TriState;
  isError?: boolean;
  style?: CSSProperties;
};

type CheckboxHTMLProps = Omit<HTMLProps<HTMLDivElement>, keyof CheckboxProps>;

const Checkbox = forwardRef<HTMLDivElement, CheckboxProps & CheckboxHTMLProps>(
  (props, ref) => {
    const {
      label,
      imgSrc,
      onChange,
      size = Size.m,
      value,
      disabled = false,
      isError = false,
      className,
      ...restProps
    } = props;

    const isMobile = useIsMobile();
    const finalSize = size ?? (isMobile ? Size.l : Size.m);

    const checkboxClass = classNames(styles.checkbox, {
      [styles.active]: value === TriState.true,
      [styles.empty]: value === TriState.false,
      [styles.minus]: value === TriState.indeterminate,
      ['disabled']: disabled,
    });

    const handleClick = () => {
      if (!disabled) {
        onChange(value === TriState.false ? TriState.true : TriState.false);
      }
    };

    return (
      <div
        className={classNames(
          styles.wrapper,
          `font-size-${finalSize}`,
          className,
        )}
        ref={ref}
        {...restProps}
      >
        <span
          className={classNames(checkboxClass, {
            ['disabled']: disabled,
            ['cursorPointer']: !disabled,
          })}
          onClick={handleClick}
          style={{
            width: `${sizeToNumber(finalSize)}px`,
            height: `${sizeToNumber(finalSize)}px`,
          }}
        />
        <label
          className={classNames(styles.label, {
            [styles.error]: isError,
            ['disabled']: disabled,
            ['cursorPointer']: !disabled,
          })}
          onClick={handleClick}
        >
          {imgSrc && (
            <div className={styles.avatar}>
              <Avatar imageUrl={imgSrc} size={sizeToNumber(size)} />
            </div>
          )}
          {label}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
