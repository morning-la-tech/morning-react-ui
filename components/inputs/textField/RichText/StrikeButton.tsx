import { useEditorEventCallback } from '@nytimes/react-prosemirror';
import { toggleMark } from 'prosemirror-commands';
import Image from 'next/image';
import React from 'react';
import { Button, ButtonVariant } from '@/components/buttons';
import richStyle from '@/components/inputs/textField/RichText/richText.module.css';

export function StrikeButton() {
  const onClick = useEditorEventCallback((view) => {
    const toggle = toggleMark(view.state.schema.marks.strikethrough);
    toggle(view.state, view.dispatch, view);
  });

  return (
    <Button
      variant={ButtonVariant.Secondary}
      className={richStyle.control}
      onClick={onClick}
    >
      <Image
        src={'https://cdn.morning.fr/icons/strike.svg'}
        width={24}
        height={24}
        alt={'strike'}
      />
    </Button>
  );
}
