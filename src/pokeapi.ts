import { Cache } from "./pokecache.js";
import { useAPICall } from "./hooks/use_api_call.js";
import { type Location, type ShallowLocations } from "./types/location.types.js";
import { type Pokemon } from "./types/pokemon.type.js";

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

