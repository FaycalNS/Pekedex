import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '@/components/loading-spinner';

const meta = {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['themeMainColor', 'white'],
    },
    size: {
      control: { type: 'range', min: 2, max: 12, step: 1 },
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'themeMainColor',
    size: 4,
  },
};

export const Large: Story = {
  args: {
    color: 'themeMainColor',
    size: 8,
  },
};

export const White: Story = {
  args: {
    color: 'white',
    size: 4,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};