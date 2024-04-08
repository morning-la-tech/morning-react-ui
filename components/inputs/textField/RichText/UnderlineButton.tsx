import { useEditorEventCallback } from '@nytimes/react-prosemirror';
import { toggleMark } from 'prosemirror-commands';
import Image from 'next/image';
import React from 'react';
import { Button, ButtonVariant } from '@/components/buttons';
import richStyle from '@/components/inputs/textField/RichText/richText.module.css';

export function UnderlineButton() {
  const onClick = useEditorEventCallback((view) => {
    const toggle = toggleMark(view.state.schema.marks.underline);
    toggle(view.state, view.dispatch, view);
  });

  return (
    <Button
      variant={ButtonVariant.Secondary}
      className={richStyle.control}
      onClick={onClick}
    >
      <Image
        src={'https://cdn.morning.fr/icons/underline.svg'}
        width={24}
        height={24}
        alt={'underline'}
      />
    </Button>
  );
}
