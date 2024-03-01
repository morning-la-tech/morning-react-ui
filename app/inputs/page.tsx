'use client';

import Link from 'next/link';
import InputText from '@/components/inputs/InputText';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import { Size } from '@/util/Enum';

export default function page() {
  const renderInputs = (props: {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <Link href={'/'}>Home</Link>
        <Columns>
          <Column>
            <h1>ParentInputs</h1>
            {renderInputs({ label: 'Label', placeholder: 'With label' })}
            {renderInputs({ label: 'Label', isLabelBold: true, placeholder: 'With bold label' })}
            {renderInputs({ label: 'Label', sublabel: 'Sublabel', placeholder: 'With label and sublabel' })}
          </Column>
          <Column>
            <h1>Inputs text</h1>
            {renderInputs({ placeholder: 'Simple input' })}
            {renderInputs({ placeholder: 'Error input', isError: true })}
            {renderInputs({ placeholder: 'Disabled input', isDisabled: true })}
          </Column>
          <Column>
            <h1>Inputs text with images</h1>
            {renderInputs({
              placeholder: 'Input with image',
              imageSrc: 'https://cdn.morning.fr/logos/logo_google.png',
              imageAlt: 'google logo',
            })}
            {renderInputs({
              placeholder: 'Input with image',
              imageSrc: '/images/magnifying-glass.svg',
              imageAlt: 'magnifying glass',
            })}
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
