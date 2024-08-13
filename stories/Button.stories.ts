import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button, { ButtonVariant } from '../components/buttons/Button';
import { Size } from '../utils/Enum';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      control: 'select',
      options: [Size.xs, Size.s, Size.m, Size.l, Size.xl],
    },
    children: {
      control: 'text',
    },
    startImage: {
      control: {
        type: 'file',
        accept: '.png',
      },
    },
    endImage: {
      control: {
        type: 'file',
        accept: '.png',
      },
    },
    isLoading: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: [
        ButtonVariant.Primary,
        ButtonVariant.Secondary,
        ButtonVariant.Danger,
      ],
    },
    className: {
      control: 'text',
    },
    type: {
      control: 'text',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: ButtonVariant.Primary,
    children: 'Primary button',
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.Secondary,
    children: 'Secondary button',
  },
};

export const Danger: Story = {
  args: {
    variant: ButtonVariant.Danger,
    children: 'Danger button',
  },
};
