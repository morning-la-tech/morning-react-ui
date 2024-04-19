import { NodeViewComponentProps } from '@nytimes/react-prosemirror';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';

export const editor_schema = new Schema({
  nodes: schema.spec.nodes,
  marks: {
    em: {
      parseDOM: [{ tag: 'em' }],
      toDOM() {
        return ['em', 0];
      },
    },
    strong: {
      parseDOM: [{ tag: 'strong' }, { tag: 'b' }],
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

export function Paragraph({ children }: NodeViewComponentProps) {
  return <p>{children}</p>;
}

export function List({ children }: NodeViewComponentProps) {
  return <ul>{children}</ul>;
}

export function ListItem({ children }: NodeViewComponentProps) {
  return <li>{children}</li>;
}
