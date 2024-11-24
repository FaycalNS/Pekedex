import { http, HttpResponse } from 'msw';

export const restHandlers = [
  // Handler for searchPokemons
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json({
      count: 1281,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      previous: null,
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/"
        }
        // ... more pokemon
      ]
    });
  }),

  // Handler for getPokemonDetail
  http.get('https://pokeapi.co/api/v2/pokemon/:idOrName', ({ params }) => {
    const { idOrName } = params;

    // Check if pokemon is 'nonexistent'
    if (idOrName === 'nonexistent') {
      return new HttpResponse(null, { 
        status: 404,
        statusText: 'Not Found'
      });
    }

    // Return successful response for other cases
    return HttpResponse.json({
      id: 1,
      name: "bulbasaur",
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      },
      types: [
        {
          slot: 1,
          type: { name: "grass" }
        }
      ],
      stats: [
        {
          base_stat: 45,
          stat: { name: "hp" }
        }
      ]
    });
  }),

  // Handler for getPokemonSpecies
  http.get('https://pokeapi.co/api/v2/pokemon-species/:id', ({ params }) => {
    const { id } = params;
    
    // Handle invalid pokemon id
    if (Number(id) <= 0) {
      return new HttpResponse(null, { 
        status: 404,
        statusText: 'Not Found'
      });
    }

    return HttpResponse.json({
      flavor_text_entries: [
        {
          flavor_text: "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
          language: { name: "en" }
        }
      ],
      evolution_chain: {
        url: "https://pokeapi.co/api/v2/evolution-chain/1/"
      },
      color: {
        name: "green"
      }
    });
  }),

  // Handler for getEvolutionChain
  http.get('https://pokeapi.co/api/v2/evolution-chain/:id', ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    
    // Handle invalid URL
    if (url.pathname.includes('invalid-url')) {
      return new HttpResponse(null, { 
        status: 404,
        statusText: 'Not Found'
      });
    }

    // Handle non-existent chain
    if (Number(id) > 9999) {
      return new HttpResponse(null, { 
        status: 404,
        statusText: 'Not Found'
      });
    }

    return HttpResponse.json({
      chain: {
        species: {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon-species/1/"
        },
        evolves_to: [
          {
            species: {
              name: "ivysaur",
              url: "https://pokeapi.co/api/v2/pokemon-species/2/"
            },
            evolves_to: [
              {
                species: {
                  name: "venusaur",
                  url: "https://pokeapi.co/api/v2/pokemon-species/3/"
                },
                evolves_to: []
              }
            ]
          }
        ]
      }
    });
  }),
  // Handler for 404 Not Found
  http.get('https://pokeapi.co/api/v2/pokemon/nonexistent', () => {
    return new HttpResponse(null, { status: 404 });
  })
];