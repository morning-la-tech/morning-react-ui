# Checkbox Component

This `Checkbox` component is a customizable control for rendering checkbox states with optional labels, custom sizes, and styles.

## Features

- **TriState**: Supports `true`, `false`, and `indeterminate` states.
- **Customizable Size**: Adjusts the size according to the provided `size` prop.
- **Custom Styles**: Allows passing a style object to customize the appearance.
- **Disabled State**: Can be disabled to prevent user interaction.
- **Error State**: Supports rendering in an error state to indicate validation issues.

## Props

| Prop                  | Type                        | Description                                                   |
| --------------------- | --------------------------- | ------------------------------------------------------------- |
| `label`               | `string`                    | Text label displayed next to the checkbox.                    |
| `onChange`            | `(value: TriState) => void` | Callback function when the checkbox state changes.            |
| `size`                | `Size` (optional)           | Adjusts the size of the checkbox. Default is `Size.m`.        |
| `value`               | `TriState`                  | The current state of the checkbox.                            |
| `disabled`            | `boolean` (optional)        | If `true`, the checkbox will be disabled. Default is `false`. |
| `error`               | `boolean` (optional)        | If `true`, the checkbox will indicate an error state.         |
| `style`               | `CSSProperties` (optional)  | Custom styles applied to the checkbox.                        |
| Additional HTML props | -                           | Supports additional HTML label attributes via spread.         |

## Usage

```jsx
import Checkbox from './path/to/Checkbox';
import { TriState, Size } from './path/to/utils/Enum';

function App() {
  const handleChange = (newValue: TriState) => {
    console.log(newValue);
  };

  return (
    <Checkbox
      label="Example Checkbox"
      value={TriState.true}
      onChange={handleChange}
      size={Size.m}
      disabled={false}
      error={false}
      style={{ color: 'blue' }}
    />
  );
}
```

## Customization

The appearance of the `Checkbox` can be customized using the `style` prop. For example, to change the background color when the checkbox is in an error state, you could pass a custom style object:

```jsx
<Checkbox
  label='Error State'
  value={TriState.false}
  onChange={handleChange}
  error={true}
  style={{ backgroundColor: 'red', color: 'white' }}
/>
```

# MultiCheckbox Component

The `MultiCheckbox` component allows rendering multiple checkboxes with a shared group label, customizable sizes, inline or column layout, and an optional select-all checkbox.

## Features

- **Options Management**: Manages a collection of options with `true`, `false`, or `indeterminate` states.
- **Select All Feature**: Optionally includes a select-all checkbox to control the state of all individual options.
- **Customizable Appearance**: Supports custom styles for individual checkboxes and the multi-checkbox container.
- **Inline or Column Layout**: Can be displayed in an inline or column layout.
- **Hover State Customization**: Allows changing the style of checkboxes on hover.

## Props

| Prop                 | Type                                   | Description                                                            |
| -------------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| `options`            | `SelectOption[]`                       | Object with key-value pairs representing the options and their states. |
| `onChange`           | `(options: SelectOption[]) => void`    | Callback function when the state of any option changes.                |
| `size`               | `Size` (optional)                      | Adjusts the size of all child checkboxes. Default is `Size.m`.         |
| `inline`             | `boolean` (optional)                   | If `true`, displays the checkboxes in a row. Default is `false`.       |
| `label`, `sublabel`  | `string`                               | Group label and sublabel for the set of checkboxes.                    |
| `bold`               | `boolean` (optional)                   | If `true`, renders the label in bold.                                  |
| `styleCheckbox`      | `CSSProperties` (optional)             | Custom styles applied to each child checkbox.                          |
| `styleMultiCheckbox` | `CSSProperties` (optional)             | Custom styles for the multi-checkbox container.                        |
| `hoveredIndex`       | `number` (optional)                    | Index of the currently hovered checkbox.                               |
| `setHoveredIndex`    | `(index: number \| undefined) => void` | Function to set the hovered checkbox index. (optional)                 |
| `selectAll`          | `boolean` (optional)                   | If `true`, includes a select-all checkbox. Default is `false`.         |
| `selectAllLabel`     | `string` (optional)                    | Label for the select-all checkbox. Default is 'Tout sélectionner'.     |
| `disabled`           | `boolean` (optional)                   | If `true`, all checkboxes will be disabled. Default is `false`.        |

## Usage

```jsx
import MultiCheckbox from './path/to/MultiCheckbox';
import { Size } from './path/to/utils/Enum';

function App() {
  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ];

  const [values, setValues] = useState<string[]>([]);

  const handleChange = (newValues: string[]) => {
    setValues(newValues);
  };

  return (
    <MultiCheckbox
      options={options}
      values={values}
      onChange={handleChange}
      label='Example MultiCheckbox'
      sublabel='Select multiple options'
      size={Size.m}
      selectAll={true}
      selectAllLabel='Select All'
    />
  );
}
```

## Customization

Similar to the Checkbox component, the appearance of each checkbox within the MultiCheckbox can be customized using the styleCheckbox prop, and the container's style can be adjusted using styleMultiCheckbox.

```jsx
<MultiCheckbox
  options={options}
  onChange={handleChange}
  label='Customized MultiCheckbox'
  styleCheckbox={{ backgroundColor: 'lightgrey' }}
  styleMultiCheckbox={{ padding: '10px', border: '1px solid grey' }}
/>
```
