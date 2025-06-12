'use client';
import { useState } from 'react';
import MultiCheckbox from 'morning-react-ui/components/inputs/toggleInputs/MultiCheckbox';
import Checkbox from 'morning-react-ui/components/inputs/toggleInputs/single/Checkbox';
import Column from 'morning-react-ui/components/layout/Column';
import Columns from 'morning-react-ui/components/layout/Columns';
import Container from 'morning-react-ui/components/layout/Container';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import { SelectOption, TriState } from 'morning-react-ui/types/dataTypes';
import { Size } from 'morning-react-ui/utils/Enum';

const CheckboxGroup = () => {
  const options: SelectOption[] = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ];
  const [valueCheckbox, setValueCheckbox] = useState<TriState>(TriState.false);
  const handleChange = (value: TriState) => {
    setValueCheckbox(value);
  };

  const [selectedValueCheckbox, setSelectedValueCheckbox] = useState<string[]>(
    [],
  );

  const handleOptionsChange = (optionsModified: string[]) => {
    setSelectedValueCheckbox(optionsModified);
  };

  const renderCheckbox = (props: {
    label: string;
    size?: Size;
    value: TriState;
    onChange: (value: TriState) => void;
    isError?: boolean;
    disabled?: boolean;
  }) => {
    const icon = `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/building.svg`;
    return (
      <>
        <Checkbox {...props} size={Size.xs} imgSrc={icon} />
        <Checkbox {...props} size={Size.s} imgSrc={icon} />
        <Checkbox {...props} size={Size.m} imgSrc={icon} />
        <Checkbox {...props} size={Size.l} imgSrc={icon} />
        <Checkbox {...props} size={Size.xl} imgSrc={icon} />
      </>
    );
  };

  const renderMultiCheckbox = (props: {
    label: string;
    size?: Size;
    options: SelectOption[];
    onChange: (options: string[]) => void;
    selectedValues: string[];
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
                selectedValues: selectedValueCheckbox,
                onChange: handleOptionsChange,
                isSelectAll: true,
                inline: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                selectedValues: selectedValueCheckbox,
                onChange: handleOptionsChange,
                inline: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                selectedValues: selectedValueCheckbox,
                onChange: handleOptionsChange,
                isError: true,
                inline: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                selectedValues: selectedValueCheckbox,
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
                selectedValues: selectedValueCheckbox,
                onChange: handleOptionsChange,
                isSelectAll: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                selectedValues: selectedValueCheckbox,
                onChange: handleOptionsChange,
              })}
            </Column>
            <Column>
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                selectedValues: selectedValueCheckbox,
                onChange: handleOptionsChange,
                isError: true,
              })}
              {renderMultiCheckbox({
                label: 'Label',
                options: options,
                selectedValues: selectedValueCheckbox,
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
