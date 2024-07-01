'use client';
import { Button, ButtonVariant } from 'morning-react-ui/components/buttons';
import { ButtonProps } from 'morning-react-ui/components/buttons/Button';
import { useToast } from 'morning-react-ui/components/Context/ToastContext';
import Column from 'morning-react-ui/components/layout/Column';
import Columns from 'morning-react-ui/components/layout/Columns';
import Container from 'morning-react-ui/components/layout/Container';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import ModalForm from 'morning-react-ui/components/modals/ModalForm';
import useModal from 'morning-react-ui/components/modals/useModal';
import EmptyState from 'morning-react-ui/components/utils/EmptyState';
import Separator from 'morning-react-ui/components/utils/Separator';

export default function Page() {
  const { addToast } = useToast();
  const { isModalShowing, handleShowModal, hideModal } = useModal();

  const handleClickSuccess = () => {
    addToast('success', 'Bravo');
  };

  const handleClickError = () => {
    addToast('error', 'Echec');
  };

  const handleClickWarning = () => {
    addToast('warning', 'Attention');
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
              text={`This is a custom text \n2nd line`}
              imageHeight={126}
              imageWidth={162}
            />
          </Column>
          <Column>
            <h1>Toaster</h1>
            <Button onClick={handleClickSuccess}>Success</Button>
            <Button onClick={handleClickError}>Error</Button>
            <Button onClick={handleClickWarning}>Warning</Button>
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
