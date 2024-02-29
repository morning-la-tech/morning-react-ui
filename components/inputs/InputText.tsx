import { forwardRef } from 'react';
import classNames from 'classnames';
import ParentInput from '@/components/inputs/ParentInput';
import { Size } from '@/util/Enum';
import styles from './inputText.module.css';

type InputProps = {
  label?: string;
  sublabel?: string;
  size?: Size;
  placeholder?: string;
  value?: string;
  isLabelBold?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
};

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ label, sublabel, isLabelBold, size = Size.m, value, placeholder, isError, isDisabled }, ref) => {
    return (
      <ParentInput label={label} sublabel={sublabel} isLabelBold={isLabelBold} size={size}>
        <input
          className={classNames(
            styles.input,
            styles[size],
            { [styles.error]: isError },
            { [styles.disabled]: isDisabled },
          )}
          ref={ref}
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
        />
      </ParentInput>
    );
  },
);

InputText.displayName = 'InputText';

export default InputText;
