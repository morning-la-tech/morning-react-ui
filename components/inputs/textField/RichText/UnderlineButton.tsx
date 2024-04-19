import { useEditorEventCallback } from '@nytimes/react-prosemirror';
import { toggleMark } from 'prosemirror-commands';
import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import { Button, ButtonVariant } from '@/components/buttons';
import richStyle from '@/components/inputs/textField/RichText/richText.module.css';

type ButtonProp = {
  active: boolean;
};

export function UnderlineButton({ active }: ButtonProp) {
  const onClick = useEditorEventCallback((view) => {
    const toggle = toggleMark(view.state.schema.marks.underline);
    toggle(view.state, view.dispatch, view);
  });

  return (
    <Button
      variant={ButtonVariant.Secondary}
      className={classNames({
        [richStyle.control]: true,
        [richStyle.active]: active,
      })}
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
