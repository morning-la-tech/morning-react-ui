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
import { history, undo, redo } from 'prosemirror-history';
import { editor_schema } from '@/components/inputs/textField/RichText/config/setup';
import maxLengthPlugin from './plugins/maxLengthPlugin';
import handleBlurPlugin from './plugins/handleBlur';

type EditorHook = {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  hasMark: (markName: string) => boolean;
};

const useEditor = (text: string, maxChars?: number): EditorHook => {
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
        history(),
        handleBlurPlugin(),
        keymap({
          ...baseKeymap,
          'Mod-z': undo,
          'Mod-y': redo,
          'Shift-Mod-z': redo,
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
        ...(maxChars ? [maxLengthPlugin(maxChars)] : []),
      ],
    }),
  );

  const hasMark = (markType: string): boolean => {
    const { from, to, $from, empty } = state.selection;
    const mark = editor_schema.marks[markType];
    if (empty) {
      const applicableMarks = state.storedMarks || $from.marks();
      return applicableMarks.some((markInstance) => markInstance.type === mark);
    } else {
      let allMarked = true;
      state.doc.nodesBetween(from, to, (node) => {
        if (!node.isInline) {
          return true;
        }
        if (!node.marks.some((markInstance) => markInstance.type === mark)) {
          allMarked = false;
          return false;
        }
      });
      return allMarked;
    }
  };

  return {
    hasMark,
    editorState: state,
    setEditorState: setState,
  };
};

export default useEditor;
