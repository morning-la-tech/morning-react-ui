'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Separator from '@/components/utils/Separator';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import RichText from '@/components/inputs/textField/RichText/RichText';
import { Size } from '@/utils/Enum';

export default function TextArea() {
  const [myText, setMyText] = useState<string>('');
  const [myOtherText, setMyOtherText] = useState('<p>mon <b>texte</b></p>');
  const [isError, setIsError] = useState<boolean>(false);
  const [textLength, setTextLength] = useState<number>(0);

  useEffect(() => {
    setIsError(textLength < 10 || textLength > 150);
  }, [textLength]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <Link href={'/'}>Home</Link>
        <h1>Rich text stuff</h1>
        <Separator />
        <Columns>
          <Column size={Size.l}>
            <RichText
              label={'Description'}
              sublabel={'150 caractères reccomandés'}
              placeholder={'entrez votre texte riiiiche ici'}
              text={myText}
              setText={setMyText}
              size={Size.l}
            />
          </Column>
          <Column size={Size.l}>
            <div dangerouslySetInnerHTML={{ __html: myText }}></div>
          </Column>
        </Columns>
        <Columns>
          <Column size={Size.l}>
            <RichText
              isError={isError}
              label={'Description pré-remplie'}
              sublabel={`${textLength}/150 caractères maxi; 10 mini`}
              text={myOtherText}
              setText={setMyOtherText}
              size={Size.xl}
              placeholder={'Entrez du texte ici'}
              textLength={setTextLength}
            />
          </Column>
          <Column size={Size.l}>
            <div dangerouslySetInnerHTML={{ __html: myOtherText }}></div>
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
