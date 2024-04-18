'use client';

import Link from 'next/link';
import {useState} from 'react';
import Separator from '@/components/utils/Separator';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import RichText from '@/components/inputs/textField/RichText/RichText';
import {Size} from "@/utils/Enum";

export default function TextArea() {
  const [myText, setMyText] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <Link href={'/'}>Home</Link>
        <h1>Rich text stuff</h1>
        <Separator />
        <Columns>
          <Column size={Size.l}>
            <RichText label={'Description'} text={myText} setText={setMyText} size={Size.xl} />
          </Column>
          <Column size={Size.l}>
            <div dangerouslySetInnerHTML={{__html: myText}}></div>
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
