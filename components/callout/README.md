# Callout

Component for displaying informational, warning, or error messages with optional icon support.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Text content of the callout |
| `color` | `Color` | `Color.blue` | Callout color (see variants below) |
| `size` | `Size` | `Size.m` | Callout size |
| `icon` | `string` | `undefined` | SVG icon URL (optional) |
| `className` | `string` | - | Additional CSS classes |

## Color Variants

Currently, **3 colors** are styled in the CSS:

| Color | Background | Text | Recommended Use |
|-------|------------|------|-----------------|
| `blue` | `--sky` (#ebf7ff) | `--navy` (#0452c8) | General information |
| `yellow` | `--vanilla` (#fffddb) | `--bronze` (#815C03) | Warnings |
| `red` | `--petal` (#ffefeb) | `--garnet` (#8d0104) | Errors |

> **Note:** Other colors from the `Color` enum can be used, but they don't have CSS styles defined yet and will display with the default color.

## Sizes

| Size | Padding | Font size | Line height | Icon |
|------|---------|-----------|-------------|------|
| `Size.s` | 12px 8px | 12px | 16px | 16x16px |
| `Size.m` | 14px 10px | 14px | 20px | 20x20px |
| `Size.l` | 16px 12px | 16px | 24px | 24x24px |

## Usage Examples

### Basic usage (without icon)

```tsx
import { Callout } from 'morning-react-ui/components';
import { Color, Size } from 'morning-react-ui/utils/Enum';

<Callout color={Color.blue}>
  This is an informational message.
</Callout>
```

### With icon

```tsx
<Callout
  icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/info.svg`}
  color={Color.blue}
  size={Size.s}
>
  Important information with icon.
</Callout>
```

### Warning (yellow)

```tsx
<Callout
  icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/triangle-exclamation.svg`}
  color={Color.yellow}
  size={Size.s}
>
  A resident contract already exists for this workspace.
</Callout>
```

### Error (red)

```tsx
<Callout
  icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/circle-exclamation.svg`}
  color={Color.red}
  size={Size.m}
>
  An error occurred while saving.
</Callout>
```

### With custom CSS classes

```tsx
<Callout
  color={Color.blue}
  className="my-4"
>
  Message with custom spacing.
</Callout>
```

## Using Icons

Icons must be SVG files accessible via a URL. In Morning projects, use the CDN:

```tsx
icon={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/icon-name.svg`}
```

### Commonly used icons

- `info.svg` - General information
- `bulb.svg` - Tip / advice
- `triangle-exclamation.svg` - Warning
- `circle-exclamation.svg` - Error
- `check-circle.svg` - Success

## Icon Behavior

- The icon is **aligned to the top** of the callout (not vertically centered)
- Icon size automatically adapts to the `size` prop
- Icon color matches the text color of the chosen variant
- The icon uses `mask-image` to apply the color
- Spacing between icon and text: `6px` (margin-right)

## Important Notes

- **Default value**: If no color is specified, the callout will be blue (`Color.blue`)
- **Default size**: If no size is specified, the callout will be medium (`Size.m`)
- **Optional icon**: The icon is only displayed if the `icon` prop is provided
- **Accessibility**: The component inherits all standard HTML props (`HTMLAttributes<HTMLSpanElement>`)
- **Border radius**: All callouts have a border-radius of `6px`

## Extending

To add a new color:

1. Add the color to the `Color` enum (if needed)
2. Add the CSS styles in `callout.module.css`:
   ```css
   .callout-new-color {
       background-color: var(--background-color);
       color: var(--text-color);
   }

   .mask-new-color {
       background-color: var(--text-color);
   }
   ```
