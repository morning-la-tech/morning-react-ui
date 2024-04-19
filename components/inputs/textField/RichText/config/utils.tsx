import { ReactNodeViewConstructor } from '@nytimes/react-prosemirror';
import {
  List,
  ListItem,
  Paragraph,
} from '@/components/inputs/textField/RichText/config/setup';

export const reactNodeViews: Record<string, ReactNodeViewConstructor> = {
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
