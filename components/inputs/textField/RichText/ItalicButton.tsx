import { useEditorEventCallback } from '@nytimes/react-prosemirror';
import { toggleMark } from 'prosemirror-commands';
import Image from 'next/image';
import classNames from 'classnames';
import { Button, ButtonVariant } from '@/components/buttons';
import richStyle from '@/components/inputs/textField/RichText/richText.module.css';

type ButtonProp = {
  active: boolean;
};

export function ItalicButton({ active }: ButtonProp) {
  const onClick = useEditorEventCallback((view) => {
    const toggle = toggleMark(view.state.schema.marks.em);
    toggle(view.state, view.dispatch);
    setTimeout(() => {
      if (view.dom instanceof HTMLElement) {
        view.dom.focus();
      }
    }, 0);
  });

  return (
    <Button
      variant={ButtonVariant.Secondary}
      className={classNames({
        [richStyle.control]: true,
        [richStyle.active]: active,
      })}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      <Image
        src={'https://cdn.morning.fr/icons/italic.svg'}
        width={24}
        height={24}
        alt={'Italic'}
      />
    </Button>
  );
}
