'use client';
import { useEffect, useState } from 'react';
import Separator from '@/components/utils/Separator';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import RichText from '@/components/inputs/textField/RichText/RichText';
import { Size } from '@/utils/Enum';
import Navigation from '@/components/layout/Navigation';

export default function TextArea() {
  const [myText, setMyText] = useState<string>('');
  const [myOtherText, setMyOtherText] = useState('<p>mon <b>texte</b></p>');
  const [isError, setIsError] = useState<boolean>(false);
  const [textLength, setTextLength] = useState<number>(0);

  useEffect(() => {
    setIsError(textLength < 10);
  }, [textLength]);

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Text Area</h1>
      </Navigation>
      <Container>
        <h1>Rich text stuff</h1>
        <Separator />
        <Columns>
          <Column size={Size.l}>
            <RichText
              label={'Description'}
              sublabel={'150 caractères recommandés'}
              placeholder={'entrez votre texte riche ici'}
              text={myText}
              setText={setMyText}
              size={Size.l}
            />
            <RichText
              isError={isError}
              label={'Description pré-remplie'}
              sublabel={`${textLength}/150 caractères maxi; 10 mini`}
              text={myOtherText}
              setText={setMyOtherText}
              size={Size.xl}
              placeholder={'Entrez du texte ici'}
              setTextLength={setTextLength}
              maxChars={150}
            />
          </Column>
          <Column size={Size.l}>
            <div dangerouslySetInnerHTML={{ __html: myText }}></div>
            <div dangerouslySetInnerHTML={{ __html: myOtherText }}></div>
          </Column>
        </Columns>
      </Container>
    </>
  );
}
