import { CSSProperties, forwardRef, ReactNode, RefObject } from 'react';
import classNames from 'classnames';
import { BasicInputProps } from 'morning-react-ui/components/inputs/propsTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import styles from './parentInput.module.css';

type ParentInputProps = BasicInputProps & {
  children: ReactNode;
  inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  style?: CSSProperties;
  onClick?: () => void;
  fullHeight?: boolean;
};

const ParentInput = forwardRef<HTMLDivElement, ParentInputProps>(
  (
    {
      label,
      bold,
      sublabel,
      size = Size.m,
      children,
      inputRef,
      disabled,
      onClick,
      fullHeight,
      errorText,
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
          {
            ['disabled']: disabled,
            [styles.fullHeight]: fullHeight,
          },
        )}
        style={{ height: fullHeight ? '100%' : undefined }}
      >
        {(label || sublabel) && (
          <div className={styles.labelsContainer}>
            {label && (
              <label
                className={classNames(
                  styles.label,
                  bold ? styles.bold : undefined,
                )}
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
        {errorText && (
          <label className={styles.error} onClick={focusInput}>
            {errorText}
          </label>
        )}
      </div>
    );
  },
);

ParentInput.displayName = 'ParentInput';

export default ParentInput;
