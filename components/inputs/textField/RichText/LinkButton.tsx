import {useEditorEventCallback} from '@nytimes/react-prosemirror';
import Image from 'next/image';
import React, {useState} from 'react';
import {Button, ButtonVariant} from '@/components/buttons';
import richStyle from '@/components/inputs/textField/RichText/richText.module.css';
import TextInput from "@/components/inputs/textField/TextInput";

export function LinkButton() {
  const [text, setText] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isModalDisplayed, toggleModal] = useState<boolean>(false);

  const onClick = () => {
    toggleModal(!isModalDisplayed);
  }

  const onSave = useEditorEventCallback((view) => {
    const selectedValue = view.state.selection.content().content.firstChild?.content.firstChild?.text;
    if (selectedValue && selectedValue.length > 0) {
      console.log(selectedValue)
      setText(selectedValue);
    }
    view.dispatch(view.state.tr.replaceWith(
      view.state.selection.from,
      view.state.selection.to,
      view.state.schema.text(text, [view.state.schema.marks.link.create({href: url})])
    ))
    onClick();
  });

  const modal = <div style={{
    position: "absolute",
    zIndex: 2,
    transform: "translateY(-100%)",
    border: "1px solid var(--silver)",
    padding: "var(--padding-m)",
  }}>
    <TextInput value={text} onChange={setText} placeholder={"texte"} label={"Texte"}></TextInput>
    <TextInput value={url} onChange={setUrl} placeholder={"url"} label={"Lien"}></TextInput>
    <div style={{display: "flex", flexDirection: "row"}}><Button variant={ButtonVariant.Secondary} onClick={onClick}>Annuler</Button><Button onClick={onSave}>Enregistrer</Button></div>
  </div>

  return (
    <div>
      {isModalDisplayed && modal}
      <Button
        variant={ButtonVariant.Secondary}
        className={richStyle.control}
        onClick={onClick}
      >
        <Image
          src={'https://cdn.morning.fr/icons/link.svg'}
          width={24}
          height={24}
          alt={'link'}
        />
      </Button>
    </div>
  );
}
