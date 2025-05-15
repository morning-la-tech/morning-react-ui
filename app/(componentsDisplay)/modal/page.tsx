'use client';

import { useState } from 'react';
import { Button, ButtonVariant } from 'morning-react-ui/components';
import Container from 'morning-react-ui/components/layout/Container';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import { Modal, ModalForm } from 'morning-react-ui/components/modals';

const ModalPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState<boolean>(false);
  const [isOpenScrollFormModal, setIsOpenScrollFormModal] =
    useState<boolean>(false);

  const shortContent = Array(5)
    .fill(0)
    .map((_, i) => (
      <p key={i}>
        Paragraphe {i + 1} - Ceci est un exemple de contenu pour tester le
        positionnement de la modale.
      </p>
    ));

  const longContent = Array(40)
    .fill(0)
    .map((_, i) => (
      <p key={i}>
        Paragraphe {i + 1} - Ceci est un exemple de contenu long pour tester le
        défilement et le positionnement centré dans la modale. Ce texte est
        intentionnellement verbeux pour créer un contenu plus volumineux.
      </p>
    ));

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Modal page</h1>
      </Navigation>
      <Container>
        <Button onClick={() => setIsOpenModal(true)}>
          Ouvrir la modal simple
        </Button>
        <Button onClick={() => setIsOpenFormModal(true)}>
          Ouvrir la modal form courte
        </Button>
        <Button onClick={() => setIsOpenScrollFormModal(true)}>
          Ouvrir la modal form avec scroll
        </Button>
      </Container>
      <Modal
        isModalShowing={isOpenModal}
        hide={() => setIsOpenModal(false)}
        title='Titre de la modal'
      >
        Voici un exemple de modal simple sans interaction
      </Modal>
      <ModalForm
        isModalShowing={isOpenFormModal}
        hide={() => setIsOpenFormModal(false)}
        title='Modal form courte'
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
        {shortContent}
      </ModalForm>
      <ModalForm
        isModalShowing={isOpenScrollFormModal}
        hide={() => setIsOpenScrollFormModal(false)}
        title='Modal form avec beaucoup de contenu'
        autoCenterThreshold={400} // seuil à partir duquel on affiche la modale centrée verticalement
        buttons={[
          {
            children: 'Annuler',
            variant: 'secondary' as ButtonVariant,
            onClick: () => {
              setIsOpenScrollFormModal(false);
            },
          },
          {
            children: 'Valider',
            onClick: () => {
              setIsOpenScrollFormModal(false);
            },
          },
        ]}
      >
        {longContent}
      </ModalForm>
    </>
  );
};

export default ModalPage;
