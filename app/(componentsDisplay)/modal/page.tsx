'use client';

import { useState } from 'react';
import { Button, ButtonVariant } from 'morning-react-ui/components';
import Container from 'morning-react-ui/components/layout/Container';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import { FormModal, Modal } from 'morning-react-ui/components/modals';

const ModalPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Modal page</h1>
      </Navigation>
      <Container>
        <Button onClick={() => setIsOpenModal(true)}>Ouvrir la modal</Button>
        <Button onClick={() => setIsOpenFormModal(true)}>
          Ouvrir la modal interactive
        </Button>
      </Container>
      <Modal
        isModalShowing={isOpenModal}
        hide={() => setIsOpenModal(false)}
        title='Titre de la modal'
      >
        Voici un exemple de modal simple sans interction
      </Modal>
      <FormModal
        isModalShowing={isOpenFormModal}
        hide={() => setIsOpenFormModal(false)}
        title='Titre de la modal'
        buttons={[
          {
            children: 'Annuler',
            variant: 'secondary' as ButtonVariant,
            onClick: () => {
              setIsOpenFormModal(false);
            },
          },
          {
            children: 'Valider',
            onClick: () => {
              setIsOpenFormModal(false);
            },
          },
        ]}
      >
        Voici un exemple de modal contenant un formulaire avec des actions
      </FormModal>
    </>
  );
};

export default ModalPage;
