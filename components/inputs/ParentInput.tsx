import { forwardRef, CSSProperties, RefObject, ReactNode } from 'react';
import classNames from 'classnames';
import { BasicInputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from './parentInput.module.css';

type ParentInputProps = BasicInputProps & {
  children: ReactNode;
  inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  style?: CSSProperties;
  onClick?: () => void;
};

const ParentInput = forwardRef<HTMLDivElement, ParentInputProps>(
  (
    {
      label,
      isLabelBold,
      sublabel,
      size = Size.m,
      children,
      inputRef,
      disabled,
      onClick,
    },
    ref,
  ) => {
    const focusInput = () => {
      if (inputRef?.current) {
        inputRef.current.focus();
      }
      if (onClick) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={classNames(
          styles.parentInput,
          styles[size],
          `font-size-${size}`,
          { ['disabled']: disabled },
        )}
      >
        {(label || sublabel) && (
          <div className={styles.labelsContainer}>
            {label && (
              <label
                className={classNames(styles.label, {
                  ['bold']: isLabelBold,
                })}
                onClick={focusInput}
              >
                {label}
              </label>
            )}
            {sublabel && (
              <label
                className={classNames(styles.sublabel, styles[size])}
                onClick={focusInput}
              >
                {sublabel}
              </label>
            )}
          </div>
        )}
        {children}
      </div>
    );
  },
);

ParentInput.displayName = 'ParentInput';

export default ParentInput;
