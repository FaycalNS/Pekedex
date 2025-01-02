import type { Meta, StoryObj } from '@storybook/react';
import TabsSection from '@/components/pokemon/pokemonDetail/tabsSection';

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

const mockEvolutionChain = [
  { 
    id: 4, 
    name: 'Charmander',
    evolves_from_species_id: null
  },
  { 
    id: 5, 
    name: 'Charmeleon',
    evolves_from_species_id: 4
  },
  { 
    id: 6, 
    name: 'Charizard',
    evolves_from_species_id: 5
  },
];

const meta = {
  title: 'Pokemon/TabsSection',
  component: TabsSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabsSection>;

export default meta;
type Story = StoryObj<typeof TabsSection>;

export const FireType: Story = {
  args: {
    stats: mockStats,
    mainType: 'fire',
    evolutionChain: mockEvolutionChain,
  },
};

export const WaterType: Story = {
  args: {
    stats: mockStats,
    mainType: 'water',
    evolutionChain: [
      { 
        id: 7, 
        name: 'Squirtle',
        evolves_from_species_id: null
      },
      { 
        id: 8, 
        name: 'Wartortle',
        evolves_from_species_id: 7
      },
      { 
        id: 9, 
        name: 'Blastoise',
        evolves_from_species_id: 8
      },
    ],
  },
};

export const ElectricType: Story = {
  args: {
    stats: mockStats,
    mainType: 'electric',
    evolutionChain: [
      { 
        id: 25, 
        name: 'Pikachu',
        evolves_from_species_id: null
      },
      { 
        id: 26, 
        name: 'Raichu',
        evolves_from_species_id: 25
      },
    ],
  },
};