export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats?: PokemonStat[];
}

export interface PokemonSprites {
  front_default: string;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

// GraphQL specific types
export interface PokemonListResponse {
  pokemon_v2_pokemon: {
    id: number;
    name: string;
    pokemon_v2_pokemonsprites: {
      sprites: string;
    }[];
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        name: string;
      };
    }[];
  }[];
}

export interface PokemonDetailResponse {
  pokemon_v2_pokemon: [
    {
      id: number;
      name: string;
      pokemon_v2_pokemonsprites: {
        sprites: string;
      }[];
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: {
          name: string;
        };
      }[];
      pokemon_v2_pokemonstats: {
        base_stat: number;
        pokemon_v2_stat: {
          name: string;
        };
      }[];
    }
  ];
}

// REST specific types
export interface PokemonListRESTResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonDetailRESTResponse {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
}
