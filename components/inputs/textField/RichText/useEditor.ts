'use client';

import { EditorState } from 'prosemirror-state';
import { Dispatch, SetStateAction, useState } from 'react';
import { DOMParser } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
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
import { schema } from 'prosemirror-schema-basic';
import { react } from '@nytimes/react-prosemirror';
import { editor_schema } from '@/components/inputs/textField/RichText/config/setup';

type EditorHook = {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  hasMark: (markName: string) => boolean;
};

const useEditor = (text: string): EditorHook => {
  const parser = (content: string) => {
    if (typeof window == 'undefined') {
      return;
    }
    const domNode = document.createElement('div');
    domNode.innerHTML = content;
    return DOMParser.fromSchema(editor_schema).parse(domNode);
  };

  const [state, setState] = useState(
    EditorState.create({
      doc: parser(text),
      schema: editor_schema,
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
          'Alt-Cmd-l': liftListItem(schema.nodes.list_item),
          'Cmd-b': toggleMark(editor_schema.marks['strong']),
          'Cmd-i': toggleMark(editor_schema.marks['em']),
          'Cmd-u': toggleMark(editor_schema.marks['underline']),
          'Cmd-s': toggleMark(editor_schema.marks['strikethrough']),
        }),
        react(),
      ],
    }),
  );

  const hasMark = (name: string): boolean => {
    return (
      state.selection.$head.marks().filter((mark) => mark.type.name == name)
        .length > 0
    );
  };

  return {
    hasMark,
    editorState: state,
    setEditorState: setState,
  };
};

export default useEditor;
