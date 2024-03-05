'use client';

import Link from 'next/link';
import InputText from '@/components/inputs/InputText';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import { Size } from '@/util/Enum';
import InputNumber from '@/components/inputs/inputNumber';

export default function page() {
  const renderTextInputs = (props: {
    label?: string;
    isLabelBold?: boolean;
    sublabel?: string;
    size?: Size;
    value?: string;
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
    value: number;
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
            {renderTextInputs({ label: 'Label', placeholder: 'With label' })}
            {renderTextInputs({ label: 'Label', isLabelBold: true, placeholder: 'With bold label' })}
            {renderTextInputs({ label: 'Label', sublabel: 'Sublabel', placeholder: 'With label and sublabel' })}
          </Column>
          <Column>
            <h1>Inputs text</h1>
            {renderTextInputs({ placeholder: 'Simple input' })}
            {renderTextInputs({ placeholder: 'Error input', isError: true })}
            {renderTextInputs({ placeholder: 'Disabled input', isDisabled: true })}
          </Column>
          <Column>
            <h1>Inputs text with images</h1>
            {renderTextInputs({
              placeholder: 'Input with image',
              imageSrc: 'https://cdn.morning.fr/logos/logo_google.png',
              imageAlt: 'google logo',
            })}
            {renderTextInputs({
              placeholder: 'Input with image',
              imageSrc: '/images/magnifying-glass.svg',
              imageAlt: 'magnifying glass',
            })}
          </Column>
          <Column>
            <h1>Inputs number</h1>
            {renderNumberInputs({ label: 'Simple', sublabel: 'Sublabel' })}
            {renderNumberInputs({ label: 'Error', isError: true })}
            {renderNumberInputs({ label: 'Disabled', isDisabled: true })}
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
