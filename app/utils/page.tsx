'use client';

import Separator from '@/components/utils/Separator';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import EmptyState from '@/components/utils/EmptyState';
import { Button } from '@/components/buttons';
import { useToast } from '@/components/Context/ToastContext';
import Navigation from '@/components/layout/Navigation';
import Modal from '@/components/modal/Modal';
import useModal from '@/components/modal/useModal';

export default function Page() {
  const { addToast } = useToast();
  const { isModalShowing, handleShowModal, hide } = useModal();

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
          <Column>
            <h1>Modal</h1>
            <Button onClick={handleShowModal}>Modal</Button>
          </Column>
        </Columns>
        <Modal
          isModalShowing={isModalShowing}
          hide={hide}
          title={'This is a title'}
        >
          <div>This is a children</div>
        </Modal>
      </Container>
    </>
  );
}
