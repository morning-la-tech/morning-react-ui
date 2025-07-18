'use client';
import { useState } from 'react';
import MultiSelect from 'morning-react-ui/components/inputs/selects/MultiSelect';
import SelectInput from 'morning-react-ui/components/inputs/selects/SelectInput';
import NumberInput from 'morning-react-ui/components/inputs/textField/NumberInput';
import Column from 'morning-react-ui/components/layout/Column';
import Columns from 'morning-react-ui/components/layout/Columns';
import Container from 'morning-react-ui/components/layout/Container';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import { SelectOption } from 'morning-react-ui/types';
import { Size } from 'morning-react-ui/utils/Enum';

const optionsRawData: SelectOption[] = [
  { id: 'amsterdam', label: 'Amsterdam' },
  { id: 'argentine', label: 'Argentine' },
  { id: 'auber', label: 'Auber' },
  { id: 'balard', label: 'Balard' },
  { id: 'bayard', label: 'Bayard' },
  { id: 'beaurepaire', label: 'Beaurepaire' },
  { id: 'boissiere', label: 'Boissière' },
  { id: 'bourse', label: 'Bourse' },
  { id: 'caire', label: 'Caire' },
  { id: 'cambaceres', label: 'Cambacérès' },
  { id: 'clery', label: 'Cléry' },
  { id: 'concorde', label: 'Concorde' },
  { id: 'faubourg_saint_honore', label: 'Faubourg Saint-Honoré' },
  { id: 'gallieni', label: 'Gallieni' },
  { id: 'iena', label: 'Iéna' },
  { id: 'la_defense', label: 'La Défense' },
  { id: 'laffitte', label: 'Laffitte' },
  { id: 'miromesnil', label: 'Miromesnil' },
  { id: 'mogador', label: 'Mogador' },
  { id: 'monceau', label: 'Monceau' },
  { id: 'montparnasse', label: 'Montparnasse' },
  { id: 'montsouris', label: 'Montsouris' },
  { id: 'neuilly_charles_de_gaulle', label: 'Neuilly Charles de Gaulle' },
  { id: 'neuilly_hotel_de_ville', label: 'Neuilly Hôtel de Ville' },
  { id: 'penthievre', label: 'Penthièvre' },
  { id: 'pereire', label: 'Pereire' },
  { id: 'pont_de_lalma', label: "Pont de l'Alma" },
  { id: 'pont_de_neuilly', label: 'Pont de Neuilly' },
  { id: 'republique_boulanger', label: 'République-Boulanger' },
  { id: 'saint_ouen', label: 'Saint Ouen' },
  { id: 'saint_augustin', label: 'Saint-Augustin' },
  { id: 'stalingrad', label: 'Stalingrad' },
  { id: 'trevise', label: 'Trévise' },
  { id: 'trocadero', label: 'Trocadéro' },
  { id: 'vivienne', label: 'Vivienne' },
  { id: '54_petites_ecuries_ratp', label: '54 Petites Écuries / RATP' },
  { id: 'cadet', label: 'Cadet' },
  { id: 'clichy', label: 'Clichy' },
  { id: 'duhesme', label: 'Duhesme' },
  { id: 'dulong', label: 'Dulong' },
  { id: 'dussoubs', label: 'Dussoubs' },
  { id: 'ledru_rollin', label: 'Ledru-Rollin' },
  { id: 'petites_ecuries', label: 'Petites Écuries' },
  { id: 'sentier', label: 'Sentier' },
  { id: 'toudic', label: 'Toudic' },
  { id: 'victoires', label: 'Victoires' },
];

export default function Selects() {
  const [optionsToDisplay, setOptionsToDisplay] = useState<number | null>(8);

  const [selectValue, setSelectValue] = useState<SelectOption | null>(null);
  const [options, setOptions] = useState<SelectOption[]>(optionsRawData);
  const [multiValues, setMultiValues] = useState<string[]>([]);

  const handleSelectChange = (newSelectValue: SelectOption) => {
    setSelectValue(newSelectValue);
  };

  const renderSelectInputs = (props: {
    label?: string;
    sublabel?: string;
    bold?: boolean;
    size?: Size;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    isError?: boolean;
    selectedOption: SelectOption | null;
    onChange: (value: SelectOption) => void;
  }) => {
    return (
      <>
        <SelectInput {...props} size={Size.xs} />
        <SelectInput {...props} size={Size.s} />
        <SelectInput {...props} size={Size.m} />
        <SelectInput {...props} size={Size.l} />
      </>
    );
  };

  const renderMultiSelectInputs = (props: {
    label?: string;
    sublabel?: string;
    bold?: boolean;
    size?: Size;
    options: SelectOption[];
    setOptions?: (options: SelectOption[]) => void;
    placeholder?: string;
    disabled?: boolean;
    isError?: boolean;
    rowToDisplay?: number | null;
    onChange: (values: string[]) => void;
    selectedIds: string[];
  }) => {
    const sentProps = {
      ...props,
      rowToDisplay: props?.rowToDisplay || 1,
    };
    return (
      <>
        <MultiSelect {...sentProps} size={Size.xs} />
        <MultiSelect {...sentProps} size={Size.s} />
        <MultiSelect {...sentProps} size={Size.m} />
        <MultiSelect {...sentProps} size={Size.l} />
      </>
    );
  };

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Selects</h1>
      </Navigation>
      <Container style={{ gap: '30px' }}>
        <NumberInput
          label='Elements displayed in the dropdown'
          value={optionsToDisplay}
          onChange={setOptionsToDisplay}
        />

        <Columns>
          <Column>
            <h1>MultiSelect</h1>
            {renderMultiSelectInputs({
              label: 'Simple',
              sublabel: 'Sublabel',
              placeholder: 'Placeholder',
              options: options,
              setOptions: setOptions,
              selectedIds: multiValues,
              onChange: setMultiValues,
              rowToDisplay: optionsToDisplay,
            })}
            {renderMultiSelectInputs({
              label: 'Simple (disabled)',
              sublabel: 'Sublabel',
              placeholder: 'Placeholder',
              options: options,
              setOptions: setOptions,
              selectedIds: multiValues,
              onChange: setMultiValues,
              rowToDisplay: optionsToDisplay,
              disabled: true,
            })}
            {renderMultiSelectInputs({
              label: 'Simple (error)',
              sublabel: 'Sublabel',
              placeholder: 'Placeholder',
              options: options,
              selectedIds: multiValues,
              onChange: setMultiValues,
              rowToDisplay: optionsToDisplay,
              isError: true,
            })}
          </Column>

          <Column>
            <h1>SelectInput</h1>
            {renderSelectInputs({
              label: 'Simple',
              sublabel: 'Sublabel',
              placeholder: 'Placeholder',
              options: options,
              selectedOption: selectValue,
              onChange: handleSelectChange,
            })}
            {renderSelectInputs({
              label: 'Disabled',
              sublabel: 'Sublabel',
              placeholder: 'Placeholder',
              options: options,
              disabled: true,
              selectedOption: selectValue,
              onChange: handleSelectChange,
            })}
            {renderSelectInputs({
              label: 'Error',
              sublabel: 'Sublabel',
              placeholder: 'Placeholder',
              options: options,
              isError: true,
              selectedOption: selectValue,
              onChange: handleSelectChange,
            })}
          </Column>
        </Columns>
      </Container>
    </>
  );
}
