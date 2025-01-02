import type { Meta, StoryObj } from '@storybook/react';
import StatsTab from '@/components/pokemon/pokemonDetail/statsTab';
import { Progress } from '@/components/ui/progress';

const mockStats = [
  { 
    pokemon_v2_stat: { name: 'hp' }, 
    base_stat: 45 
  },
  { 
    pokemon_v2_stat: { name: 'attack' }, 
    base_stat: 60 
  },
  { 
    pokemon_v2_stat: { name: 'defense' }, 
    base_stat: 50 
  },
  { 
    pokemon_v2_stat: { name: 'special-attack' }, 
    base_stat: 70 
  },
  { 
    pokemon_v2_stat: { name: 'special-defense' }, 
    base_stat: 55 
  },
  { 
    pokemon_v2_stat: { name: 'speed' }, 
    base_stat: 65 
  },
];

const meta = {
  title: 'Pokemon/StatsTab',
  component: StatsTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsTab>;

export default meta;
type Story = StoryObj<typeof StatsTab>;

export const FireType: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-64">
      <StatsTab {...args} />
    </div>
  ),
  args: {
    stats: mockStats,
    mainType: 'fire',
  },
};

export const WaterType: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-64">
      <StatsTab {...args} />
    </div>
  ),
  args: {
    stats: mockStats,
    mainType: 'water',
  },
};

export const ElectricType: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-64">
      <StatsTab {...args} />
    </div>
  ),
  args: {
    stats: mockStats,
    mainType: 'electric',
  },
};

export const LowStats: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-64">
      <StatsTab {...args} />
    </div>
  ),
  args: {
    stats: [
      { 
        pokemon_v2_stat: { name: 'hp' }, 
        base_stat: 20 
      },
      { 
        pokemon_v2_stat: { name: 'attack' }, 
        base_stat: 25 
      },
      { 
        pokemon_v2_stat: { name: 'defense' }, 
        base_stat: 30 
      },
      { 
        pokemon_v2_stat: { name: 'special-attack' }, 
        base_stat: 35 
      },
      { 
        pokemon_v2_stat: { name: 'special-defense' }, 
        base_stat: 40 
      },
      { 
        pokemon_v2_stat: { name: 'speed' }, 
        base_stat: 45 
      },
    ],
    mainType: 'grass',
  },
};

export const HighStats: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-64">
      <StatsTab {...args} />
    </div>
  ),
  args: {
    stats: [
      { 
        pokemon_v2_stat: { name: 'hp' }, 
        base_stat: 90 
      },
      { 
        pokemon_v2_stat: { name: 'attack' }, 
        base_stat: 95 
      },
      { 
        pokemon_v2_stat: { name: 'defense' }, 
        base_stat: 85 
      },
      { 
        pokemon_v2_stat: { name: 'special-attack' }, 
        base_stat: 100 
      },
      { 
        pokemon_v2_stat: { name: 'special-defense' }, 
        base_stat: 90 
      },
      { 
        pokemon_v2_stat: { name: 'speed' }, 
        base_stat: 85 
      },
    ],
    mainType: 'psychic',
  },
};