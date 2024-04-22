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

  const hasMark = (markType: string): boolean => {
    const { from, $from, to, empty } = state.selection;
    if (empty) {
      return Boolean(
        state.storedMarks?.some((mark) => mark.type.name === markType) ||
          $from.marks().some((mark) => mark.type.name === markType),
      );
    } else {
      let checkMarkActive = false;
      state.doc.nodesBetween(from, to, (node) => {
        if (node.marks.some((mark) => mark.type.name === markType)) {
          checkMarkActive = true;
          return false;
        }
      });
      return checkMarkActive;
    }
  };

  return {
    hasMark,
    editorState: state,
    setEditorState: setState,
  };
};

export default useEditor;
