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
  pokemon_v2_type: {
    id: number;
    name: string;
  }[];
}

export interface PokemonStat {
  pokemon_v2_pokemonstat: {
    base_stat: number;
    pokemon_v2_stat: {
      name: string;
    };
  }[];
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
export interface PokemonSpeciesResponse {
  pokemon_v2_pokemonspecies: {
    pokemon_v2_pokemonspeciesflavortexts: {
      flavor_text: string;
      language: {
        name: string;
      };
    }[];
    evolution_chain_id: number;
    pokemon_v2_pokemoncolor: {
      name: string;
    };
  }[];
}

export interface EvolutionChainResponse {
  pokemon_v2_evolutionchain: {
    pokemon_v2_pokemonspecies: {
      name: string;
      id: number;
      evolves_from_species_id: number | null;
    }[];
  }[];
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
export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
  color: {
    name: string;
  };
}

export interface EvolutionChain {
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };
}
