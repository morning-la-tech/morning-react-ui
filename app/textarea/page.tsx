'use client';

import Link from 'next/link';
import { useState } from 'react';
import Separator from '@/components/utils/Separator';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import { useToast } from '@/components/Context/ToastContext';
import RichText from '@/components/inputs/textField/RichText/RichText';

export default function TextArea() {
  const { addToast } = useToast();
  const [myText, setMyText] = useState('');

  const handleClickSuccess = () => {
    addToast('success', 'Bravo');
  };

  const handleClickError = () => {
    addToast('error', 'Echec');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <Link href={'/'}>Home</Link>
        <h1>Rich text stuff</h1>
        <Separator />
        <Columns>
          <Column>
            <RichText label={'Description'} text={myText} setText={setMyText} />
            <div dangerouslySetInnerHTML={{ __html: myText }}></div>
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
