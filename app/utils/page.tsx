'use client';

import Separator from '@/components/utils/Separator';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import EmptyState from '@/components/utils/EmptyState';
import { Button } from '@/components/buttons';
import { useToast } from '@/components/Context/ToastContext';
import Navigation from '@/components/layout/Navigation';

export default function Page() {
  const { addToast } = useToast();

  const handleClickSuccess = () => {
    addToast('success', 'Bravo');
  };

  const handleClickError = () => {
    addToast('error', 'Echec');
  };

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Utils</h1>
      </Navigation>
      <Container>
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
          <Column>
            <h1>Toaster</h1>
            <Button onClick={handleClickSuccess}>Success</Button>
            <Button onClick={handleClickError}>Error</Button>
          </Column>
        </Columns>
      </Container>
    </>
  );
}
