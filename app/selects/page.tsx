'use client';
import { useState } from 'react';
import Link from 'next/link';
import MultiSelect from '@/components/inputs/selects/MultiSelect';
import { SelectionState } from '@/components/inputs/types';
import Container from '@/components/layout/Container';
import { Size } from '@/utils/Enum';
import NumberInput from '@/components/inputs/textField/NumberInput';

export default function Selects() {
  const initialOptions = {
    Amsterdam: false,
    Argentine: false,
    Auber: false,
    Balard: false,
    Bayard: false,
    Beaurepaire: false,
    Boissière: false,
    Bourse: false,
    Caire: false,
    Cambacérès: false,
    Cléry: false,
    Concorde: false,
    'Faubourg Saint-Honoré': false,
    Gallieni: false,
    Iéna: false,
    'La Défense': false,
    Laffitte: false,
    Miromesnil: false,
    Mogador: false,
    Monceau: false,
    Montparnasse: false,
    Montsouris: false,
    'Neuilly Charles de Gaulle': false,
    'Neuilly Hôtel de Ville': false,
    Penthièvre: false,
    Pereire: false,
    "Pont de l'Alma": false,
    'Pont de Neuilly': false,
    'République-Boulanger': false,
    'Saint Ouen': false,
    'Saint-Augustin': false,
    Stalingrad: false,
    Trévise: false,
    Trocadéro: false,
    Vivienne: false,
    '54 Petites Écuries / RATP': false,
    Cadet: false,
    Clichy: false,
    Duhesme: false,
    Dulong: false,
    Dussoubs: false,
    'Ledru-Rollin': false,
    'Petites Écuries': false,
    Sentier: false,
    Toudic: false,
    Victoires: false,
  };
  const [optionsToDisplay, setOptionsToDisplay] = useState(8);
  const [options, setOptions] = useState<SelectionState>(initialOptions);

  return (
    <Container style={{ gap: '30px' }}>
      <Link href={'/'}>Home</Link>
      <h1>MultiSelect</h1>
      <NumberInput
        label='Elements displayed in the dropdown'
        value={optionsToDisplay}
        onChange={setOptionsToDisplay}
        min={1}
      />
      <MultiSelect
        label='L'
        options={options}
        onChange={setOptions}
        size={Size.l}
        rowToDisplay={optionsToDisplay}
      />
      <MultiSelect
        label='M'
        options={options}
        onChange={setOptions}
        size={Size.m}
        rowToDisplay={optionsToDisplay}
      />
      <MultiSelect
        label='S'
        options={options}
        onChange={setOptions}
        size={Size.s}
        rowToDisplay={optionsToDisplay}
      />
      <MultiSelect
        label='XS'
        options={options}
        onChange={setOptions}
        size={Size.xs}
        rowToDisplay={optionsToDisplay}
      />
    </Container>
  );
}
