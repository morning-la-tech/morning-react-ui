import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useEditorEventCallback } from '@nytimes/react-prosemirror';
import { Button, ButtonVariant } from '@/components/buttons';
import richStyle from '@/components/inputs/textField/RichText/richText.module.css';
import TextInput from '@/components/inputs/textField/TextInput';
import Modal from '@/components/modal/Modal';
import useModal from '@/components/modal/useModal';

type ButtonProp = {
  active: boolean;
};

export function LinkButton({ active }: ButtonProp) {
  const [selectedText, setSelectedText] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isInvalidText, setInvalidText] = useState<boolean>(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setSelectedText('');
    setInvalidText(false);
  };

  const { isModalShowing, handleShowModal, hideModal } = useModal(reset);

  const onClick = useEditorEventCallback((view) => {
    const { from, to } = view.state.selection;
    const text = view.state.doc.textBetween(from, to, ' ');
    setSelectedText(text);

    let href = '';
    view.state.doc.nodesBetween(from, to, (node) => {
      if (node.marks.length > 0) {
        node.marks.forEach((mark) => {
          if (mark.type.name === 'link') {
            href = mark.attrs.href;
          }
        });
      }
    });
    setUrl(href);

    handleShowModal();
    setTimeout(() => {
      if (!text) {
        firstInputRef.current?.focus();
      } else {
        secondInputRef.current?.focus();
      }
    }, 100);
  });

  const onSave = useEditorEventCallback((view) => {
    const { from, to } = view.state.selection;
    let transaction;
    if (url) {
      const linkMark = view.state.schema.marks.link.create({ href: url });
      transaction = view.state.tr.replaceWith(
        from,
        to,
        view.state.schema.text(selectedText, [linkMark]),
      );
    } else {
      transaction = view.state.tr.replaceWith(
        from,
        to,
        view.state.schema.text(selectedText, []),
      );
    }
    view.dispatch(transaction);
    hideModal();
  });

  const validateText = useCallback(() => {
    const isValid = selectedText.length > 0;
    setInvalidText(!isValid);
    return isValid;
  }, [selectedText]);

  return (
    <>
      <Button
        variant={ButtonVariant.Secondary}
        className={classNames({
          [richStyle.control]: true,
          [richStyle.active]: active,
        })}
        onClick={onClick}
      >
        <Image
          src={'https://cdn.morning.fr/icons/link.svg'}
          width={24}
          height={24}
          alt={'link'}
        />
      </Button>
      <Modal
        className={richStyle.linkModal}
        title='Ajouter un lien'
        isModalShowing={isModalShowing}
        hide={hideModal}
        buttons={[
          {
            label: 'Annuler',
            variant: ButtonVariant.Secondary,
            onClick: hideModal,
          },
          {
            label: 'Enregistrer',
            variant: ButtonVariant.Primary,
            onClick: onSave,
          },
        ]}
      >
        <TextInput
          ref={firstInputRef}
          isError={isInvalidText}
          value={selectedText}
          onChange={setSelectedText}
          onBlur={validateText}
          placeholder='Texte'
          label='Texte du lien'
        />
        <TextInput
          ref={secondInputRef}
          value={url}
          onChange={setUrl}
          placeholder='URL'
          label='URL du lien'
        />
      </Modal>
    </>
  );
}
