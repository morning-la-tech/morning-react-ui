'use client';
import { Button, ButtonVariant } from '@/components/buttons';
import { ButtonProps } from '@/components/buttons/Button';
import { useToast } from '@/components/Context/ToastContext';
import Column from '@/components/layout/Column';
import Columns from '@/components/layout/Columns';
import Container from '@/components/layout/Container';
import Navigation from '@/components/layout/Navigation';
import ModalForm from '@/components/modals/ModalForm';
import useModal from '@/components/modals/useModal';
import EmptyState from '@/components/utils/EmptyState';
import Separator from '@/components/utils/Separator';

export default function Page() {
  const { addToast } = useToast();
  const { isModalShowing, handleShowModal, hideModal } = useModal();

  const handleClickSuccess = () => {
    addToast('success', 'Bravo');
  };

  const handleClickError = () => {
    addToast('error', 'Echec');
  };

  const buttons: ButtonProps[] = [
    {
      children: 'Cancel',
      variant: ButtonVariant.Secondary,
      onClick: () => {
        addToast('error', 'Canceled');
        hideModal();
      },
    },
    {
      children: 'Validate',
      variant: ButtonVariant.Primary,
      onClick: () => {
        addToast('success', 'Validated');
        hideModal();
      },
      type: 'submit',
    },
  ];

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
        <ModalForm
          isModalShowing={isModalShowing}
          hide={hideModal}
          title={'This is a title'}
          buttons={buttons}
        >
          <div>This is the child of the modal component</div>
        </ModalForm>
      </Container>
    </>
  );
}
