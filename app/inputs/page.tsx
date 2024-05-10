'use client';

import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import NumberInput from '../../components/inputs/textField/NumberInput';
import Column from '../../components/layout/Column';
import Columns from '../../components/layout/Columns';
import Container from '../../components/layout/Container';
import Navigation from '../../components/layout/Navigation';
import { Size } from '../../utils/Enum';
import TextInput from './../../components/inputs/textField/TextInput';

export default function Page() {
  const [textValue, setTextValue] = useState<string>('');
  const [numberValue, setNumberValue] = useState<number | undefined>(undefined);

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue: string = e.target.value;
    setTextValue(newValue);
  };

  const handleNumberChange = (newNumberValue: number) => {
    setNumberValue(newNumberValue);
  };

  const renderTextInputs = (props: {
    label?: string;
    isLabelBold?: boolean;
    sublabel?: string;
    size?: Size;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isError?: boolean;
    disabled?: boolean;
    imageSrc?: string;
    imageAlt?: string;
  }) => {
    return (
      <>
        <TextInput {...props} size={Size.xs} />
        <TextInput {...props} size={Size.s} />
        <TextInput {...props} size={Size.m} />
        <TextInput {...props} size={Size.l} />
        <TextInput {...props} size={Size.xl} />
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
    disabled?: boolean;
    placeholder?: string;
  }) => {
    return (
      <>
        <NumberInput {...props} size={Size.xs} />
        <NumberInput {...props} size={Size.s} />
        <NumberInput {...props} size={Size.m} />
        <NumberInput {...props} size={Size.l} />
        <NumberInput {...props} size={Size.xl} />
      </>
    );
  };

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}> Text Inputs</h1>
      </Navigation>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <Columns>
            <Column>
              <h1>ParentInput</h1>
              {renderTextInputs({
                label: 'Label',
                placeholder: 'With label',
                value: textValue,
                onChange: handleTextChange,
              })}
              {renderTextInputs({
                label: 'Label',
                isLabelBold: true,
                placeholder: 'With bold label',
                value: textValue,
                onChange: handleTextChange,
              })}
              {renderTextInputs({
                label: 'Label',
                sublabel: 'Sublabel',
                placeholder: 'With label and sublabel',
                value: textValue,
                onChange: handleTextChange,
              })}
            </Column>
            <Column>
              <h1>TextInput</h1>
              {renderTextInputs({
                placeholder: 'Simple input',
                value: textValue,
                onChange: handleTextChange,
              })}
              {renderTextInputs({
                placeholder: 'Error input',
                isError: true,
                value: textValue,
                onChange: handleTextChange,
              })}
              {renderTextInputs({
                placeholder: 'Disabled input',
                disabled: true,
                value: textValue,
                onChange: handleTextChange,
              })}
            </Column>
            <Column>
              <h1>TextInput with images</h1>
              {renderTextInputs({
                placeholder: 'Input with image',
                imageSrc: 'https://cdn.morning.fr/logos/logo_google.png',
                imageAlt: 'google logo',
                value: textValue,
                onChange: handleTextChange,
              })}
            </Column>
            <Column>
              <h1>NumberInput</h1>
              {renderNumberInputs({
                label: 'Simple',
                sublabel: 'Sublabel',
                value: numberValue,
                placeholder: 'Number',
                onChange: handleNumberChange,
              })}
              {renderNumberInputs({
                label: 'Error',
                isError: true,
                value: numberValue,
                placeholder: 'Number',
                onChange: handleNumberChange,
              })}
              {renderNumberInputs({
                label: 'Disabled',
                disabled: true,
                value: numberValue,
                placeholder: 'Number',
                onChange: handleNumberChange,
              })}
            </Column>
          </Columns>
        </Container>
      </div>
    </>
  );
}
