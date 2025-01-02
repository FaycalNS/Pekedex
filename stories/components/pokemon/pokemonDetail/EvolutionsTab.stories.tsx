import type { Meta, StoryObj } from '@storybook/react';
import EvolutionsTab from '@/components/pokemon/pokemonDetail/evolutionsTab';

const meta = {
  title: 'Pokemon/EvolutionsTab',
  component: EvolutionsTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EvolutionsTab>;

export default meta;
type Story = StoryObj<typeof EvolutionsTab>;

export const Charmander: Story = {
  args: {
    evolutionChain: [
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
    ],
    mainType: 'fire',
  },
};

export const Pikachu: Story = {
  args: {
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
    mainType: 'electric',
  },
};

export const Eevee: Story = {
  args: {
    evolutionChain: [
      { 
        id: 133, 
        name: 'Eevee',
        evolves_from_species_id: null
      },
      { 
        id: 134, 
        name: 'Vaporeon',
        evolves_from_species_id: 133
      },
      { 
        id: 135, 
        name: 'Jolteon',
        evolves_from_species_id: 133
      },
      { 
        id: 136, 
        name: 'Flareon',
        evolves_from_species_id: 133
      },
    ],
    mainType: 'normal',
  },
};

export const SimpleTwoStage: Story = {
  args: {
    evolutionChain: [
      { 
        id: 129, 
        name: 'Magikarp',
        evolves_from_species_id: null
      },
      { 
        id: 130, 
        name: 'Gyarados',
        evolves_from_species_id: 129
      },
    ],
    mainType: 'water',
  },
};