import React from 'react';
import classNames from 'classnames';
import ParentInput from '@/components/inputs/ParentInput';
import { Size } from '@/utils/Enum';
import { setAtTrueAndOthersAtFalse } from '@/utils/selectionStateUtils';
import { SelectionState } from '@/types/dataTypes';
import Radio from './single/Radio';
import styles from './multiToggleInputs.module.css';
import { BasicInputProps } from '../propsTypes';

type MultiRadioProps = BasicInputProps & {
  options: SelectionState;
  onChange: (options: SelectionState) => void;
  inline?: boolean;
};

const MultiRadio = ({
  options,
  onChange,
  size = Size.m,
  label,
  sublabel,
  isLabelBold,
  disabled = false,
  inline = true,
}: MultiRadioProps) => {
  const radios = (
    <>
      {Object.entries(options).map(([key, value]) => {
        const handleChange = (changedValue: boolean) => {
          if (!changedValue) {
            onChange(setAtTrueAndOthersAtFalse(options, key));
          }
        };

        return (
          <Radio
            key={key}
            label={key}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
          />
        );
      })}
    </>
  );

  return (
    <ParentInput
      label={label}
      sublabel={sublabel}
      size={size}
      isLabelBold={isLabelBold}
      disabled={disabled}
    >
      <div
        className={classNames(styles.wrapper, {
          [styles.inline]: inline,
          [styles.column]: !inline,
        })}
      >
        {radios}
      </div>
    </ParentInput>
  );
};

export default MultiRadio;
