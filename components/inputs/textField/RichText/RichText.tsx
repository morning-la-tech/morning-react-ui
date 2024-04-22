'use client';

import React, { Dispatch, useEffect, useState } from 'react';
import { ProseMirror, useNodeViews } from '@nytimes/react-prosemirror';
import classNames from 'classnames';
import { DOMSerializer } from 'prosemirror-model';
import ParentInput from '@/components/inputs/ParentInput';
import inputStyle from '@/components/inputs/input.module.css';
import { InputProps } from '@/components/inputs/propsTypes';
import { ItalicButton } from '@/components/inputs/textField/RichText/ItalicButton';
import { BoldButton } from '@/components/inputs/textField/RichText/BoldButton';
import { UnderlineButton } from '@/components/inputs/textField/RichText/UnderlineButton';
import { StrikeButton } from '@/components/inputs/textField/RichText/StrikeButton';
import { LinkButton } from '@/components/inputs/textField/RichText/LinkButton';
import { editor_schema } from '@/components/inputs/textField/RichText/config/setup';
import { reactNodeViews } from '@/components/inputs/textField/RichText/config/utils';
import useEditor from '@/components/inputs/textField/RichText/useEditor';
import richStyle from './richText.module.css';

type RichTextProps = InputProps & {
  text: string;
  setText: Dispatch<string>;
  textLength?: Dispatch<number>;
};

const RichText = ({
  label,
  sublabel,
  isLabelBold,
  size,
  disabled,
  text,
  setText,
  placeholder,
  isError,
  textLength = undefined,
}: RichTextProps) => {
  const { nodeViews, renderNodeViews } = useNodeViews(reactNodeViews);
  const [mount, setMount] = useState<HTMLElement | null>(null);
  const [innerText, setInnerText] = useState(text);

  const { hasMark, editorState, setEditorState } = useEditor(text);

  useEffect(() => {
    const fragment = DOMSerializer.fromSchema(editor_schema).serializeFragment(
      editorState.doc.content,
    );
    const tmp = document.createElement('div');
    tmp.appendChild(fragment);
    setText(tmp.innerHTML);
    setInnerText(tmp.innerText[0]);
    if (textLength) {
      textLength(tmp.innerText.length);
    }
  }, [editorState]);

  const handleWrapperClick = () => {
    if (mount) {
      mount.focus();
    }
  };

  return (
    <ParentInput
      label={label}
      sublabel={sublabel}
      isLabelBold={isLabelBold}
      size={size}
      disabled={disabled}
    >
      <ProseMirror
        mount={mount}
        state={editorState}
        nodeViews={nodeViews}
        dispatchTransaction={(tr) => {
          setEditorState((s) => s.apply(tr));
        }}
      >
        <div
          className={classNames(inputStyle.wrapper, richStyle.wrapper, {
            [`padding-${size}`]: true,
            [inputStyle.error]: isError,
          })}
          onClick={handleWrapperClick}
        >
          <div className={richStyle.textAreaContainer} ref={setMount} />
          {renderNodeViews()}
          {!innerText && (
            <div
              className={classNames(richStyle.placeholder, `padding-${size}`)}
            >
              {placeholder}
            </div>
          )}
          <aside className={richStyle.controls}>
            <ItalicButton active={hasMark('em')} />
            <BoldButton active={hasMark('strong')} />
            <UnderlineButton active={hasMark('underline')} />
            <StrikeButton active={hasMark('strikethrough')} />
            <LinkButton active={hasMark('link')} />
          </aside>
        </div>
      </ProseMirror>
    </ParentInput>
  );
};

export default RichText;
