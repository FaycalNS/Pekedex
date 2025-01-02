import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search'],
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Input with value',
    readOnly: true,
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    className: 'w-[300px]',
  },
};

export const CustomStyled: Story = {
  args: {
    placeholder: 'Custom styled input',
    className: 'h-[60px] rounded-[5px] border-[#CFC7C2] bg-[#FAFAFA] focus:border-themeBgColor focus:ring-themeBgColor',
  },
};