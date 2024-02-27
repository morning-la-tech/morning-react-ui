import { forwardRef } from 'react';
import classNames from 'classnames';
import ParentInput from '@/components/inputs/ParentInput';
import { Size } from '@/util/Enum';
import styles from './input.module.css';

type InputProps = {
  label?: string;
  sublabel?: string;
  size?: Size;
  placeholder?: string;
  value?: string;
  isLabelBold?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, sublabel, isLabelBold, size = Size.m, value, placeholder }, ref) => {
    return (
      <ParentInput label={label} sublabel={sublabel} isLabelBold={isLabelBold} size={size}>
        <input className={classNames(styles.input, styles[size])} ref={ref} value={value} placeholder={placeholder} />
      </ParentInput>
    );
  },
);

Input.displayName = 'Input';

export default Input;
