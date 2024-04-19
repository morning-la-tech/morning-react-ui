import React, { useState } from 'react';
import { useEditorEventCallback } from '@nytimes/react-prosemirror';
import Image from 'next/image';
import classNames from 'classnames';
import { Button, ButtonVariant } from '@/components/buttons';
import richStyle from '@/components/inputs/textField/RichText/richText.module.css';
import TextInput from '@/components/inputs/textField/TextInput';
import Modal from '@/components/modal/Modal';

type ButtonProp = {
  active: boolean;
};

export function LinkButton({ active }: ButtonProp) {
  const [selectedText, setSelectedText] = useState<string>('');
  const [isInvalidText, setInvalidText] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [isInvalidUrl, setInvalidUrl] = useState<boolean>(false);
  const [isModalDisplayed, setModalDisplayed] = useState<boolean>(false);

  const onOpen = useEditorEventCallback((view) => {
    const selectedValue =
      view.state.selection.content().content.firstChild?.content.firstChild
        ?.text || '';
    setSelectedText(selectedValue);
    setUrl('');
  });

  const toggleModal = () => setModalDisplayed((prev) => !prev);

  const onClick = () => {
    toggleModal();
    onOpen();
  };

  const validateText = (): boolean => {
    const isValid = selectedText.length > 0;
    setInvalidText(!isValid);
    return isValid;
  };

  const validateURL = (): boolean => {
    let isValid = true;
    try {
      new URL(url);
    } catch (_) {
      isValid = false;
    }
    setInvalidUrl(!isValid);
    return isValid;
  };

  const onSave = useEditorEventCallback((view) => {
    // Validate on attempt to save.
    const isValidText = validateText();
    const isValidUrl = validateURL();
    if (isValidText && isValidUrl) {
      const { from, to } = view.state.selection;
      const linkMark = view.state.schema.marks.link.create({ href: url });
      const transaction = view.state.tr.replaceWith(
        from,
        to,
        view.state.schema.text(selectedText, [linkMark]),
      );
      view.dispatch(transaction);
      toggleModal();
    }
  });

  return (
    <>
      <Modal
        title='Ajouter un lien'
        isModalShowing={isModalDisplayed}
        hide={toggleModal}
        buttons={[
          {
            label: 'Annuler',
            variant: ButtonVariant.Secondary,
            onClick: toggleModal,
          },
          {
            label: 'Enregistrer',
            variant: ButtonVariant.Primary,
            onClick: onSave,
          },
        ]}
      >
        <TextInput
          isError={isInvalidText}
          value={selectedText}
          onChange={(enteredText) => {
            setSelectedText(enteredText);
            if (isInvalidText) {
              validateText(); // Validate when already in error state to update as user types
            }
          }}
          onBlur={validateText} // Validate when user leaves the text field
          placeholder='Texte'
          label='Texte'
        />
        <TextInput
          isError={isInvalidUrl}
          value={url}
          onChange={(enteredUrl) => {
            setUrl(enteredUrl);
            if (isInvalidUrl) {
              validateURL(); // Validate when already in error state to update as user types
            }
          }}
          onBlur={validateURL} // Validate when user leaves the URL field
          placeholder='URL'
          label='Lien'
        />
      </Modal>
      <Button
        variant={ButtonVariant.Secondary}
        className={classNames({
          [richStyle.control]: true,
          [richStyle.active]: active,
        })}
        onClick={onClick}
      >
        <Image
          src='https://cdn.morning.fr/icons/link.svg'
          width={24}
          height={24}
          alt='link'
        />
      </Button>
    </>
  );
}
