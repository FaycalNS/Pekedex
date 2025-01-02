import type { Meta, StoryObj } from '@storybook/react';
import Header from '@/components/pokemon/pokemonDetail/header';

const meta = {
  title: 'Pokemon/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Pikachu: Story = {
  args: {
    name: 'Pikachu',
    types: [{ pokemon_v2_type: { name: 'electric' } }],
    description: 'When several of these Pokémon gather, their electricity can cause lightning storms.',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
  },
};

export const Charizard: Story = {
  args: {
    name: 'Charizard',
    types: [
      { pokemon_v2_type: { name: 'fire' } },
      { pokemon_v2_type: { name: 'flying' } }
    ],
    description: 'Spits fire that is hot enough to melt bouldering rock. Known to cause forest fires unintentionally.',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png'
  },
};

export const MultiTypeExample: Story = {
  args: {
    name: 'Gyarados',
    types: [
      { pokemon_v2_type: { name: 'water' } },
      { pokemon_v2_type: { name: 'flying' } }
    ],
    description: 'Once a small, weak Pokémon, it undergoes evolution and becomes ferocious and powerful.',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png'
  },
};