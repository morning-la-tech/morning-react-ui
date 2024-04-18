import React, { Dispatch, useEffect, useState } from 'react';
import {
  NodeViewComponentProps,
  ProseMirror,
  react,
  ReactNodeViewConstructor,
  useNodeViews,
} from '@nytimes/react-prosemirror';
import classNames from 'classnames';
import { EditorState } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { Schema, DOMParser, DOMSerializer } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import {
  baseKeymap,
  chainCommands,
  createParagraphNear,
  liftEmptyBlock,
  newlineInCode,
  splitBlock,
  toggleMark,
} from 'prosemirror-commands';
import { liftListItem, splitListItem } from 'prosemirror-schema-list';
import ParentInput from '@/components/inputs/ParentInput';
import inputStyle from '@/components/inputs/input.module.css';
import { InputProps } from '@/components/inputs/propsTypes';
import { ItalicButton } from '@/components/inputs/textField/RichText/ItalicButton';
import { BoldButton } from '@/components/inputs/textField/RichText/BoldButton';
import { UnderlineButton } from '@/components/inputs/textField/RichText/UnderlineButton';
import { StrikeButton } from '@/components/inputs/textField/RichText/StrikeButton';
import { LinkButton } from '@/components/inputs/textField/RichText/LinkButton';
import styles from '@/components/inputs/input.module.css';
import richStyle from './richText.module.css';

const mySchema = new Schema({
  nodes: schema.spec.nodes,
  marks: {
    em: {
      parseDOM: [{ tag: 'em' }],
      toDOM() {
        return ['em', 0];
      },
    },
    strong: {
      parseDOM: [{ tag: 'strong' }],
      toDOM() {
        return ['strong', 0];
      },
    },
    underline: {
      parseDOM: [{ tag: 'u' }],
      toDOM() {
        return ['u', 0];
      },
    },
    strikethrough: {
      parseDOM: [
        { tag: 's' },
        {
          style: 'text-decoration',
          getAttrs: (value) => value === 'line-through' && null,
        },
      ],
      toDOM() {
        return ['s', 0];
      },
    },
    link: {
      attrs: {
        href: {},
        title: { default: null },
        kind: { default: 'external' },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs(dom) {
            return {
              href: dom.getAttribute('href'),
              title: dom.getAttribute('title'),
              kind: dom.getAttribute('kind') || 'external',
            };
          },
        },
      ],
      toDOM(node) {
        const { href, title, kind } = node.attrs;
        return ['a', { href, title, kind }, 0];
      },
    },
  },
});

function Paragraph({ children }: NodeViewComponentProps) {
  return <p>{children}</p>;
}

function List({ children }: NodeViewComponentProps) {
  return <ul>{children}</ul>;
}

function ListItem({ children }: NodeViewComponentProps) {
  return <li>{children}</li>;
}

const reactNodeViews: Record<string, ReactNodeViewConstructor> = {
  paragraph: () => ({
    component: Paragraph,
    dom: document.createElement('div'),
    contentDOM: document.createElement('span'),
  }),
  list: () => ({
    component: List,
    dom: document.createElement('div'),
    contentDOM: document.createElement('div'),
  }),
  list_item: () => ({
    component: ListItem,
    dom: document.createElement('div'),
    contentDOM: document.createElement('div'),
  }),
};

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

  const parser = (content: string) => {
    const domNode = document.createElement('div');
    domNode.innerHTML = content;
    return DOMParser.fromSchema(schema).parse(domNode);
  };

  const [state, setState] = useState(
    EditorState.create({
      doc: parser(text),
      schema: mySchema,
      plugins: [
        keymap({
          ...baseKeymap,
          Enter: chainCommands(
            newlineInCode,
            createParagraphNear,
            liftEmptyBlock,
            splitListItem(schema.nodes.list_item),
            splitBlock,
          ),
          'Shift-Enter': baseKeymap.Enter,
          'Shift-Tab': liftListItem(schema.nodes.list_item),
          'Mod-b': toggleMark(schema.marks['strong']),
          'Mod-i': toggleMark(schema.marks['em']),
        }),
        react(),
      ],
    }),
  );

  useEffect(() => {
    const fragment = DOMSerializer.fromSchema(schema).serializeFragment(
      state.doc.content,
    );
    const tmp = document.createElement('div');
    tmp.appendChild(fragment);
    setText(tmp.innerHTML);
    setInnerText(tmp.innerText[0]);
    if (textLength) {
      textLength(tmp.innerText.length);
    }
  }, [state]);

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
        state={state}
        nodeViews={nodeViews}
        dispatchTransaction={(tr) => {
          setState((s) => s.apply(tr));
        }}
      >
        <div
          className={classNames(inputStyle.wrapper, richStyle.wrapper, {
            [`padding-${size}`]: true,
            [styles.error]: isError,
          })}
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
            <ItalicButton />
            <BoldButton />
            <UnderlineButton />
            <StrikeButton />
            <LinkButton />
          </aside>
        </div>
      </ProseMirror>
    </ParentInput>
  );
};

export default RichText;
