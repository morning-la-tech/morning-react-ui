import React from 'react';
import classNames from 'classnames';
import ParentInput from 'morning-react-ui/components/inputs/ParentInput';
import { SelectOption } from 'morning-react-ui/types/dataTypes';
import { Size } from 'morning-react-ui/utils/Enum';
import { BasicInputProps } from '../propsTypes';
import styles from './multiToggleInputs.module.css';
import Radio from './single/Radio';

type MultiRadioProps = BasicInputProps & {
  options: SelectOption[];
  value: string;
  onChange: (option: string) => void;
  inline?: boolean;
  isError?: boolean;
};

const MultiRadio = ({
  options,
  onChange,
  value,
  size = Size.m,
  label,
  sublabel,
  bold,
  disabled = false,
  inline = true,
  isError = false,
}: MultiRadioProps) => {
  console.log(value);
  const radios = (
    <>
      {options.map((option) => {
        const handleChange = (changedValue: boolean) => {
          if (!changedValue) {
            onChange(option.id);
          }
        };

        return (
          <Radio
            key={option.id}
            label={option.label}
            value={value === option.id}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            isError={isError}
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
      bold={bold}
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
