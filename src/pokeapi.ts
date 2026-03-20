import { Cache } from "./pokecache.js";
import { useAPICall } from "./hooks/use_api_call.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache = new Cache(1000000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;

    return await useAPICall<ShallowLocations>(url, "locations", this.cache);
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    return await useAPICall<Location>(url, "location", this.cache, locationName);
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${name}`;

    return await useAPICall<Pokemon>(url, "pokemon", this.cache, name);
  }
}

export type Pokemon = {
    id: string;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    stats: [
        {
            base_stat: number,
            effort: number,
            stat: {
                name: string,
            },
        },
    ],
    types: [
        {
           type: {
            name: string,
           } 
        }
    ]
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};