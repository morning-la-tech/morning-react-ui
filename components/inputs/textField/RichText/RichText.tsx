import classNames from 'classnames';
import { Dispatch, FormEvent, useRef } from 'react';
import Image from 'next/image';
import inputStyle from '@/components/inputs/input.module.css';
import { Button, ButtonVariant } from '@/components/buttons';
import ParentInput from '@/components/inputs/ParentInput';
import { InputProps } from '@/components/inputs/types';
import richStyle from './richText.module.css';

type RichTextProps = InputProps & {
  text: string;
  setText: Dispatch<string>;
};

const RichText = ({
  label,
  sublabel,
  isLabelBold,
  size,
  disabled,
  text,
  setText,
}: RichTextProps) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const makeTextUnderline = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      return;
    }
    document.execCommand('underline', true);
  };

  const makeTextStrike = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      return;
    }
    document.execCommand('strikeThrough', true);
  };

  const makeTextBold = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      return;
    }
    document.execCommand('bold', true);
  };

  const makeTextItalic = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      return;
    }
    document.execCommand('italic', true);
  };

  const makeTextLink = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) {
      return;
    }
    document.execCommand('createLink', true);
  };

  const handleInput = (inputEvent: FormEvent<HTMLDivElement>) => {
    setText(inputEvent.nativeEvent.target?.innerHTML);
  };

  return (
    <ParentInput
      label={label}
      sublabel={sublabel}
      isLabelBold={isLabelBold}
      size={size}
      disabled={disabled}
    >
      <div
        className={classNames(
          inputStyle.wrapper,
          richStyle.wrapper,
          'padding-m',
        )}
      >
        <div
          ref={editableRef}
          contentEditable
          className={classNames(richStyle.textAreaContainer)}
          onInput={handleInput}
        ></div>
        <aside className={richStyle.controls}>
          <Button
            variant={ButtonVariant.Secondary}
            className={richStyle.control}
            onClick={makeTextItalic}
          >
            <Image
              src={'https://cdn.morning.fr/icons/italic.svg'}
              width={24}
              height={24}
              alt={'italic'}
            />
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            className={richStyle.control}
            onClick={makeTextBold}
          >
            <Image
              src={'https://cdn.morning.fr/icons/bold.svg'}
              width={24}
              height={24}
              alt={'bold'}
            />
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            className={richStyle.control}
            onClick={makeTextUnderline}
          >
            <Image
              src={'https://cdn.morning.fr/icons/underline.svg'}
              width={24}
              height={24}
              alt={'underline'}
            />
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            className={richStyle.control}
            onClick={makeTextStrike}
          >
            <Image
              src={'https://cdn.morning.fr/icons/strike.svg'}
              width={24}
              height={24}
              alt={'strike'}
            />
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            className={richStyle.control}
            onClick={makeTextLink}
          >
            <Image
              src={'https://cdn.morning.fr/icons/link.svg'}
              width={24}
              height={24}
              alt={'link'}
            />
          </Button>
        </aside>
      </div>
    </ParentInput>
  );
};

export default RichText;
