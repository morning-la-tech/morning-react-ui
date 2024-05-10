import React from 'react';
import classNames from 'classnames';
import { Size } from '../..//../utils/Enum';
import ParentInput from '../../../components/inputs/ParentInput';
import { SelectionState } from '../../../types/dataTypes';
import { setAtTrueAndOthersAtFalse } from '../../../utils/selectionStateUtils';
import { BasicInputProps } from '../propsTypes';
import styles from './multiToggleInputs.module.css';
import Radio from './single/Radio';

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
