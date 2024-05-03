import { useState, ChangeEvent, useEffect, useRef, FormEvent } from 'react';
import { Editor } from '@tiptap/react';
import { ButtonVariant } from '@/components/buttons';
import TextInput from '@/components/inputs/textField/TextInput';
import FormModal from '@/components/modals/ModalForm';
import { validateAndNormalizeUrl } from '@/utils';
import styles from './richText.module.css';

type LinkModalProps = {
  editor: Editor;
  isModalShowing: boolean;
  hideModal: () => void;
};

const LinkModal = ({ editor, isModalShowing, hideModal }: LinkModalProps) => {
  const selectionRange = useRef({ from: 0, to: 0 });
  const getSelectedText = (): string => {
    const { from, to } = selectionRange.current;
    return editor.state.doc.textBetween(from, to, ' ');
  };
  const [selectedText, setSelectedText] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isInvalidText, setInvalidText] = useState<boolean>(false);
  const [isInvalidUrl, setInvalidUrl] = useState<boolean>(false);

  const selectedTextRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { from, to } = editor.state.selection;
    selectionRange.current = { from, to };

    if (isModalShowing) {
      setSelectedText(getSelectedText());
      const linkMark = editor.state.doc.rangeHasMark(
        from,
        to,
        editor.schema.marks.link,
      );
      if (linkMark) {
        const linkAttrs = editor.getAttributes('link');
        setUrl(linkAttrs.href);
      } else {
        setUrl('');
      }
    } else {
      setSelectedText('');
      setUrl('');
      setInvalidText(false);
    }
  }, [isModalShowing, editor]);

  useEffect(() => {
    setTimeout(() => {
      if (getSelectedText().length === 0) {
        selectedTextRef?.current?.focus();
      } else {
        urlRef?.current?.focus();
        if (urlRef) {
          urlRef?.current?.select();
        }
      }
    }, 5);
  }, [isModalShowing, editor]);

  const handleSelectedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedText(event.target.value);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const closeModal = () => {
    hideModal();
    editor.commands.focus();
  };

  const onSave = (event: FormEvent) => {
    event.preventDefault();
    const { from, to } = selectionRange.current;
    const isEmptySelection = from === to;
    const normalizedUrl = url ? validateAndNormalizeUrl(url) : '';
    if (url && !normalizedUrl) {
      setInvalidUrl(true);
      return;
    }
    editor.chain().focus();
    if (!isEmptySelection) {
      if (normalizedUrl) {
        editor
          .chain()
          .extendMarkRange('link')
          .setLink({ href: normalizedUrl })
          .run();
      } else {
        editor.commands.unsetLink();
      }
    } else {
      if (normalizedUrl && selectedText) {
        editor.commands.insertContent({
          type: 'text',
          text: selectedText,
          marks: [{ type: 'link', attrs: { href: normalizedUrl } }],
        });
      } else if (normalizedUrl) {
        editor.commands.insertContent({
          type: 'text',
          text: url,
          marks: [{ type: 'link', attrs: { href: normalizedUrl } }],
        });
      }
    }

    closeModal();
  };

  return (
    <FormModal
      className={styles.linkModal}
      title='Ajouter un lien'
      isModalShowing={isModalShowing}
      onSubmit={(e: FormEvent) => onSave(e)}
      hide={closeModal}
      buttons={[
        {
          children: 'Annuler',
          variant: ButtonVariant.Secondary,
          onClick: closeModal,
          type: 'button',
        },
        {
          children: 'Enregistrer',
          variant: ButtonVariant.Primary,
          type: 'submit',
        },
      ]}
    >
      <TextInput
        isError={isInvalidText}
        value={selectedText}
        onChange={handleSelectedTextChange}
        placeholder='Texte'
        label='Texte du lien'
        ref={selectedTextRef}
        onFocus={() => setInvalidText(false)}
      />
      <TextInput
        isError={isInvalidUrl}
        value={url}
        onChange={handleUrlChange}
        placeholder='URL'
        label='URL du lien'
        ref={urlRef}
        onFocus={() => setInvalidUrl(false)}
      />
    </FormModal>
  );
};

export default LinkModal;
