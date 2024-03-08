'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Size } from '@/utils/Enum';
import Checkbox from '@/components/inputs/checkboxes/Checkbox';
import MultiCheckbox from '@/components/inputs/checkboxes/MultiCheckbox';

type MultiCheckboxState = {
  [key in Size]?: { [label: string]: boolean };
};

const CheckboxPage = () => {
  const initialCheckboxStates = {
    'XS Checkbox': false,
    'S Checkbox': false,
    'M Checkbox': false,
    'L Checkbox': false,
  };

  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);

  const sizes = [Size.xs, Size.s, Size.m, Size.l];
  const initialLabels = {
    'Multi Checkbox Option 1': false,
    'Multi Checkbox Option 2': false,
    'Multi Checkbox Option 3': false,
  };

  const createInitialStates = () =>
    sizes.reduce((acc, size) => ({ ...acc, [size]: { ...initialLabels } }), {});

  const [multiSelectionStateInline, setMultiSelectionStateInline] =
    useState<MultiCheckboxState>(createInitialStates());
  const [multiSelectionStateColumn, setMultiSelectionStateColumn] =
    useState<MultiCheckboxState>(createInitialStates());

  const handleCheckboxChange = (label: string, newValue: boolean) => {
    setCheckboxStates((prev) => ({ ...prev, [label]: newValue }));
  };

  const handleMultiCheckboxChange = (
    size: Size,
    label: string,
    newValue: boolean,
    isInline: boolean,
  ) => {
    const updateFunction = isInline
      ? setMultiSelectionStateInline
      : setMultiSelectionStateColumn;
    updateFunction((prevState) => ({
      ...prevState,
      [size]: {
        ...prevState[size],
        [label]: newValue,
      },
    }));
  };

  const renderIndividualCheckboxes = () =>
    Object.entries(checkboxStates).map(([label, isChecked], index) => (
      <Checkbox
        key={label}
        label={label}
        value={isChecked}
        onChange={(newValue) => handleCheckboxChange(label, newValue)}
        size={sizes[index]}
      />
    ));

  const renderMultiCheckboxesForSize = (isInline: boolean) =>
    sizes.map((size) => (
      <div key={size}>
        <h3>{`Size ${size.toUpperCase()} - ${isInline ? 'Inline' : 'Column'}`}</h3>
        <MultiCheckbox
          options={
            (isInline
              ? multiSelectionStateInline[size]
              : multiSelectionStateColumn[size]) ?? {}
          }
          onChange={(id, newValue) =>
            handleMultiCheckboxChange(size, id, newValue, isInline)
          }
          size={size}
          label={`Preferences - ${size.toUpperCase()} ${isInline ? 'Inline' : 'Column'}`}
          sublabel={isInline ? 'Inline' : 'Column'}
          isLabelBold={true}
          inline={isInline}
        />
      </div>
    ));

  return (
    <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '20px' }}>
      <Link href={'/'}>Back to Home</Link>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: '20px',
        }}
      >
        <div>
          <h2>Individual Checkboxes</h2>
          {renderIndividualCheckboxes()}
        </div>
        <div>
          <h2>MultiCheckbox - All Sizes</h2>
          <div>
            <h3>Inline</h3>
            {renderMultiCheckboxesForSize(true)}
          </div>
          <div>
            <h3>Column</h3>
            {renderMultiCheckboxesForSize(false)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxPage;
