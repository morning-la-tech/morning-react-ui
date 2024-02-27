'use client';

import Link from 'next/link';
import Input from '@/components/inputs/Input';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import { Size } from '@/util/Enum';

export default function page() {
  const renderInputs = (props: {
    label?: string;
    isLabelBold?: boolean;
    sublabel?: string;
    height?: string;
    size?: Size;
    value?: string;
    placeholder?: string;
  }) => {
    return (
      <>
        <Input {...props} size={Size.xs} />
        <Input {...props} size={Size.s} />
        <Input {...props} size={Size.m} />
        <Input {...props} size={Size.l} />
        <Input {...props} size={Size.xl} />
      </>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <Link href={'/'}>Home</Link>
        <h1>ParentInputs</h1>
        <Columns>
          <Column>
            {renderInputs({ placeholder: 'Simple input' })}
            {renderInputs({ label: 'Label', placeholder: 'With label' })}
            {renderInputs({ label: 'Label', isLabelBold: true, placeholder: 'With bold label' })}
            {renderInputs({ label: 'Label', sublabel: 'Sublabel', placeholder: 'With label and sublabel' })}
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
