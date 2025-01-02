import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/components/ui/progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    indicatorColor: {
      control: "select",
      options: [
        "bg-primary",
        "bg-pokemon-fire",
        "bg-pokemon-water",
        "bg-pokemon-electric",
        "bg-pokemon-grass",
      ],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-64">
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 50,
    indicatorColor: "bg-primary",
  },
};

export const FullProgress: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-64">
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 100,
    indicatorColor: "bg-pokemon-fire",
  },
};

export const LowProgress: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-64">
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 25,
    indicatorColor: "bg-pokemon-water",
  },
};

export const PokemonTypeColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Progress value={75} indicatorColor="bg-pokemon-fire" />
      <Progress value={60} indicatorColor="bg-pokemon-water" />
      <Progress value={40} indicatorColor="bg-pokemon-electric" />
      <Progress value={90} indicatorColor="bg-pokemon-grass" />
    </div>
  ),
};
