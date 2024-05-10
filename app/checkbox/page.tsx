'use client';
import { useState } from 'react';
import MultiCheckbox from '../../components/inputs/toggleInputs/MultiCheckbox';
import Checkbox from '../../components/inputs/toggleInputs/single/Checkbox';
import Column from '../../components/layout/Column';
import Columns from '../../components/layout/Columns';
import Container from '../../components/layout/Container';
import Navigation from '../../components/layout/Navigation';
import { SelectionState, TriState } from '../../types/dataTypes';
import { Size } from '../../utils/Enum';

const CheckboxGroup = () => {
  const initialOptions = {
    option1: false,
    option2: false,
    option3: true,
  };
  const [valueCheckbox, setValueCheckbox] = useState<TriState>(TriState.false);
  const handleChange = (value: TriState) => {
    setValueCheckbox(value);
  };

  const [options, setOptions] = useState<SelectionState>(initialOptions);

  const handleOptionsChange = (optionsModified: SelectionState) => {
    setOptions(optionsModified);
  };

  const renderCheckbox = (props: {
    label: string;
    size?: Size;
    value: TriState;
    onChange: (value: TriState) => void;
    isError?: boolean;
    disabled?: boolean;
  }) => {
    return (
      <>
        <Checkbox {...props} size={Size.xs} />
        <Checkbox {...props} size={Size.s} />
        <Checkbox {...props} size={Size.m} />
        <Checkbox {...props} size={Size.l} />
        <Checkbox {...props} size={Size.xl} />
      </>
    );
  };

  const renderMultiCheckbox = (props: {
    label: string;
    size?: Size;
    options: SelectionState;
    onChange: (options: SelectionState) => void;
    isSelectAll?: boolean;
    isError?: boolean;
    disabled?: boolean;
    inline?: boolean;
  }) => {
    return (
      <>
        <MultiCheckbox {...props} label='MultiCheckbox xs' size={Size.xs} />
        <MultiCheckbox {...props} label='MultiCheckbox s' size={Size.s} />
        <MultiCheckbox {...props} label='MultiCheckbox m' size={Size.m} />
        <MultiCheckbox {...props} label='MultiCheckbox l' size={Size.l} />
        <MultiCheckbox {...props} label='MultiCheckbox xl' size={Size.xl} />
      </>
    );
  };

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Check boxes</h1>
      </Navigation>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <Columns>
            <Column>
              <h1>Checkbox</h1>
              {renderCheckbox({
                label: 'Label',
                value: valueCheckbox,
                onChange: handleChange,
              })}
              {renderCheckbox({
                label: 'Label',
                value: valueCheckbox,
                onChange: handleChange,
                isError: true,
              })}
              {renderCheckbox({
                label: 'Label',
                value: valueCheckbox,
                onChange: handleChange,
                disabled: true,
              })}
              {renderCheckbox({
                label: 'Label',
                value: TriState.indeterminate,
                onChange: handleChange,
              })}
            </Column>
            <Column>
              <h1>MultiCheckbox inline</h1>
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                onChange: handleOptionsChange,
                isSelectAll: true,
                inline: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                onChange: handleOptionsChange,
                inline: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                onChange: handleOptionsChange,
                isError: true,
                inline: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                onChange: handleOptionsChange,
                disabled: true,
                inline: true,
              })}
            </Column>
            <Column>
              <h1>Multicheckbox</h1>
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                onChange: handleOptionsChange,
                isSelectAll: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                onChange: handleOptionsChange,
              })}
            </Column>
            <Column>
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                onChange: handleOptionsChange,
                isError: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                onChange: handleOptionsChange,
                disabled: true,
              })}
            </Column>
          </Columns>
        </Container>
      </div>
    </>
  );
};

export default CheckboxGroup;
