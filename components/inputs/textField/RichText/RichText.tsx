import React, { Dispatch, useState } from 'react';
import Image from 'next/image';
import { ProseMirror } from '@nytimes/react-prosemirror';
import classNames from 'classnames';
import { EditorState } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import ParentInput from '@/components/inputs/ParentInput';
import inputStyle from '@/components/inputs/input.module.css';
import { InputProps } from '@/components/inputs/types';
import { Button, ButtonVariant } from '@/components/buttons';
import { ItalicButton } from '@/components/inputs/textField/RichText/ItalicButton';
import { BoldButton } from '@/components/inputs/textField/RichText/BoldButton';
import richStyle from './richText.module.css';
import {UnderlineButton} from "@/components/inputs/textField/RichText/UnderlineButton";
import {schema} from "prosemirror-schema-basic";
import {StrikeButton} from "@/components/inputs/textField/RichText/StrikeButton";

type RichTextProps = InputProps & {
  text: string;
  setText: Dispatch<string>;
};

const mySchema = new Schema({
  nodes: schema.spec.nodes,
  marks: {
    em: {
      parseDOM: [{tag: "em"}],
      toDOM() { return ["em", 0]; }
    },
    strong: {
      parseDOM: [{tag: "strong"}],
      toDOM() { return ["strong", 0]; }
    },
    underline: {
      parseDOM: [{tag: "u"}],
      toDOM() { return ["u", 0]; }
    },
    strikethrough: {
      parseDOM: [{tag: "s"}, {style: "text-decoration", getAttrs: value => value === "line-through" && null}],
      toDOM() { return ["s", 0]; }
    }
  }
});

const RichText = ({
  label,
  sublabel,
  isLabelBold,
  size,
  disabled,
  text,
  setText,
}: RichTextProps) => {
  const [mount, setMount] = useState<HTMLElement | null>(null);
  const [state, setState] = useState(EditorState.create({ schema: mySchema }));

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
        dispatchTransaction={(tr) => {
          setState((s) => s.apply(tr));
        }}
      >
        <div
          className={classNames(
            inputStyle.wrapper,
            richStyle.wrapper,
            'padding-m',
          )}
        >
          <div className={richStyle.textAreaContainer} ref={setMount} />
          <aside className={richStyle.controls}>
            <ItalicButton />
            <BoldButton />
            <UnderlineButton />
            <StrikeButton />
            <Button
              variant={ButtonVariant.Secondary}
              className={richStyle.control}
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
      </ProseMirror>
    </ParentInput>
  );
};

export default RichText;
