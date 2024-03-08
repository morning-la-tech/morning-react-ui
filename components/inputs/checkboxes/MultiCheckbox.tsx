import React from 'react';
import ParentInput from '@/components/inputs/ParentInput';
import { Size } from '@/utils/Enum';
import { BasicInputProps, SelectionState } from '../types';
import Checkbox from './Checkbox';
import styles from './multiCheckbox.module.css';

type MultiCheckboxProps = BasicInputProps & {
  options: SelectionState;
  onChange: (id: string, newValue: boolean) => void;
  inline?: boolean;
};

const MultiCheckbox = ({
  options,
  onChange,
  size = Size.m,
  inline = false,
  label,
  sublabel,
  isLabelBold,
}: MultiCheckboxProps) => {
  const containerClass = inline ? styles.inline : styles.column;

  const checkboxes = (
    <div className={containerClass}>
      {Object.entries(options).map(([key, value]) => (
        <Checkbox
          key={key}
          label={key}
          value={value}
          onChange={(newValue) => onChange(key, newValue)}
          size={size}
        />
      ))}
    </div>
  );

  return (
    <ParentInput
      label={label}
      sublabel={sublabel}
      size={size}
      isLabelBold={isLabelBold}
    >
      {checkboxes}
    </ParentInput>
  );
};

export default MultiCheckbox;
