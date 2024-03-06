'use client';

import Link from 'next/link';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import InputText from '@/components/inputs/InputText';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import { Size } from '@/util/Enum';
import InputNumber from '@/components/inputs/inputNumber';

export default function Page() {
  const [value, setValue] = useState<string>('');
  const [numberValue, setNumberValue] = useState<number | undefined>(undefined);

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue: string = e.target.value;
    setValue(newValue);
  };

  console.log(value);

  const handleNumberChange = (newNumberValue: number) => {
    setNumberValue(newNumberValue);
  };

  console.log(numberValue);

  const renderTextInputs = (props: {
    label?: string;
    isLabelBold?: boolean;
    sublabel?: string;
    size?: Size;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isError?: boolean;
    isDisabled?: boolean;
    imageSrc?: string;
    imageAlt?: string;
  }) => {
    return (
      <>
        <InputText {...props} size={Size.xs} />
        <InputText {...props} size={Size.s} />
        <InputText {...props} size={Size.m} />
        <InputText {...props} size={Size.l} />
        <InputText {...props} size={Size.xl} />
      </>
    );
  };

  const renderNumberInputs = (props: {
    label?: string;
    isLabelBold?: boolean;
    sublabel?: string;
    size?: Size;
    value: number | undefined;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    isError?: boolean;
    isDisabled?: boolean;
  }) => {
    return (
      <>
        <InputNumber {...props} size={Size.xs} />
        <InputNumber {...props} size={Size.s} />
        <InputNumber {...props} size={Size.m} />
        <InputNumber {...props} size={Size.l} />
        <InputNumber {...props} size={Size.xl} />
      </>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <Link href={'/'}>Home</Link>
        <Columns>
          <Column>
            <h1>ParentInputs</h1>
            {renderTextInputs({ label: 'Label', placeholder: 'With label', value: value, onChange: handleTextChange })}
            {renderTextInputs({
              label: 'Label',
              isLabelBold: true,
              placeholder: 'With bold label',
              value: value,
              onChange: handleTextChange,
            })}
            {renderTextInputs({
              label: 'Label',
              sublabel: 'Sublabel',
              placeholder: 'With label and sublabel',
              value: value,
              onChange: handleTextChange,
            })}
          </Column>
          <Column>
            <h1>Inputs text</h1>
            {renderTextInputs({ placeholder: 'Simple input', value: value, onChange: handleTextChange })}
            {renderTextInputs({ placeholder: 'Error input', isError: true, value: value, onChange: handleTextChange })}
            {renderTextInputs({
              placeholder: 'Disabled input',
              isDisabled: true,
              value: value,
              onChange: handleTextChange,
            })}
          </Column>
          <Column>
            <h1>Inputs text with images</h1>
            {renderTextInputs({
              placeholder: 'Input with image',
              imageSrc: 'https://cdn.morning.fr/logos/logo_google.png',
              imageAlt: 'google logo',
              value: value,
              onChange: handleTextChange,
            })}
          </Column>
          <Column>
            <h1>Inputs number</h1>
            {renderNumberInputs({
              label: 'Simple',
              sublabel: 'Sublabel',
              value: numberValue,
              onChange: handleNumberChange,
            })}
            {renderNumberInputs({ label: 'Error', isError: true, value: numberValue, onChange: handleNumberChange })}
            {renderNumberInputs({
              label: 'Disabled',
              isDisabled: true,
              value: numberValue,
              onChange: handleNumberChange,
            })}
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
