'use client';

import Link from 'next/link';
import Separator from '@/components/utils/Separator';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import EmptyState from '@/components/utils/EmptyState';

export default function Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <Link href={'/'}>Home</Link>
        <h1>Separator</h1>
        <Separator />
        <Columns>
          <Column>
            <h1>EmptyState</h1>
            <EmptyState
              imageSrc='https://cdn.morning.fr/icons/empty-state.svg'
              text='This is a custom text'
              imageHeight={126}
              imageWidth={162}
            />
          </Column>
        </Columns>
      </Container>
    </div>
  );
}
