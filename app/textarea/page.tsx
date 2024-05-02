'use client';

import { useState } from 'react';
import RichText from '@/components/inputs/richText/RichText';
import Navigation from '@/components/layout/Navigation';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import { stripHtml } from '@/utils';

const Page = () => {
  const [textArea, setTextArea] = useState<string>('');

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Rich Text Area</h1>
      </Navigation>
      <Container>
        <Columns>
          <Column>
            <RichText
              value={textArea}
              onChange={(e) => setTextArea(e.currentTarget.value)}
              placeholder='Le placeholder'
              label='Text area'
            />
          </Column>
          <Column>
            <div
              dangerouslySetInnerHTML={{ __html: textArea }}
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                maxWidth: '590px',
              }}
            ></div>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <RichText
              value={textArea}
              onChange={(e) => setTextArea(e.currentTarget.value)}
              placeholder='Le placeholder'
              label='Text area not empty'
              isError={stripHtml(textArea).length === 0}
            />
          </Column>
          <Column></Column>
        </Columns>
        <Columns>
          <Column>
            <RichText
              value={textArea}
              onChange={(e) => setTextArea(e.currentTarget.value)}
              placeholder='Le placeholder'
              label='Text area with max'
              sublabel={`${stripHtml(textArea).length}/150`}
              maxCharacter={150}
              isError={stripHtml(textArea).length > 150}
            />
          </Column>
          <Column></Column>
        </Columns>
        <Columns>
          <Column>
            <RichText
              value={textArea}
              onChange={(e) => setTextArea(e.currentTarget.value)}
              placeholder='Le placeholder'
              label='Text area disabled'
              disabled
            />
          </Column>
          <Column></Column>
        </Columns>
      </Container>
    </>
  );
};

export default Page;
