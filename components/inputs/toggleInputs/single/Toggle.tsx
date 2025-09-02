import { CSSProperties, forwardRef, HTMLProps } from 'react';
import classNames from 'classnames';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import { Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
import styles from './toggle.module.scss';

type ToggleProps = {
  label: string;
  onChange: (value: boolean) => void;
  size?: Size;
  disabled?: boolean;
  value: boolean;
  isError?: boolean;
  style?: CSSProperties;
};

type ToggleHTMLProps = Omit<HTMLProps<HTMLDivElement>, keyof ToggleProps>;

const Toggle = forwardRef<HTMLDivElement, ToggleProps & ToggleHTMLProps>(
  (props, ref) => {
    const {
      label,
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

    const toggleClass = classNames(styles.toggle, {
      [styles.active]: value,
      [styles.inactive]: !value,
      [styles.disabled]: disabled,
    });

    const handleClick = () => {
      if (!disabled) {
        onChange(!value);
      }
    };

    // Utilise sizeToNumber pour la cohérence avec les autres composants
    // Le SVG s'adaptera proportionnellement
    const toggleSize = sizeToNumber(finalSize);

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
          className={classNames(toggleClass, {
            ['cursorPointer']: !disabled,
          })}
          onClick={handleClick}
          style={{
            width: `${toggleSize}px`,
            height: `${toggleSize}px`,
          }}
        />
        <label
          className={classNames(styles.label, {
            [styles.error]: isError,
            [styles.disabled]: disabled,
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

Toggle.displayName = 'Toggle';

export default Toggle;
