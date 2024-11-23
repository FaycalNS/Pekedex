export interface Pokemon {
    id: number;
    name: string;
    types: PokemonType[];
    sprites: {
      front_default: string;
    };
    stats: PokemonStat[];
    species: {
      url: string;
    };
  }
  
  export interface PokemonType {
    type: {
      name: string;
    };
    slot: number;
  }
  
  export interface PokemonStat {
    base_stat: number;
    stat: {
      name: string;
    };
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
  }